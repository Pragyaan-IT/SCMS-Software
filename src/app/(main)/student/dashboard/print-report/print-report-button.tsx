"use client";

import { Button } from "@nextui-org/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import Dashboard from "../_components/dashboard";

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

  return (
    <div>
      <Button type="button" onClick={handleDownloadPdf} className=" fixed right-10 top-10">
        Download as PDF
      </Button>
      <div ref={printRef}>
        <div className="">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
