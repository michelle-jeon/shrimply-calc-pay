import React, { useCallback, useState } from "react";
import FreeCalc from "../Calculators/FreeCalc";
import RegularCalc from "../Calculators/RegularCalc";
import DayCalc from "../Calculators/DayCalc";

type CalculatorSectionProps = {
  selectedTab: string;
};

type FreeCalcData = {
  amount: number;
  isValid: boolean;
};

type RegularCalcData = {

}

type DayCalcData = {


}

type CalculatorData = FreeCalcData | RegularCalcData | DayCalcData;

export default function CalcuatorSection({ selectedTab }: CalculatorSectionProps) {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleDataChange = useCallback((data: CalculatorData) => {
    setCalculatorData(data);
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "프리랜서":
        return <FreeCalc onDataChange={handleDataChange} />;
      case "상용직":
        return <RegularCalc />;
      case "일용직":
        return <DayCalc />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-[#ffffff] relative rounded-2xl w-full max-w-[594.77px] p-8 flex flex-left">
      <p className="text-14 font-bold">세후 급여 계산기</p>
      {renderContent()}
      <button></button>
    </div>
  )
}