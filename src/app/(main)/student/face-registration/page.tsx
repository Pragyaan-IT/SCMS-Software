"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import photo2 from "@/public/portrait/alia2.jpeg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Progress } from "@nextui-org/progress";
import { Image } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
interface Face {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const TOTAL_IMAGES = 3;

export default function FaceRegistration() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registration_id");
  const studentName = searchParams.get("student_name");
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [faces, setFaces] = useState<Face[]>([]);
  const [capturedImages, setCapturedImages] = useState<string[]>([
    photo2.src,
    photo2.src,
    photo2.src,
  ]); // NOTE Just to see the images in the UI Nitish Badmosh

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const isFaceRegistered = localStorage.getItem("is_face_registered");
    if (isFaceRegistered === "true") {
      router.push("/student/dashboard");
    }
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the webcam", error);
      }
    }
    getVideo();
  }, []);

  const captureImage = async () => {
    if (capturedImages.length >= TOTAL_IMAGES) {
      toast.info("You've already captured the required number of images.");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset the transformation matrix

        const imageData = canvas.toDataURL("image/jpeg");

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_FACE_DETECTION_API}/api/capture_frame`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: imageData }),
            },
          );
          const result = await response.json();

          if (response.ok) {
            setFaces(result.faces);
            setCapturedImages([...capturedImages, imageData]);
            // setCapturedImages((prev) => [...prev, imageData]); NOTE Better way to update state Nitish Badmosh
            toast.success(
              `Image ${capturedImages.length + 1} captured successfully!`,
            );
          } else {
            console.error("Failed to capture frame", result.error);
            toast.error("Failed to capture image");
          }
        } catch (error) {
          console.error("Error capturing image", error);
          toast.error("Failed to capture image");
        }
      }
    }
  };

  const saveImages = async () => {
    if (capturedImages.length < TOTAL_IMAGES) {
      toast.error(`Please capture ${TOTAL_IMAGES} images before saving.`);
      return;
    }

    try {
      for (const image of capturedImages) {
        await fetch(
          `${process.env.NEXT_PUBLIC_FACE_DETECTION_API}/api/save_face`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image,
              name: studentName,
              registration_id: registrationId,
            }),
          },
        );
      }
      const res = await fetch(`/api/student/${registrationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_face_registered: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("is_face_registered", "true");
        router.push("/student/dashboard");
      }
      setCapturedImages([]);
      form.reset();
    } catch (error) {
      console.error("Error saving images", error);
      toast.error("Failed to save images. Please try again.");
    }
  };

  const progress = (capturedImages.length / TOTAL_IMAGES) * 100;

  return (
    <div className="mx-auto flex h-svh items-center justify-center p-4">
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="w-full rounded-t-md text-center">
          <CardTitle>Face Registration</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 p-6 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="mb-4 h-[480px] w-[640px]">
              <video
                style={{ transform: "scaleX(-1)" }}
                ref={videoRef}
                width="640"
                height="480"
                autoPlay
                className="rounded-lg"
              ></video>
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                style={{ display: "none" }}
              ></canvas>
            </div>
            <div className="w-full space-y-2">
              <Progress
                aria-label="Progress"
                value={progress}
                className="h-2"
                color={progress === 100 ? "success" : "primary"}
              />
              <p className="text-sm text-gray-600">
                {capturedImages.length} of {TOTAL_IMAGES} images captured
              </p>
            </div>
            <Button
              color="primary"
              onClick={captureImage}
              className="w-full"
              // disabled={capturedImages.length < TOTAL_IMAGES}
            >
              Capture Image
            </Button>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Captured Images</CardTitle>
              </CardHeader>
              <CardContent>
                {capturedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {capturedImages.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        isZoomed
                        alt={`Captured ${index + 1}`}
                        className="aspect-video rounded-lg object-scale-down"
                        height={200}
                        width={200}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(saveImages)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          // isRequired
                          // variant="bordered"
                          label="Name"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  color="primary"
                  type="submit"
                  // disabled={capturedImages.length < TOTAL_IMAGES} // Toast wont show if uncommented
                >
                  Save Images
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      {/* Commenting for now */}
      {/* {faces.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detected Faces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {faces.map((face, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-red-500 p-2"
                >
                  Face {index + 1}:{" "}
                  {`Top: ${face.top}, Left: ${face.left}, Bottom: ${face.bottom}, Right: ${face.right}`}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
