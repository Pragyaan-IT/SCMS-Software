'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Face {
    top: number;
    left: number;
    bottom: number;
    right: number;
}


export default function FaceRegistration() {
    const searchParams = useSearchParams();
    const registrationId = searchParams.get('registration_id')
    const studentName = searchParams.get('student_name')
    const router = useRouter();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [faces, setFaces] = useState<Face[]>([]);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);


    useEffect(() => {
        const isFaceRegistered = localStorage.getItem('is_face_registered');
        if (isFaceRegistered === 'true') {
            router.push('/student/dashboard');
        }
        async function getVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing the webcam', error);
            }
        }
        getVideo();
    }, []);


    const captureImage = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext('2d');
            if (context) {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                context.setTransform(1, 0, 0, 1, 0, 0); // Reset the transformation matrix



                const imageData = canvas.toDataURL('image/jpeg');

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_FACE_DETECTION_API}api/capture_frame`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: imageData })
                    });
                    const result = await response.json();

                    if (response.ok) {
                        setFaces(result.faces);
                        setCapturedImages([...capturedImages, imageData]);
                    } else {
                        console.error('Failed to capture frame', result.error);
                    }
                } catch (error) {
                    console.error('Error capturing image', error);
                }
            }
        }
    };

    const saveImages = async () => {
        try {
            for (const image of capturedImages) {
                await fetch(`${process.env.NEXT_PUBLIC_FACE_DETECTION_API}api/save_face`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image, name: studentName, registration_id: registrationId })
                });
            }

            const res = await fetch(`/api/student/${registrationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_face_registered: true })
            })
            const data = await res.json();
            if (res.ok && data.success) {
                localStorage.setItem('is_face_registered', 'true');
                router.push('/student/dashboard');
            }
            setCapturedImages([]);
        } catch (error) {
            console.error('Error saving images', error);
            alert('Failed to save images');
        }
    };

    return (
        <div>

            <video style={{ transform: 'scaleX(-1)' }} ref={videoRef} width="640" height="480" autoPlay></video>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            <button onClick={captureImage}>Capture Image</button>
            <br />
            <button onClick={saveImages}>Save Images</button>
            <div>
                {capturedImages.map((image, index) => (
                    <img key={index} src={image} alt={`Captured ${index + 1}`} width="160" height="120" />
                ))}
            </div>
            <div>
                {faces.map((face, index) => (
                    <div key={index} style={{ border: '1px solid red', margin: '10px', padding: '5px' }}>
                        Face {index + 1}: {`Top: ${face.top}, Left: ${face.left}, Bottom: ${face.bottom}, Right: ${face.right}`}
                    </div>
                ))}
            </div>
        </div>
    );
}




