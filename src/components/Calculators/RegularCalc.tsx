import { useEffect, useState } from 'react';
import { RegularCalcData } from '../CalculatorSection/CalculatorSection';

type RegularCalcProps = {
  onDataChange: (data: RegularCalcData) => void;
  selectedTab: string;
}

export default function RegularCalc({onDataChange, selectedTab}:RegularCalcProps) {
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

  // 유효성 검사... 그런데 기본급 0원일수도 있었던듯?
  const validateAmount = (value:string): boolean => {
    return !isNaN(parseInt(value)) && parseInt(value) > 0;
  }

  // 인풋 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setIsValid(validateAmount(value));
    }
  }
  const handleAllowanceChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
    const numericValue = parseInt(value) || 0;

    // 각 항목의 max값을 찾아서 적용
    const maxMap: Record<string, number> = {
      meal: 200000,
      vehicle: 200000,
      childbirth: 200000,
      research: 200000,
      productionOvertime: 2400000
    };

    const max = maxMap[field] ?? Infinity;

    if (numericValue <= max) {
      setAllowances(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      // max보다 큰 값을 입력하면 max로 강제
      setAllowances(prev => ({
        ...prev,
        [field]: max.toString()
      }));
    }
  }
  }
  const handleDeductionChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setDeductions(prev => ({
        ...prev,
        [field]: value
      }));
    }
  }

  // 포매터
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  }

  //수당합계 계산
  const calculateAllowances = () => {
    const nonTaxableTotal = Object.values({
      meal: allowances.meal,
      vehicle: allowances.vehicle,
      childbirth: allowances.childbirth,
      research: allowances.research,
      productionOvertime: allowances.productionOvertime
    }).reduce((sum, val) => sum + (parseInt(val) || 0), 0);

    const taxableTotal = Object.values({
      bonus: allowances.bonus,
      position: allowances.position,
      annualLeave: allowances.annualLeave,
      overtime: allowances.overtime,
      holiday: allowances.holiday,
      night: allowances.night
    }).reduce((sum, val) => sum + (parseInt(val) || 0), 0);

    return { nonTaxableTotal, taxableTotal };
  };

  // 지급 합계 계산
  const calculateTotalAmount = () => {
    const baseAmount = parseInt(amount) || 0;
    const { nonTaxableTotal, taxableTotal } = calculateAllowances();
    return baseAmount + nonTaxableTotal + taxableTotal;
  };

  useEffect(()=>{
    const baseAmount = parseInt(amount) || 0;
    const { nonTaxableTotal, taxableTotal } = calculateAllowances();
    const totalAmount = calculateTotalAmount();
    onDataChange({
      amount: totalAmount,
      isValid,
      baseAmount,
      nonTaxableAllowances: nonTaxableTotal,
      taxableAllowances: taxableTotal,
      taxReduction,
      durunuri,
      isHealthInsuranceJoin,
      deductions,
      allowances: allowances
    });
  },[amount, isValid, allowances, taxReduction, durunuri, isHealthInsuranceJoin, deductions, onDataChange]);

  return (
    <div className='pb-4'>
      {/* 기본급 */}
      <div className='text-left pb-3'>
        <div className="flex w-full items-center space-x-4">
          <label className='text-gray-700 font-semibold'>
            기본급 <span className="text-red-500">*</span>
          </label>
          <div className="flex grow items-center border border-gray-300 rounded-md px-3 py-2">
            <input 
              type="text"
              className='grow text-right w-full focus:outline-none'
              value={amount}
              onChange={handleAmountChange}
              placeholder='0'
            />
            <span className="ml-2 text-gray-500">원</span>
          </div>
        </div>
        {amount && !isValid && (
          <p className="pt-2 text-red-500">
            1원 이상 입력해주세요.
          </p>
        )}
      </div>
      {/* 수당 */}
      <div className="flex flex-col md:flex-row md:space-x-10 text-left md:justify-between pb-3">
        <div className='flex flex-col gap-5 grow pt-5'>
          <span className="text-gray-400 font-semibold">비과세 수당</span>
          {/* 비과세 수당 */}
          <div className="space-y-3">
            {[
              { key: 'meal', label: '식대', max: 200000 },
              { key: 'vehicle', label: '차량유지비', max: 200000 },
              { key: 'childbirth', label: '출산 및 보육', max: 200000 },
              { key: 'research', label: '연구비', max: 200000 },
              { key: 'productionOvertime', label: '생산직 연장', max: 2400000 }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 w-20 font-semibold">{item.label}</label>
                <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
                  <input
                    type="text"
                    className="flex-1 text-right text-sm focus:outline-none"
                    value={allowances[item.key as keyof typeof allowances]}
                    onChange={(e) => handleAllowanceChange(item.key, e.target.value)}
                    placeholder={`${item.key === 'productionOvertime' ? '연 최대' : '최대'} ${formatNumber(item.max)}`}
                  />
                  <span className="ml-1 text-xs text-gray-500">원</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 과세 수당 */}
        <div className='flex flex-col gap-5 grow pt-5'>
          <span className="text-gray-400 font-semibold">과세 수당</span>
          <div className="space-y-3">
            {[
              { key: 'bonus', label: '연장근로' },
              { key: 'position', label: '야간근로' },
              { key: 'annualLeave', label: '휴일근로' },
              { key: 'overtime', label: '상여금' },
              { key: 'holiday', label: '직급수당' }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 font-500 w-20 font-semibold">{item.label}</label>
                <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
                  <input
                    type="text"
                    className="flex-1 text-right text-sm focus:outline-none"
                    value={allowances[item.key as keyof typeof allowances]}
                    onChange={(e) => handleAllowanceChange(item.key, e.target.value)}
                    placeholder="0"
                  />
                  <span className="ml-1 text-xs text-gray-500">원</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 지급합계 */}
      <div className="flex justify-between items-center py-5 border-b border-gray-200">
        <span className="text-lg font-bold text-gray-900">지급합계</span>
        <span className="text-xl font-bold text-blue-600">
          {formatNumber(calculateTotalAmount())} 원
        </span>
      </div>
      {/* 공제 */}
      <div className="flex flex-col md:flex-row md:space-x-10 text-left pb-5 border-b border-gray-200">
        {/* 소득세 감면 */}
        <div className="flex w-full items-center pt-5">
          <label className="text-sm text-gray-600 w-20 font-semibold">소득세 감면</label>
          <div className="flex grow bg-gradient-to-r from-[#ed8e5f33] h-9 relative rounded-lg to-50% to-[#0220470d]">
            {[0, 30, 90].map((value) => (
              <button
                key={value}
                onClick={() => setTaxReduction(value)}
                className={`px-3 py-1 text-sm rounded m-1 grow ${
                  taxReduction === value
                    ? 'bg-white text-orange-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>

        {/* 두루누리 */}
        <div className="flex w-full items-center pt-5">
          <label className="text-sm text-gray-600 w-20 font-semibold">두루누리</label>
          <div className="flex grow bg-gradient-to-r from-[#ed8e5f33] h-9 relative rounded-lg to-50% to-[#0220470d]">
            {[0, 80].map((value) => (
              <button
                key={value}
                onClick={() => setDurunuri(value)}
                className={`px-3 py-1 text-sm rounded m-1 grow ${
                  durunuri === value
                    ? 'bg-white text-orange-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 기준소득월액 */}
      <div className="space-y-4 pt-5 text-left">
       <div className="flex justify-between items-center space-x-4">
        <span className="text-gray-400 font-semibold">기준소득월액</span>
        <label
          htmlFor="healthInsuranceExempt"
          className={`
          flex items-center px-2 py-1 rounded cursor-pointer
          ${isHealthInsuranceJoin ? 'bg-gray-300' : 'bg-gray-100'}
        `}
        >
          <input
            type="checkbox"
            id="healthInsuranceExempt"
            checked={isHealthInsuranceJoin}
            onChange={(e) => setIsHealthInsuranceJoin(e.target.checked)}
            className="peer hidden"
          />
          <div
            className={`
              w-5 h-5 rounded-full border-2
              flex items-center justify-center
              ${isHealthInsuranceJoin ? 'border-gray-400' : 'border-gray-300'}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-3 ${isHealthInsuranceJoin ? 'text-gray-400' : 'text-gray-300'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className={`ml-2 text-sm font-bold ${isHealthInsuranceJoin ? 'text-gray-500' : 'text-gray-400'}`}>
            국민·건강보험 {isHealthInsuranceJoin ? '가입':'미가입'}
          </span>
        </label>
      </div>


        <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0 text-left">
          {/* 국민연금 */}
          <div className="flex w-full items-center space-x-2">
            <label className="text-sm text-gray-600 w-20 font-semibold">국민연금</label>
            <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                className="flex-1 text-right text-sm focus:outline-none"
                value={deductions.nationalPension}
                onChange={(e) => handleDeductionChange('nationalPension', e.target.value)}
                placeholder="0"
                disabled={!isHealthInsuranceJoin}
              />
              <span className="ml-1 text-xs text-gray-500">원</span>
            </div>
          </div>

          {/* 고용보험 */}
          <div className="flex w-full items-center space-x-2">
            <label className="text-sm text-gray-600 w-20 font-semibold">고용보험</label>
            <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                className="flex-1 text-right text-sm focus:outline-none"
                value={deductions.employmentInsurance}
                onChange={(e) => handleDeductionChange('employmentInsurance', e.target.value)}
                placeholder="0"
              />
              <span className="ml-1 text-xs text-gray-500">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

