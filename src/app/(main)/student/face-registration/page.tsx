import dynamic from "next/dynamic";

const FaceRegistration = dynamic(() => import("./face-registration"), {
  ssr: false,
});

export default function FaceRegistrationPage() {
  return <FaceRegistration />;
}
