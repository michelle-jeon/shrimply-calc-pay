import { useState } from "react";
import PayslipInfo, { PayslipInfoData } from "../PayslipInfo/PayslipInfo";
import * as S from './CalculationResult.styles';

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
  const [payslipInfoData, setPayslipInfoData] = useState<PayslipInfoData | null>(null);
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
    <S.ResultContainer>
      <div>
        {/* 실수령액 */}
        <S.NetSalarySection>
          <S.NetSalaryRow>
            <S.NetSalaryLabel>실수령액</S.NetSalaryLabel>
            <S.NetSalaryAmount>
              {formatNumber(Math.round(result.netSalary))} 원
            </S.NetSalaryAmount>
          </S.NetSalaryRow>
        </S.NetSalarySection>

        {/* 지급합계/공제합계 */}

        {/* 상용직인 경우 상세 내역 표시 */}
        {result.type === "상용직" && (
          <S.DetailsGrid>
            {/* 지급 내역 */}
            <S.DetailSection>
        <S.SummaryRow>
          <S.SummaryLabel>지급합계</S.SummaryLabel>
          <S.SummaryAmount>
            {formatNumber(result.totSalary)} 원
          </S.SummaryAmount>
        </S.SummaryRow>
              {result.baseSalary && (
                <S.DetailRow>
                  <span>기본급</span>
                  <span>{formatNumber(result.baseSalary)} 원</span>
                </S.DetailRow>
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
                      <S.DetailRow key={key}>
                        <span>{label}</span>
                        <span>{formatNumber(value)} 원</span>
                    </S.DetailRow>
                  );
                }
                return null;
              })}
            </S.DetailSection>
            
            {/* 공제 내역 */}
            <S.DetailSection>
              <S.SummaryRow>
            <S.SummaryLabel>공제합계</S.SummaryLabel>
            <S.SummaryAmount $isDeduction>
              {formatNumber(Math.round(getTotalDeduction()))} 원
            </S.SummaryAmount>
          </S.SummaryRow>
              <S.DetailRow>
                <span>소득세</span>
                <span>{formatNumber(Math.round(result.withholdingTax))} 원</span>
              </S.DetailRow>
              <S.DetailRow>
                <span>지방세</span>
                <span>{formatNumber(Math.round(result.localTax))} 원</span>
              </S.DetailRow>
              {result.nationalPension !== undefined && (
                <S.DetailRow>
                  <span>국민연금</span>
                  <span>{formatNumber(Math.round(result.nationalPension))} 원</span>
                </S.DetailRow>
              )}
              {result.healthInsurance !== undefined && (
                <S.DetailRow>
                  <span>건강보험</span>
                  <span>{formatNumber(Math.round(result.healthInsurance))} 원</span>
                </S.DetailRow>
              )}
              {result.longTermCareInsurance !== undefined && (
                <S.DetailRow>
                  <span>장기요양보험</span>
                  <span>{formatNumber(Math.round(result.longTermCareInsurance))} 원</span>
                </S.DetailRow>
              )}
              {result.employmentInsurance !== undefined && (
                <S.DetailRow>
                  <span>고용보험</span>
                  <span>{formatNumber(Math.round(result.employmentInsurance))} 원</span>
                </S.DetailRow>
              )}
            </S.DetailSection>
          </S.DetailsGrid>
        )}

        {/* 프리랜서/일용직인 경우 간단한 내역 */}
        {(result.type === "프리랜서" || result.type === "일용직") && (
          <S.DetailsGrid>
            {/* 지급 내역 */}
            <S.DetailSection>
              <S.SummaryRow>
          <S.SummaryLabel>지급합계</S.SummaryLabel>
          <S.SummaryAmount>
            {formatNumber(result.totSalary)} 원
          </S.SummaryAmount>
        </S.SummaryRow>
              <S.DetailRow>
                <span>지급액</span>
                <span>{formatNumber(result.totSalary)} 원</span>
              </S.DetailRow>
            </S.DetailSection>
            
            {/* 공제 내역 */}
            <S.DetailSection>
              <S.SummaryRow>
            <S.SummaryLabel>공제합계</S.SummaryLabel>
            <S.SummaryAmount $isDeduction>
              {formatNumber(Math.round(getTotalDeduction()))} 원
            </S.SummaryAmount>
          </S.SummaryRow>
              <S.DetailRow>
                <span>소득세</span>
                <span>{formatNumber(Math.round(result.withholdingTax))} 원</span>
              </S.DetailRow>
              <S.DetailRow>
                <span>지방세</span>
                <span>{formatNumber(Math.round(result.localTax))} 원</span>
              </S.DetailRow>
              {result.employmentInsurance !== undefined && (
                <S.DetailRow>
                  <span>고용보험</span>
                  <span>{formatNumber(Math.round(result.employmentInsurance))} 원</span>
                </S.DetailRow>
              )}
            </S.DetailSection>
          </S.DetailsGrid>
        )}
      </div>

      {/* 버튼들 */}
      <S.ButtonContainerFixed>
        <S.ButtonContainer>
          <S.RecalculateButton onClick={onRecalculate}>
            다시 계산하기
          </S.RecalculateButton>
          <S.PayslipButton onClick={handlePayslipClick}>
            임금명세서
          </S.PayslipButton>
        </S.ButtonContainer>
      </S.ButtonContainerFixed>
      {/*  */}
      <PayslipInfo 
        isOpen={payslipOpen}
        onClose={handlePayslipInfoClose}
        onSubmit={handlePayslipInfoSubmit}
        workerType={result.type}
      />
    </S.ResultContainer>
  )
}