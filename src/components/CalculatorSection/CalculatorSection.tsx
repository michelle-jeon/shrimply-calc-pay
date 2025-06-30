import { useCallback, useState } from "react";
import FreeCalc from "../Calculators/FreeCalc";
import RegularCalc from "../Calculators/RegularCalc";
import DayCalc from "../Calculators/DayCalc";
import CalcaulationResult from "../CalculationResult/CalculationResult";
import PayslipView from "../PayslipView/PayslipView";


type CalculatorSectionProps = {
  selectedTab: string;
};

type FreeCalcData = {
  amount: number;
  isValid: boolean;
};

type RegularCalcData = {
  amount: number;
  isValid: boolean;
}

type DayCalcData = {
  amount: number;
  isValid: boolean;
  
}

type CalculatorData = FreeCalcData | RegularCalcData | DayCalcData;

type CalcResultData = {
  totSalary: number;
  withholdingTax: number;
  localTax: number;
  netSalary: number;
  type: string;
};

type ScreenState = 'calculator' | 'result' | 'payslip';

export default function CalcuatorSection({ selectedTab }: CalculatorSectionProps) {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedResult,setCalculatedResult] = useState<CalcResultData | null>(null);
  const [currentScreen,setCurrentScreen] = useState<ScreenState>('calculator')
  
  const handleDataChange = useCallback((data: CalculatorData) => {
    setCalculatorData(data);
  }, []);
  
  //계산
  const calculateAsType = () =>{
    if (!calculatorData || !calculatorData.isValid) return;
    setIsCalculating(true);
    let result:CalcResultData;
    switch (selectedTab) {
        case "프리랜서":
          const freeData = calculatorData as FreeCalcData;
          result = calculateFree(freeData.amount);
          break;
        case "상용직":
          // 상용직 계산 로직 추가
          const regulData = calculatorData as RegularCalcData;
          result = calculateRegular(regulData.amount);
          break;
        case "일용직":
          // 일용직 계산 로직 추가
          result = calculateDay();
          break;
        default:
          throw new Error("알 수 없는 계산 타입");
      }
  }

  const calculateFree = (amt: number): CalcResultData => {
    const withholdingTax = amt * 0.03;
    const localTax = amt * 0.003;
    const netSalary = amt - withholdingTax - localTax;
    
    return {
      totSalary: amt,
      withholdingTax,
      localTax,
      netSalary,
      type: "프리랜서"
    };
  };

  const calculateRegular = (amt:number): CalcResultData =>{
    const withholdingTax = amt * 0.03;
    const localTax = amt * 0.003;
    const netSalary = amt - withholdingTax - localTax;

    return {
      totSalary:amt,
      withholdingTax,
      localTax,
      netSalary,
      type:"상용직"
    }
  }

  const isButtonEnabled = calculatorData?.isValid ?? false;

  const renderCalculatorInput = () => {
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
    <div className="bg-[#ffffff] relative rounded-2xl w-full max-w-[594.77px] p-8">
      <p className="text-14 font-bold text-left">세후 급여 계산기</p>
      {/* 메인 컨텐츠 영역 */}
      {currentScreen === 'calculator' && (
        <>
          {renderCalculatorInput()}
          <button
            onClick={calculateAsType}
            disabled={!isButtonEnabled || isCalculating}
            className={`w-full py-4 rounded-lg text-white font-medium text-lg mt-6 transition-all duration-200 ${
              isButtonEnabled && !isCalculating
                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            style={{
              cursor: !isButtonEnabled || isCalculating ? 'default' : 'pointer',
            }}
          >
            {isCalculating ? '계산 중...' : '계산하기'}
          </button>
        </>
      )}

      {currentScreen === 'result' && calculatedResult && (
        <CalcaulationResult  />
      )}

      {currentScreen === 'payslip' && calculatedResult && (
        <PayslipView  />
      )}
    </div>
  )
}