"use client";

import hcverma from "@/public/hcverma.jpg";
import { Button } from "@nextui-org/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { WeightDistributionChart } from "../../student/dashboard/_components/weight-distribution-chart";
import ProfileScore from "../_components/profile-score-2";
import QuestionsAnswered from "../_components/questions-answered";
import TeacherProfileCard from "../_components/teacher-profile-card";
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

  const student = {
    name: "HC Verma",
    email: "hc.verma@gmail.com",
    profile_pic: hcverma,
    is_face_registered: true,
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleDownloadPdf}
        className="fixed right-10 top-10"
      >
        Download as PDF
      </Button>
      <div ref={printRef}>
        <div className="">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
            <div className="col-span-2">
              <TeacherProfileCard profile={student} />
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <ProfileScore />
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
