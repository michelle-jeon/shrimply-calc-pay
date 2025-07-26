import { useCallback, useState, useEffect } from "react";
import FreeCalc from "../Calculators/FreeCalc";
import RegularCalc from "../Calculators/RegularCalc";
import DayCalc from "../Calculators/DayCalc";
import CalcaulationResult from "../CalculationResult/CalculationResult";
import PayslipView from "../PayslipView/PayslipView";
import { PayslipInfoData } from "../PayslipInfo/PayslipInfo";
import taxTableJson from '../../data/taxTable.json';
import * as S from './CalculatorSection.styles';

const taxTable: TaxRow[] = taxTableJson;

type CalculatorSectionProps = {
  selectedTab: string;
};

type TaxRow = {
  atLeast: number;
  lessThan: number;
  tax: number;
};

type FreeCalcData = {
  amount: number;
  isValid: boolean;
};

export type RegularCalcData = {
  amount: number;
  isValid: boolean;
  baseAmount: number;
  nonTaxableAllowances: number;
  taxableAllowances: number;
  taxReduction: number;
  durunuri: number; 
  isHealthInsuranceJoin: boolean; 
  allowances: {
    meal: string;
    vehicle: string;
    childbirth: string;
    research: string;
    productionOvertime: string;
    bonus: string;
    position: string;
    annualLeave: string;
    overtime: string;
    holiday: string;
    night: string;
  };
  deductions: {
    nationalPension: string;
    employmentInsurance: string;
  };
}

