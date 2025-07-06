type CalcResultData = {
  type: string;
  totSalary: number;
  withholdingTax: number;
  localTax: number;
  netSalary: number;
  //상용직만 있는 값
  baseSalary?: number;
  allowance?: {
    sumAllowance?: number;
    mealAllowance?: number;
    vehicleAllowance?: number;
    productionOverTimeAllowance?: number;
    childcareAllowance?: number;
    researchAllowance?: number;
    bonusAllowance?: number;
    positionAllowance?: number;
    annualLeaveAllowance?: number;
    overTimeAllowance?: number;
    holidayAllowance?: number;
    nightAllowance?: number;
  };
  //보험료
  nationalPension?: number;
  healthInsurance?: number;
  longTermCareInsurance?: number;
  employmentInsurance?: number;
};

type PayslipInfoData = {
  companyName: string;
  workerName: string;
  workYear: string;
  workMonth: string;
  payYear: string;
  payMonth: string;
  payDay: string;
};

type PayslipViewProps = {
  result: CalcResultData;
  payslipInfo: PayslipInfoData;
  onBack: () => void;
  onDownload: () => void;
};

export default function PayslipView({ result, payslipInfo, onBack, onDownload }: PayslipViewProps) {
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white">
      {/* 급여명세서 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {payslipInfo.workYear}년 {payslipInfo.workMonth}월 임금명세서
        </h1>
        
        {/* 기본 정보 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">업무대상</span>
            <span className="text-gray-800 font-semibold">{payslipInfo.companyName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">직원</span>
            <span className="text-gray-800 font-semibold">{payslipInfo.workerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">지급일</span>
            <span className="text-gray-800 font-semibold">
              {payslipInfo.payYear}년 {payslipInfo.payMonth}월 {payslipInfo.payDay}일
            </span>
          </div>
        </div>
      </div>

      {/* 실수령액 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">실수령액</span>
          <span className="text-2xl font-bold text-green-600">
            {formatNumber(Math.round(result.netSalary))} 원
          </span>
        </div>
      </div>

      {/* 지급 및 공제 내역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 지급합계 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4 text-center">지급합계</h3>
          <div className="space-y-3">
            {result.type === "상용직" ? (
              <>
                {result.baseSalary && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">기본급</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.baseSalary)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.mealAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">식대</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.mealAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.vehicleAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">차량수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.vehicleAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.productionOverTimeAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">연장근로수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.productionOverTimeAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.childcareAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">육아수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.childcareAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.researchAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">연구수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.researchAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.bonusAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">상여수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.bonusAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.positionAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">직책수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.positionAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.annualLeaveAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">연차수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.annualLeaveAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.overTimeAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">연장근로수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.overTimeAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.holidayAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">휴일근로수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.holidayAllowance)} 원
                    </span>
                  </div>
                )}
                {result.allowance?.nightAllowance && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">야간근로수당</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(result.allowance.nightAllowance)} 원
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">지급액</span>
                <span className="font-semibold text-blue-600">
                  {formatNumber(result.totSalary)} 원
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-blue-300 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-800">총 지급액</span>
              <span className="text-lg font-bold text-blue-600">
                {formatNumber(result.totSalary)} 원
              </span>
            </div>
          </div>
        </div>

        {/* 공제합계 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-800 mb-4 text-center">공제합계</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">소득세</span>
              <span className="font-semibold text-red-600">
                {formatNumber(Math.round(result.withholdingTax))} 원
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">지방세</span>
              <span className="font-semibold text-red-600">
                {formatNumber(Math.round(result.localTax))} 원
              </span>
            </div>
            {result.nationalPension && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">국민연금</span>
                <span className="font-semibold text-red-600">
                  {formatNumber(Math.round(result.nationalPension))} 원
                </span>
              </div>
            )}
            {result.healthInsurance && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">건강보험</span>
                <span className="font-semibold text-red-600">
                  {formatNumber(Math.round(result.healthInsurance))} 원
                </span>
              </div>
            )}
            {result.longTermCareInsurance && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">장기요양보험</span>
                <span className="font-semibold text-red-600">
                  {formatNumber(Math.round(result.longTermCareInsurance))} 원
                </span>
              </div>
            )}
            {result.employmentInsurance && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">고용보험</span>
                <span className="font-semibold text-red-600">
                  {formatNumber(Math.round(result.employmentInsurance))} 원
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-red-300 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-red-800">총 공제액</span>
              <span className="text-lg font-bold text-red-600">
                {formatNumber(Math.round(getTotalDeduction()))} 원
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-6 rounded-2xl text-gray-700 font-semibold text-lg bg-gray-200 hover:bg-gray-300 transition-all duration-200"
        >
          뒤로
        </button>
        <button
          onClick={onDownload}
          className="flex-1 py-4 px-6 rounded-2xl text-white font-semibold text-lg bg-red-500 hover:bg-red-600 transition-all duration-200"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}