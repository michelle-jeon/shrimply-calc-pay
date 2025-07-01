
type CalcResultData = {
  type: string;
  totSalary: number;
  withholdingTax: number;
  localTax: number;
  netSalary: number;
  //상용직만 있는 값
  baseSalary?: number;
  allowance?: {
    sumAllowance?:number;
    mealAllowance?: number;
    vehicleAllowance?: number;
    productionOverTimeAllowance?:number;
    childcareAllowance?:number;
    researchAllowance?:number;
    bonusAllowance?:number;
    positionAllowance?:number;
    annualLeaveAllowance?:number;
    overTimeAllowance?:number;
    holidayAllowance?:number;
    nightAllowance?:number;
  };
  //보험료
  nationalPension?: number;//국민연금
  healthInsurance?: number;//건강보험
  longTermCareInsurance?: number;//장기요양보험
  employmentInsurance?: number;//고용보험
};

type CalculationResultProps = {
  result: CalcResultData;
  onRecalculate: () => void;
};

export default function CalcaulationResult ({ result, onRecalculate }: CalculationResultProps) {
  return (

  )
}