type DayCalcData = {
  amount: number;
  workingDays: number;
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
  const [payslipInfo, setPayslipInfo] = useState<PayslipInfoData | null>(null);

  useEffect(() => {
    setCurrentScreen("calculator");
    setCalculatedResult(null);
    setCalculatorData(null);
    setPayslipInfo(null);
  }, [selectedTab]);
  
  const handleDataChange = useCallback((data: CalculatorData) => {
    setCalculatorData(data);
  }, []);

  const handleShowPayslip = (payslipData: PayslipInfoData) =>{
    setPayslipInfo(payslipData);
    setCurrentScreen('payslip');
  }

  const handlePayslipBack = () => {
    setCurrentScreen('result');
    setPayslipInfo(null);
  }

   const handlePayslipDownload = () => {
    // 저장 로직 구현
    console.log('급여명세서 저장하기');
  }
  
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
          result = calculateRegular(regulData);
          break;
        case "일용직":
          const dayData = calculatorData as DayCalcData;
          result = calculateDay(dayData);
          break;
        default:
          throw new Error("알 수 없는 계산 타입");
      }
    setCalculatedResult(result);
    setCurrentScreen("result");
    setIsCalculating(false);
  }

  const calculateFree = (amt: number): CalcResultData => {
    const withholdingTax = Math.floor((amt * 0.03) / 10) * 10;
    const localTax =  Math.floor((withholdingTax * 0.1) / 10) * 10;
    const netSalary = amt - withholdingTax - localTax;
    
    return {
      totSalary: amt,
      withholdingTax,
      localTax,
      netSalary,
      type: "프리랜서"
    };
  };

  const calculateRegular = (regulData: RegularCalcData): CalcResultData => {
    const taxableIncome = regulData.baseAmount + regulData.taxableAllowances;
    const allowances = regulData.allowances;
    const sumAllowance = regulData.nonTaxableAllowances + regulData.taxableAllowances;

    ////////// 세금 관련 //////////
    const roundDown10 = (amount: number) => Math.floor(amount / 10) * 10;
    // ***** 간이세액 계산 *****
    let withholdingTax = 0;
    // 과세 금액이 1,060,000원 미만이면 소득세 0원
    if (taxableIncome < 1060000) {
      withholdingTax = 0;
    }
    // 1,060,000원 이상 10,000,000원 미만 - 간이세액표 사용
    else if (taxableIncome < 10000000) {
      const matchedRow = taxTable.find((row: TaxRow) => 
        taxableIncome >= row.atLeast && taxableIncome < row.lessThan
      );
      withholdingTax = matchedRow ? matchedRow.tax : 0;
    }
    // 10,000,000원 - 소득세 1,507,400원
    else if (taxableIncome === 10000000) {
      withholdingTax = 1507400;
    }
    // 10,000,000원 초과 14,000,000원 이하
    else if (taxableIncome > 10000000 && taxableIncome <= 14000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 10000000;
      const additionalTax = Math.floor(excessAmount * 0.98 * 0.35);
      withholdingTax = roundDown10(baseTax + additionalTax + 25000);
    }
    // 14,000,000원 초과 28,000,000원 이하
    else if (taxableIncome > 14000000 && taxableIncome <= 28000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 14000000;
      const additionalTax = Math.floor(excessAmount * 0.98 * 0.38);
      withholdingTax = roundDown10(baseTax + 1397000 + additionalTax);
    }
    // 28,000,000원 초과 30,000,000원 이하
    else if (taxableIncome > 28000000 && taxableIncome <= 30000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 28000000;
      const additionalTax = Math.floor(excessAmount * 0.98 * 0.40);
      withholdingTax = roundDown10(baseTax + 6610600 + additionalTax);
    }
    // 30,000,000원 초과 45,000,000원 이하
    else if (taxableIncome > 30000000 && taxableIncome <= 45000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 30000000;
      const additionalTax = Math.floor(excessAmount * 0.40);
      withholdingTax = roundDown10(baseTax + 7394600 + additionalTax);
    }
    // 45,000,000원 초과 87,000,000원 이하
    else if (taxableIncome > 45000000 && taxableIncome <= 87000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 45000000;
      const additionalTax = Math.floor(excessAmount * 0.42);
      withholdingTax = roundDown10(baseTax + 13394600 + additionalTax);
    }
    // 87,000,000원 초과
    else if (taxableIncome > 87000000) {
      const baseTax = 1507400; // 10,000,000원인 경우의 해당 세액
      const excessAmount = taxableIncome - 87000000;
      const additionalTax = Math.floor(excessAmount * 0.45);
      withholdingTax = roundDown10(baseTax + 31034600 + additionalTax);
    }
    // ***** 간이세액 계산 끝 *****
    // 소득세 감면 (0% 초과인 경우)
    const taxReduction = regulData.taxReduction;
    if (taxReduction > 0){
      const reducedTax  = Math.min(withholdingTax * (taxReduction / 100),2000000);
      withholdingTax = roundDown10(withholdingTax - reducedTax);
    }
    // 지방세 계산
    const localTax = roundDown10(withholdingTax * 0.1);
    
    ////////// 보험료 관련 //////////
    // ***** 보험료 계산 *****
    let nationalPension = 0;
    let healthInsurance = 0;
    let longTermCareInsurance = 0;
    let employmentInsurance = 0;
    
    if (regulData.isHealthInsuranceJoin) {
      let pensionBase = Math.floor(parseInt(regulData.deductions.nationalPension)/ 10000) * 10000 || Math.floor(taxableIncome / 1000) * 1000;
      // 국민연금 (기준소득월액의 4.5%)
      if (pensionBase < 400000) pensionBase = 400000;
      if (pensionBase > 6370000) pensionBase = 6370000;
      // ***** 두루누리 있는 경우
      if(regulData.durunuri>0){ 
        //두루누리 지원금이 있을 경우에는 국민연금에 원 절사를 하지 않고, 지원금에 원절사하여 계산함
        const orginalNationalPension = pensionBase * 0.045;
        let reducedPensionIns = Math.floor(pensionBase * 0.045 * (regulData.durunuri/100)/10)*10;
        if(pensionBase >= 2300000 ) reducedPensionIns = 82800;
        nationalPension = orginalNationalPension - reducedPensionIns;
      }else{ 
      // ***** 두루누리 없는 경우
        nationalPension = Math.floor(pensionBase * 0.045/10)*10;
      }

      // 건강보험 (월보수액의 3.545%)
      let healthBase = taxableIncome;
      if (healthBase < 279266) healthBase = 279266;
      if (healthBase > 12705698) healthBase = 12705698;
      healthInsurance = Math.floor(healthBase * 0.03545 / 10) * 10;
      // 장기요양보험 (월보수액의 0.4591%)
      longTermCareInsurance = Math.floor(taxableIncome * 0.004591/10)*10;
    }
    
    // 고용보험 (과세소득의 0.9%)
    const employmentInsuranceBase = taxableIncome;
    employmentInsurance = Math.floor(employmentInsuranceBase * 0.009/10)*10;
    console.log(employmentInsurance);
    // ***** 두루누리 있는 경우
    if (regulData.durunuri > 0) {
      //고용보험 신고금액(원절사)*고용보험요율*두루누리공제 > 원절사
      const employmentReductionBase = Math.floor((parseInt(regulData.deductions.employmentInsurance) || taxableIncome )/10)*10;
      console.log(employmentReductionBase);
      let reducedEmploymentIns = Math.floor(employmentReductionBase * 0.009 * (regulData.durunuri / 100)/10)*10;
      console.log(reducedEmploymentIns);
      if (employmentReductionBase >= 2300000) reducedEmploymentIns = 16560;
      employmentInsurance = employmentInsurance- reducedEmploymentIns;
      console.log(employmentInsurance);
    }

    // ***** 실수령액 계산 *****
    const netSalary = regulData.amount - withholdingTax - localTax - nationalPension - healthInsurance - longTermCareInsurance - employmentInsurance;

    return {
      totSalary: regulData.amount,
      withholdingTax,
      localTax,
      netSalary,
      type: "상용직",
      baseSalary: regulData.baseAmount,
      allowance: {
        sumAllowance,
        mealAllowance: parseInt(allowances.meal) || 0,
        vehicleAllowance: parseInt(allowances.vehicle) || 0,
        productionOverTimeAllowance: parseInt(allowances.productionOvertime) || 0,
        childcareAllowance: parseInt(allowances.childbirth) || 0,
        researchAllowance: parseInt(allowances.research) || 0,
        bonusAllowance: parseInt(allowances.bonus) || 0,
        positionAllowance: parseInt(allowances.position) || 0,
        annualLeaveAllowance: parseInt(allowances.annualLeave) || 0,
        overTimeAllowance: parseInt(allowances.overtime) || 0,
        holidayAllowance: parseInt(allowances.holiday) || 0,
        nightAllowance: parseInt(allowances.night) || 0
      },
      nationalPension,
      healthInsurance,
      longTermCareInsurance,
      employmentInsurance
    };
  };

  const calculateDay = (data:DayCalcData): CalcResultData =>{
    const {amount,workingDays} = data;
    //일용직 소득금액(월간 받은 총액/월에 근무한 일 수 -15만원)
    const taxableIncome = amount/workingDays - 150000;
    //일평균 결정세액(소득금액*세율*세액공제 후 원절사) 
    const withholdingTaxBase =  Math.floor(taxableIncome * 0.06 * 0.45 /10)*10;
    //원천세(일평균 결정세액*근무일수)
    const withholdingTax = withholdingTaxBase < 1000 ? 0:withholdingTaxBase*workingDays;
    const localTax =  Math.floor((withholdingTax*0.1) / 10) * 10;
    const employmentInsurance = Math.floor(amount * 0.009/10)*10;
    const netSalary = amount - withholdingTax - localTax - employmentInsurance;

    return {
      totSalary:amount,
      withholdingTax,
      localTax,
      netSalary,
      employmentInsurance,
      type:"일용직"
    }
  }
  //*********계산 끝*********

  const handleRecalculate = () => {
    setCurrentScreen('calculator');
    setCalculatedResult(null);
    setPayslipInfo(null);
  }

  const isButtonEnabled = calculatorData?.isValid ?? false;

  const renderCalculatorInput = () => {
    switch (selectedTab) {
      case "프리랜서":
        return <FreeCalc onDataChange={handleDataChange} selectedTab={selectedTab} />;
      case "상용직":
        return <RegularCalc onDataChange={handleDataChange} selectedTab={selectedTab} />;
      case "일용직":
        return <DayCalc onDataChange={handleDataChange} selectedTab={selectedTab} />;
      default:
        return null;
    }
  };
  return (
    <S.SectionContainer>
      <S.SectionTitle>세후 급여 계산기</S.SectionTitle>
      {/* 메인 컨텐츠 영역 */}
      {currentScreen === 'calculator' && (
        <>
          {renderCalculatorInput()}
          <S.CalculateButton
            onClick={calculateAsType}
            disabled={!isButtonEnabled || isCalculating}
          >
            {isCalculating ? '계산 중...' : '계산하기'}
          </S.CalculateButton>
        </>
      )}

      {currentScreen === 'result' && calculatedResult && (
        <CalcaulationResult 
        result={calculatedResult}
        onRecalculate={handleRecalculate}
        onShowPayslip={handleShowPayslip}
        />
      )}

      {currentScreen === 'payslip' && calculatedResult && payslipInfo && (
        <PayslipView  
        result={calculatedResult}
        payslipInfo={payslipInfo}
        onBack={handlePayslipBack}
        onDownload={handlePayslipDownload}
        />
      )}
    </S.SectionContainer>
  )
}