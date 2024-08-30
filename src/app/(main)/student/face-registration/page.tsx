"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Progress } from "@nextui-org/progress";
import { toast } from "sonner";
interface Face {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

const TOTAL_IMAGES = 3;

export default function FaceRegistration() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registration_id");
  const studentName = searchParams.get("student_name");
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [faces, setFaces] = useState<Face[]>([]);
  const [capturedImages, setCapturedImages] = useState<string[]>([]); // NOTE Just to see the images in the UI Nitish Badmosh

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
            setCapturedImages((prev) => [...prev, imageData]);
            toast.success(
              `Image ${capturedImages.length + 1} captured successfully!`,
            );
          } else {
            console.error("Failed to capture frame", result.error);
            toast.error("Failed to capture image");
          }
        } catch (error) {
          console.error("Error capturing image", error);
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
        videoRef.current = null;
        router.push("/student/dashboard");
      }
      setCapturedImages([]);
    } catch (error) {
      console.error("Error saving images", error);
      toast.error("Failed to save images. Please try again.");
    }
  };

  const progress = (capturedImages.length / TOTAL_IMAGES) * 100;

  return (
    <div className="mx-auto flex h-svh items-center justify-center p-8">
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="w-full rounded-t-md text-center">
          <CardTitle>Face Registration</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 p-6 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="mb-4 md:h-[380px] md:w-[540px] lg:h-[480px] lg:w-[640px]">
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
                {capturedImages.length === 0 && <p className='text-md dark:text-white'>
                  No images captured yet. Click the &quot;Capture Image&quot; button to capture images.
                </p>
                }
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

            <div className="flex flex-col gap-4">
              <Input readOnly defaultValue={studentName ?? "Your Name"} />
              <Button
                color="primary"
                type="submit"
                onClick={saveImages}
              >
                Save Images
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
