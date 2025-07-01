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
  type: string;
  totSalary: number;
  withholdingTax: number;
  localTax: number;
  netSalary: number;
  //상용직만 있는 값
  baseSalary?: number;
  allowance?: {
    sumAllowance?:number;//수당합계
    mealAllowance?: number;//식대(비과세)
    vehicleAllowance?: number;//차량비(비과세)
    productionOverTimeAllowance?:number;//생산직추가근로수당(비과세)
    childcareAllowance?:number;//출산육아수당(비과세)
    researchAllowance?:number;//연구비(비과세)
    bonusAllowance?:number;//상여금(과세)
    positionAllowance?:number;//직급수당(과세)
    annualLeaveAllowance?:number;//연차수당(과세)
    overTimeAllowance?:number;//초과근로수당(과세)
    holidayAllowance?:number;//휴일근로수당(과세)
    nightAllowance?:number;//야간근로수당(과세)
  };
  //보험료 (고용보험 제외하고는 상용직만 있는 값)
  nationalPension?: number;//국민연금
  healthInsurance?: number;//건강보험
  longTermCareInsurance?: number;//장기요양보험
  employmentInsurance?: number;//고용보험 (일용, 상용)
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
  
  //*********계산*********
  const calculateAsType = () =>{
    console.log(calculatorData)
    if (!calculatorData || !calculatorData.isValid) return;
    setIsCalculating(true);
    let result:CalcResultData;
    switch (selectedTab) {
        case "프리랜서":
          const freeData = calculatorData as FreeCalcData;
          result = calculateFree(freeData.amount);
          break;
        case "상용직":
          const regulData = calculatorData as RegularCalcData;
          result = calculateRegular(regulData.amount);
          break;
        case "일용직":
          const dayData = calculatorData as DayCalcData;
          result = calculateDay(dayData.amount);
          break;
        default:
          throw new Error("알 수 없는 계산 타입");
      }
    setCalculatedResult(result);
    setCurrentScreen("result");
    setIsCalculating(false);
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

  const calculateDay = (amt:number): CalcResultData =>{
    const withholdingTax = amt * 0.03;
    const localTax = amt * 0.003;
    const netSalary = amt - withholdingTax - localTax;

    return {
      totSalary:amt,
      withholdingTax,
      localTax,
      netSalary,
      type:"일용직"
    }
  }
  //*********계산 끝*********

  const handleRecalculate = () => {

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
      <p className="text-14 font-bold text-left text-gray-900 mb-4">세후 급여 계산기</p>
      {/* 메인 컨텐츠 영역 */}
      {currentScreen === 'calculator' && (
        <>
          {renderCalculatorInput()}
          <button
            onClick={calculateAsType}
            disabled={!isButtonEnabled || isCalculating}
            className={`w-full py-3 rounded-xl text-white font-medium text-lg mt-6 transition-all duration-200 ${
              isButtonEnabled && !isCalculating
                ? 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
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
        <CalcaulationResult 
        result={calculatedResult}
        onRecalculate={handleRecalculate}  />
      )}

      {currentScreen === 'payslip' && calculatedResult && (
        <PayslipView  />
      )}
    </div>
  )
}