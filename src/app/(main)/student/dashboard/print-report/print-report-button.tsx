"use client";

import { Button } from "@nextui-org/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import boy from "@/public/boy.png"
import Dashboard from "../_components/dashboard";
import { WeightDistributionChart } from "../_components/weight-distribution-chart";
// import ProfileScore from "../_components/profile-score-2";
// import QuestionsAnswered from "../_components/questions-answered";
// import TeacherProfileCard from "../_components/teacher-profile-card";
import QuestionsAnswered from "../../../teacher/_components/questions-answered";
import ProfileCard from "../_components/profile-card";
import StudentProfileScore from "../_components/profile-score-2";
import ProfileScoreTable from "./teacher-table";

export default function PrintReport() {
  const printRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = async () => {
    const element: any = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("student-report.pdf");
  };

  const profile = {
    name: "Shashank Shekhar Pandey",
    email: "shashank@gmail.com",
    registration_id: "100002",
    isFaceRegistered: true,
    profile_pic: boy,
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleDownloadPdf}
        className="fixed right-10 top-10 z-50"
      >
        Download as PDF
      </Button>
      <div ref={printRef}>
        {/* <div className="">
          <Dashboard profile={profile} />
        </div> */}
        <div className="">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
            <div className="col-span-2">
              <ProfileCard profile={profile} />
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <StudentProfileScore />
              <QuestionsAnswered />
            </div>
            {/* <StudentPerformanceChart /> */}
          </div>

          <div className="flex flex-col gap-2">
            <ProfileScoreTable />
            <div className="w-full">
              <WeightDistributionChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
