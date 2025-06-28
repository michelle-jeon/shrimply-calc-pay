import React, { useState } from "react";
import FreeCalc from "../Calculators/FreeCalc";
import RegularCalc from "../Calculators/RegularCalc";
import DayCalc from "../Calculators/DayCalc";

type CalculatorSectionProps = {
  selectedTab: string;
};

export default function CalcuatorSection({ selectedTab }: CalculatorSectionProps) {
  const renderContent = () => {
    switch (selectedTab) {
      case "프리랜서":
        return <FreeCalc />;
      case "상용직":
        return <RegularCalc />;
      case "일용직":
        return <DayCalc />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-[#ffffff] relative rounded-2xl w-full max-w-[594.77px] p-8">
      {renderContent()}
    </div>
  )
}