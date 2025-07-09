import { useState } from "react";
import PayslipInfo, { PayslipInfoData } from "../PayslipInfo/PayslipInfo";

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
   onShowPayslip: (payslipInfo: PayslipInfoData) => void; 
};

export default function CalcaulationResult ({ result, onRecalculate,onShowPayslip }: CalculationResultProps) {
  const [payslipOpen,setPayslipOpen] = useState(false);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const getTotalDeduction = () => {
    let total = result.withholdingTax + result.localTax;
    if (result.nationalPension) total += result.nationalPension;
    if (result.healthInsurance) total += result.healthInsurance;
    if (result.longTermCareInsurance) total += result.longTermCareInsurance;
    if (result.employmentInsurance) total += result.employmentInsurance;
    return total;
  };

  // 급여명세서 인풋 모달 관련
  const handlePayslipClick = () => {
    setPayslipOpen(true);
  };
  const handlePayslipInfoClose =() =>{
    setPayslipOpen(false);
  }
  const handlePayslipInfoSubmit=(payslipInfo:PayslipInfoData)=>{
    onShowPayslip(payslipInfo);
    setPayslipOpen(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white">
      <div>
        {/* 실수령액 */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-6 border-b border-gray-200">
            <span className="text-lg font-bold text-gray-800">실수령액</span>
            <span className="text-lg font-bold text-green-500">
              {formatNumber(Math.round(result.netSalary))} 원
            </span>
          </div>
        </div>

        {/* 지급합계/공제합계 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-4 border-b border-gray-200">
            <span className="text-base font-semibold text-gray-500">지급합계</span>
            <span className="text-base font-bold text-red-500">
              {formatNumber(result.totSalary)} 원
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-4 border-b border-gray-200">
            <span className="text-base font-semibold text-gray-500">공제합계</span>
            <span className="text-base font-bold text-blue-500">
              {formatNumber(Math.round(getTotalDeduction()))} 원
            </span>
          </div>
        </div>

        {/* 상용직인 경우 상세 내역 표시 */}
        {result.type === "상용직" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* 지급 내역 */}
            <div className="space-y-3">
              {result.baseSalary && (
                <div className="flex justify-between items-center py-2 text-base text-gray-700">
                  <span className="">기본급</span>
                  <span className="">{formatNumber(result.baseSalary)} 원</span>
                </div>
              )}
              {result.allowance &&
                [
                  { key: "mealAllowance", label: "식대" },
                  { key: "vehicleAllowance", label: "차량수당" },
                  { key: "productionOverTimeAllowance", label: "생산연장근로수당" },
                  { key: "childcareAllowance", label: "육아수당" },
                  { key: "researchAllowance", label: "연구수당" },
                  { key: "bonusAllowance", label: "상여수당" },
                  { key: "positionAllowance", label: "직책수당" },
                  { key: "annualLeaveAllowance", label: "연차수당" },
                  { key: "overTimeAllowance", label: "연장근로수당" },
                  { key: "holidayAllowance", label: "휴일근로수당" },
                  { key: "nightAllowance", label: "야간근로수당" }
                ].map(({ key, label }) => {
                  const value = result.allowance?.[key as keyof typeof result.allowance];
                  if (value !== undefined && value > 0) {
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 text-base text-gray-700"
                      >
                        <span>{label}</span>
                        <span>{formatNumber(value)} 원</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            
            {/* 공제 내역 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 text-base text-gray-700">
                <span className="">소득세</span>
                <span className="">{formatNumber(Math.round(result.withholdingTax))} 원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-base text-gray-700">
                <span className="">지방세</span>
                <span className="">{formatNumber(Math.round(result.localTax))} 원</span>
              </div>
              {result.nationalPension !== undefined && (
                <div className="flex justify-between items-center py-2 text-base text-gray-700">
                  <span className="">국민연금</span>
                  <span className="">{formatNumber(Math.round(result.nationalPension))} 원</span>
                </div>
              )}
              {result.healthInsurance !== undefined && (
                <div className="flex justify-between items-center py-2 text-base text-gray-700">
                  <span className="">건강보험</span>
                  <span className="">{formatNumber(Math.round(result.healthInsurance))} 원</span>
                </div>
              )}
              {result.longTermCareInsurance !== undefined && (
                <div className="flex justify-between items-center py-2 text-base text-gray-700">
                  <span className="">장기요양보험</span>
                  <span className="">{formatNumber(Math.round(result.longTermCareInsurance))} 원</span>
                </div>
              )}
              {result.employmentInsurance !== undefined && (
                <div className="flex justify-between items-center py-2 text-base text-gray-700">
                  <span className="">고용보험</span>
                  <span className="">{formatNumber(Math.round(result.employmentInsurance))} 원</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 프리랜서/일용직인 경우 간단한 내역 */}
        {(result.type === "프리랜서" || result.type === "일용직") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* 지급 내역 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 text-base text-gray-700">
                <span className="">지급액</span>
                <span className="">{formatNumber(result.totSalary)} 원</span>
              </div>
            </div>
            
            {/* 공제 내역 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 text-base text-gray-700">
                <span className="">소득세</span>
                <span className="">{formatNumber(Math.round(result.withholdingTax))} 원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-base text-gray-700">
                <span className="">지방세</span>
                <span className="">{formatNumber(Math.round(result.localTax))} 원</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
        <button
          onClick={onRecalculate}
          className="flex-1 py-4 px-6 rounded-2xl text-gray-700 font-semibold text-lg bg-gray-200 hover:bg-gray-300 transition-all duration-200"
        >
          다시 계산하기
        </button>
        <button
          onClick={handlePayslipClick}
          className="flex-1 py-4 px-6 rounded-2xl text-white font-semibold text-lg bg-orange-500 hover:bg-orange-600 transition-all duration-200"
        >
          임금명세서
        </button>
      </div>
      {/*  */}
      <PayslipInfo 
        isOpen={payslipOpen}
        onClose={handlePayslipInfoClose}
        onSubmit={handlePayslipInfoSubmit}
        workerType={result.type}
      />
    </div>
  )
}