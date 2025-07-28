import { useEffect, useState } from 'react';
import { RegularCalcData } from '../CalculatorSection/CalculatorSection';
import * as S from './Calculators.styles';
import * as RS from './RegularCalc.styles';

type RegularCalcProps = {
  onDataChange: (data: RegularCalcData) => void;
  selectedTab: string;
};

export default function RegularCalc({onDataChange, selectedTab}:RegularCalcProps) {
  const allowanceData = {
    nonTaxable: [
      { key: 'meal', label: '식대', max: 200000 },
      { key: 'vehicle', label: '차량유지비', max: 200000 },
      { key: 'childbirth', label: '출산 및 보육', max: 200000 },
      { key: 'research', label: '연구비', max: 200000 },
      { key: 'productionOvertime', label: '생산직 연장', max: 2400000 }
    ],
    taxable: [
      { key: 'bonus', label: '연장근로' },
      { key: 'position', label: '야간근로' },
      { key: 'annualLeave', label: '휴일근로' },
      { key: 'overtime', label: '상여금' },
      { key: 'holiday', label: '직급수당' }
    ]
  };
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [allowances, setAllowances] = useState({
    meal: '',
    vehicle: '',
    childbirth: '',
    research: '',
    productionOvertime: '',
    bonus: '',
    position: '',
    annualLeave: '',
    overtime: '',
    holiday: '',
    night: ''
  });
  const [deductions, setDeductions] = useState({
    nationalPension: '',
    employmentInsurance: ''
  });
  const [taxReduction, setTaxReduction] = useState(0);
  const [durunuri, setDurunuri] = useState(0);
  const [isHealthInsuranceJoin, setIsHealthInsuranceJoin] = useState(true);

  // 유틸리티 함수
  const removeCommas = (str: string): string => {
    return str.replace(/,/g, '');
  };

  const formatNumberInput = (value: string): string => {
    if (!value) return '';
    const number = parseInt(removeCommas(value));
    return isNaN(number) ? '' : number.toLocaleString();
  };

  const getNumericValue = (value: string): number => {
    const cleaned = removeCommas(value);
    return parseInt(cleaned) || 0;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  }

  //탭 선택될때마다 데이터날리기
  useEffect(() => {
    setAmount('');
    setIsValid(false);
    setAllowances({
      meal: '',
      vehicle: '',
      childbirth: '',
      research: '',
      productionOvertime: '',
      bonus: '',
      position: '',
      annualLeave: '',
      overtime: '',
      holiday: '',
      night: ''
    });
    setDeductions({
      nationalPension: '',
      employmentInsurance: ''
    });
    setTaxReduction(0);
    setDurunuri(0);
    setIsHealthInsuranceJoin(true);
  }, [selectedTab]);

  // 유효성 검사
  const validateAmount = (value: string): boolean => {
    const numValue = getNumericValue(value);
    return !isNaN(numValue) && numValue > 0;
  }

  // 인풋 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeCommas(value);
    
    if (/^\d*$/.test(cleanValue)) {
      const formatted = formatNumberInput(cleanValue);
      setAmount(formatted);
      setIsValid(validateAmount(formatted));
    }
  }

  const handleAllowanceChange = (field: string, value: string) => {
    const cleanValue = removeCommas(value);
    
    if (/^\d*$/.test(cleanValue)) {
      const numericValue = parseInt(cleanValue) || 0;

      // 각 항목의 max값을 찾아서 적용
       const nonTaxableItem = allowanceData.nonTaxable.find(item => item.key === field);
      const max = nonTaxableItem?.max ?? Infinity;

      if (numericValue <= max) {
        const formatted = formatNumberInput(cleanValue);
        setAllowances(prev => ({
          ...prev,
          [field]: formatted
        }));
      } else {
        // max보다 큰 값을 입력하면 max로 강제
        const formatted = formatNumberInput(max.toString());
        setAllowances(prev => ({
          ...prev,
          [field]: formatted
        }));
      }
    }
  }

  const handleDeductionChange = (field: string, value: string) => {
    const cleanValue = removeCommas(value);
    
    if (/^\d*$/.test(cleanValue)) {
      const formatted = formatNumberInput(cleanValue);
      setDeductions(prev => ({
        ...prev,
        [field]: formatted
      }));
    }
  }

  //수당합계 계산
  const calculateAllowances = () => {
    const nonTaxableTotal = allowanceData.nonTaxable.reduce((sum, item) => 
      sum + getNumericValue(allowances[item.key as keyof typeof allowances]), 0
    );

    const taxableTotal = allowanceData.taxable.reduce((sum, item) => 
      sum + getNumericValue(allowances[item.key as keyof typeof allowances]), 0
    );

    return { nonTaxableTotal, taxableTotal };
  };

  // 지급 합계 계산
  const calculateTotalAmount = () => {
    const baseAmount = getNumericValue(amount);
    const { nonTaxableTotal, taxableTotal } = calculateAllowances();
    return baseAmount + nonTaxableTotal + taxableTotal;
  };

  useEffect(() => {
    const baseAmount = getNumericValue(amount);
    const { nonTaxableTotal, taxableTotal } = calculateAllowances();
    const totalAmount = calculateTotalAmount();
    
    const numericDeductions = {
      nationalPension: getNumericValue(deductions.nationalPension).toString(),
      employmentInsurance: getNumericValue(deductions.employmentInsurance).toString()
    };
    
    const numericAllowances = Object.keys(allowances).reduce((acc, key) => {
      acc[key] = getNumericValue(allowances[key as keyof typeof allowances]).toString();
      return acc;
    }, {} as any);

    onDataChange({
      amount: totalAmount,
      isValid,
      baseAmount,
      nonTaxableAllowances: nonTaxableTotal,
      taxableAllowances: taxableTotal,
      taxReduction,
      durunuri,
      isHealthInsuranceJoin,
      deductions: numericDeductions,
      allowances: numericAllowances
    });
  }, [amount, isValid, allowances, taxReduction, durunuri, isHealthInsuranceJoin, deductions, onDataChange]);

  return (
    <S.CalculatorContainer>
      {/* 기본급 */}
      <div className='text-left pb-3'>
        <S.InputRow>
          <S.Label className='required'>
            기본급
          </S.Label>
          <S.InputWrapper>
            <S.Input 
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder='0'
            />
            <S.CurrencyLabel>원</S.CurrencyLabel>
          </S.InputWrapper>
        </S.InputRow>
        {amount && !isValid && (
          <S.ErrorMessage>
            1원 이상 입력해주세요.
          </S.ErrorMessage>
        )}
      </div>
      {/* 수당 */}
      <div className="flex flex-col md:flex-row md:space-x-10 text-left md:justify-between pb-3">
        <RS.AllowanceSection>
          <RS.SectionTitle>비과세 수당</RS.SectionTitle>
          <div className="space-y-3">
            {allowanceData.nonTaxable.map((item) => (
              <RS.AllowanceRow key={item.key}>
                <RS.AllowanceLabel>{item.label}</RS.AllowanceLabel>
                <S.InputWrapper>
                  <S.Input
                    type="text"
                    value={allowances[item.key as keyof typeof allowances]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAllowanceChange(item.key, e.target.value)}
                    placeholder={`${item.key === 'productionOvertime' ? '연 최대' : '최대'} ${formatNumber(item.max)}`}
                  />
                  <S.CurrencyLabel>원</S.CurrencyLabel>
                </S.InputWrapper>
              </RS.AllowanceRow>
            ))}
          </div>
        </RS.AllowanceSection>
        {/* 과세 수당 */}
        <RS.AllowanceSection>
          <RS.SectionTitle>과세 수당</RS.SectionTitle>
          <div className="space-y-3">
            {allowanceData.taxable.map((item) => (
              <RS.AllowanceRow key={item.key}>
                <RS.AllowanceLabel>{item.label}</RS.AllowanceLabel>
                <S.InputWrapper>
                  <S.Input
                    type="text"
                    value={allowances[item.key as keyof typeof allowances]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAllowanceChange(item.key, e.target.value)}
                    placeholder="0"
                  />
                  <S.CurrencyLabel>원</S.CurrencyLabel>
                </S.InputWrapper>
              </RS.AllowanceRow>
            ))}
          </div>
        </RS.AllowanceSection>
      </div>
      {/* 지급합계 */}
      <RS.TotalAmountRow>
        <RS.TotalAmountLabel>지급합계</RS.TotalAmountLabel>
        <RS.TotalAmount>
          {formatNumber(calculateTotalAmount())} 원
        </RS.TotalAmount>
      </RS.TotalAmountRow>
      {/* 공제 */}
      <RS.DeductionSection>
        {/* 소득세 감면 */}
        <RS.DeductionRow>
          <RS.AllowanceLabel>소득세 감면</RS.AllowanceLabel>
          <RS.ToggleButtonContainer>
            {[0, 30, 90].map((value) => (
              <RS.ToggleButton
                key={value}
                onClick={() => setTaxReduction(value)}
                $isActive={taxReduction === value}
              >
                {value}%
              </RS.ToggleButton>
            ))}
          </RS.ToggleButtonContainer>
        </RS.DeductionRow>

        {/* 두루누리 */}
        <RS.DeductionRow>
          <RS.AllowanceLabel>두루누리</RS.AllowanceLabel>
          <RS.ToggleButtonContainer>
            {[0, 80].map((value) => (
              <RS.ToggleButton
                key={value}
                onClick={() => setDurunuri(value)}
                $isActive={durunuri === value}
              >
                {value}%
              </RS.ToggleButton>
            ))}
          </RS.ToggleButtonContainer>
        </RS.DeductionRow>
      </RS.DeductionSection>
      
      {/* 기준소득월액 */}
      <RS.InsuranceContainer>
        <RS.InsuranceRow>
          <RS.SectionTitle>기준소득월액</RS.SectionTitle>
          <RS.InsuranceLabel
            htmlFor="healthInsuranceExempt"
            $isChecked={isHealthInsuranceJoin}
          >
            <RS.Checkbox
              type="checkbox"
              id="healthInsuranceExempt"
              checked={isHealthInsuranceJoin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsHealthInsuranceJoin(e.target.checked)}
            />
            <RS.CheckboxIcon 
              $isChecked={isHealthInsuranceJoin}
            >
              {isHealthInsuranceJoin ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.6484 6.13998L7.38174 9.40665C7.26507 9.52332 7.1484 9.58165 6.9734 9.58165C6.7984 9.58165 6.68174 9.52332 6.56507 9.40665L4.58174 7.42332C4.3484 7.18998 4.3484 6.83998 4.58174 6.60665C4.81507 6.37332 5.16507 6.37332 5.3984 6.60665L6.9734 8.18165L9.83174 5.32332C10.0651 5.08998 10.4151 5.08998 10.6484 5.32332C10.8817 5.55665 10.8817 5.90665 10.6484 6.13998Z"
                    fill="#001D3A"
                    fillOpacity="0.18"
                  />
                  <path
                    d="M7.61491 1.93998C10.5316 1.93998 12.8649 4.27332 12.8649 7.18998C12.8649 10.1066 10.5316 12.44 7.61491 12.44C4.69824 12.44 2.36491 10.1066 2.36491 7.18998C2.36491 4.27332 4.69824 1.93998 7.61491 1.93998ZM7.61491 0.773315C4.05658 0.773315 1.19824 3.63165 1.19824 7.18998C1.19824 10.7483 4.05658 13.6066 7.61491 13.6066C11.1732 13.6066 14.0316 10.7483 14.0316 7.18998C14.0316 3.63165 11.1732 0.773315 7.61491 0.773315Z"
                    fill="#001D3A"
                    fillOpacity="0.18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 6.15002C11.5 9.18752 9.0375 11.65 6 11.65C2.9625 11.65 0.5 9.18752 0.5 6.15002C0.5 3.11252 2.9625 0.650024 6 0.650024C9.0375 0.650024 11.5 3.11252 11.5 6.15002Z"
                    fill="#EF6878"
                  />
                  <path
                    d="M3.75 5.98805L5.458 7.69605L8.25 4.90405"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </RS.CheckboxIcon>

            <RS.InsuranceText $isChecked={isHealthInsuranceJoin}>
              고용·산재만 가입했어요
            </RS.InsuranceText>
          </RS.InsuranceLabel>
        </RS.InsuranceRow>

        <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0 text-left">
          {/* 국민연금 */}
          <S.InputRow>
            <RS.AllowanceLabel>국민연금</RS.AllowanceLabel>
            <S.InputWrapper>
              <S.Input
                type="text"
                value={deductions.nationalPension}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDeductionChange('nationalPension', e.target.value)}
                placeholder="0"
                disabled={!isHealthInsuranceJoin}
              />
              <S.CurrencyLabel>원</S.CurrencyLabel>
            </S.InputWrapper>
          </S.InputRow>

          {/* 고용보험 */}
          <S.InputRow>
            <RS.AllowanceLabel>고용보험</RS.AllowanceLabel>
            <S.InputWrapper>
              <S.Input
                type="text"
                value={deductions.employmentInsurance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDeductionChange('employmentInsurance', e.target.value)}
                placeholder="0"
              />
              <S.CurrencyLabel>원</S.CurrencyLabel>
            </S.InputWrapper>
          </S.InputRow>
        </div>
      </RS.InsuranceContainer>
    </S.CalculatorContainer>
  );
}