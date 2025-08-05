import * as S from './PayslipView.styles';

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
    <div>
    <S.PayslipContainer id='payslip-content'>
      {/* 급여명세서 헤더 */}
      <S.Header>
        <S.Title>
          {payslipInfo.workYear}년 {payslipInfo.workMonth}월 임금명세서
        </S.Title>
        
        {/* 기본 정보 */}
        <S.InfoRowWrap>
          <S.InfoRow>
            <S.NameLabel>{payslipInfo.companyName}</S.NameLabel>
            <S.NameLabel>{payslipInfo.workerName}</S.NameLabel>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoValue>지급일</S.InfoValue>
            <S.InfoValue>
              {payslipInfo.payYear}년 {payslipInfo.payMonth}월 {payslipInfo.payDay}일
            </S.InfoValue>
          </S.InfoRow>
        </S.InfoRowWrap>
      </S.Header>

      {/* 실수령액 */}
      <S.NetSalarySection>
        <S.NetSalaryRow>
          <S.NetSalaryLabel>실수령액</S.NetSalaryLabel>
          <S.NetSalaryAmount>
            {formatNumber(Math.round(result.netSalary))} 원
          </S.NetSalaryAmount>
        </S.NetSalaryRow>
      </S.NetSalarySection>

      {/* 지급 및 공제 내역 */}
      <S.DetailsGrid>
        {/* 지급합계 */}
        <S.DetailCard>
          <S.TotalRow >
            <S.InfoRow>
              <S.TotalLabel>지급합계</S.TotalLabel>
              <S.TotalAmount>
                {formatNumber(result.totSalary)} 원
              </S.TotalAmount>
            </S.InfoRow>
          </S.TotalRow>
          <S.DetailList>
            {result.type === "상용직" ? (
              <>
                {result.baseSalary && (
                  <S.DetailRow>
                    <S.DetailLabel>기본급</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.baseSalary)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.mealAllowance !== undefined && result.allowance?.mealAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>식대</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.mealAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.vehicleAllowance !== undefined && result.allowance?.vehicleAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>차량수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.vehicleAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.productionOverTimeAllowance !== undefined && result.allowance?.productionOverTimeAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>연장근로수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.productionOverTimeAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.childcareAllowance !== undefined && result.allowance?.childcareAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>육아수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.childcareAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.researchAllowance !== undefined && result.allowance?.researchAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>연구수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.researchAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.bonusAllowance !== undefined && result.allowance?.bonusAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>상여수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.bonusAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.positionAllowance !== undefined && result.allowance?.positionAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>직책수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.positionAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.annualLeaveAllowance !== undefined && result.allowance?.annualLeaveAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>연차수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.annualLeaveAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.overTimeAllowance !== undefined && result.allowance?.overTimeAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>연장근로수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.overTimeAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.holidayAllowance !== undefined && result.allowance?.holidayAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>휴일근로수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.holidayAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
                { result.allowance?.nightAllowance !== undefined && result.allowance?.nightAllowance > 0 && (
                  <S.DetailRow>
                    <S.DetailLabel>야간근로수당</S.DetailLabel>
                    <S.DetailAmount>
                      {formatNumber(result.allowance.nightAllowance)} 원
                    </S.DetailAmount>
                  </S.DetailRow>
                )}
              </>
            ) : (
              <S.DetailRow>
                <S.DetailLabel>기본급</S.DetailLabel>
                <S.DetailAmount>
                  {formatNumber(result.totSalary)} 원
                </S.DetailAmount>
              </S.DetailRow>
            )}
          </S.DetailList>
        </S.DetailCard>

        {/* 공제합계 */}
        <S.DetailCard>
          <S.TotalRow>
            <S.InfoRow>
              <S.TotalLabel $isDeduction>공제합계</S.TotalLabel>
              <S.TotalAmount $isDeduction>
                {formatNumber(Math.round(getTotalDeduction()))} 원
              </S.TotalAmount>
            </S.InfoRow>
          </S.TotalRow>
          <S.DetailList>
            <S.DetailRow>
              <S.DetailLabel>소득세</S.DetailLabel>
              <S.DetailAmount>
                {formatNumber(Math.round(result.withholdingTax))} 원
              </S.DetailAmount>
            </S.DetailRow>
            <S.DetailRow>
              <S.DetailLabel>지방세</S.DetailLabel>
              <S.DetailAmount>
                {formatNumber(Math.round(result.localTax))} 원
              </S.DetailAmount>
            </S.DetailRow>
            {result.nationalPension && (
              <S.DetailRow>
                <S.DetailLabel>국민연금</S.DetailLabel>
                <S.DetailAmount>
                  {formatNumber(Math.round(result.nationalPension))} 원
                </S.DetailAmount>
              </S.DetailRow>
            )}
            {result.healthInsurance && (
              <S.DetailRow>
                <S.DetailLabel>건강보험</S.DetailLabel>
                <S.DetailAmount>
                  {formatNumber(Math.round(result.healthInsurance))} 원
                </S.DetailAmount>
              </S.DetailRow>
            )}
            {result.longTermCareInsurance && (
              <S.DetailRow>
                <S.DetailLabel>장기요양보험</S.DetailLabel>
                <S.DetailAmount>
                  {formatNumber(Math.round(result.longTermCareInsurance))} 원
                </S.DetailAmount>
              </S.DetailRow>
            )}
            {result.employmentInsurance && (
              <S.DetailRow>
                <S.DetailLabel>고용보험</S.DetailLabel>
                <S.DetailAmount>
                  {formatNumber(Math.round(result.employmentInsurance))} 원
                </S.DetailAmount>
              </S.DetailRow>
            )}
          </S.DetailList>
          
        </S.DetailCard>
      </S.DetailsGrid>

    </S.PayslipContainer>
      {/* 버튼들 */}
      <S.ButtonContainerFixed>
        <S.ButtonContainer>
          <S.BackButton onClick={onBack}>
            뒤로
          </S.BackButton>
          <S.DownloadButton onClick={onDownload}>
            저장하기
          </S.DownloadButton>
        </S.ButtonContainer>
        </S.ButtonContainerFixed>
    </div>
  );
}