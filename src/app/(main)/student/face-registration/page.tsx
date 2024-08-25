"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Image from "next/image";
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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function FaceRegistration() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [faces, setFaces] = useState<Face[]>([]);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
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
            `${process.env.FACE_DETECTION_API}/api/capture_frame`,
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
          } else {
            console.error("Failed to capture frame", result.error);
          }
        } catch (error) {
          console.error("Error capturing image", error);
        }
      }
    }
  };

  const saveImages = async () => {
    if (capturedImages.length === 0) {
      toast.error("Please capture at least one image before saving.");
      return;
    }

    try {
      for (const image of capturedImages) {
        await fetch(`${process.env.FACE_DETECTION_API}/api/save_face`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image, name }),
        });
      }
      toast.success("Images saved successfully!");
      setCapturedImages([]);
    } catch (error) {
      console.error("Error saving images", error);
      toast.error("Failed to save images");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4 flex flex-col items-center justify-center border-0 shadow-none">
        <CardHeader>
          <CardTitle>Face Registration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
          <Button color="primary" onClick={captureImage}>
            Capture Image
          </Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(saveImages)} className=" flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is the name that will be associated with your face
                      images.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button color="primary" type="submit">
                Save Images
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {capturedImages.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Captured Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {capturedImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Captured ${index + 1}`}
                  className="h-auto w-full rounded-lg"
                  height={480}
                  width={640}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {faces.length > 0 && (
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
      )}
    </div>
  );
}
