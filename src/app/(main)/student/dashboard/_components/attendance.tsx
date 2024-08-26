"use client";

import AnimatedCircularProgressBar from "@/components/ui/circular-progress";
import { useEffect, useState } from "react";


export function CircularProgress({value}:{value: number}) {


  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="#374151"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
