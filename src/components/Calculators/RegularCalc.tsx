import { useEffect, useState } from 'react';
import './Calculators.css'

type RegularCalcProps = {
  onDataChange: (data: {amount: number; isValid: boolean}) => void;
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
  const [isHealthInsuranceExempt, setIsHealthInsuranceExempt] = useState(false);

  useEffect(() => {
    setAmount('');
    setIsValid(false);
  }, [selectedTab]);

  // 유효성 검사... 그런데 기본급 0원일수도 있었던듯?
  const validateAmount = (value:string): boolean => {
    return !isNaN(parseInt(value)) && parseInt(value) > 0;
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setIsValid(validateAmount(value));
    }
  }

  const handleAllowanceChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setAllowances(prev => ({
        ...prev,
        [field]: value
      }));
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

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  }

  useEffect(()=>{
    const num = parseInt(amount) || 0;
    onDataChange({amount: num, isValid});
  },[amount, isValid, onDataChange]);

  return (
    <div>
      {/* 기본급 */}
      <div className='text-left pb-5 border-b border-gray-200'>
        <div className="flex w-full items-center space-x-4">
          <label className='text-gray-700 font-medium'>
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
      <div className="flex flex-col md:flex-row md:space-x-4 text-left md:justify-between pb-5 border-b border-gray-200">
        <div className='flex flex-col gap-5 grow pt-5'>
          <span className="text-gray-700 font-medium">비과세 수당</span>
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
                <label className="text-sm text-gray-600 w-20">{item.label}</label>
                <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
                  <input
                    type="text"
                    className="flex-1 text-right text-sm focus:outline-none"
                    value={allowances[item.key as keyof typeof allowances]}
                    onChange={(e) => handleAllowanceChange(item.key, e.target.value)}
                    placeholder={`최대 ${formatNumber(item.max)}`}
                  />
                  <span className="ml-1 text-xs text-gray-500">원</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 과세 수당 */}
        <div className='flex flex-col gap-5 grow pt-5'>
          <span className="text-gray-700 font-medium">과세 수당</span>
          <div className="space-y-3">
            {[
              { key: 'bonus', label: '연장근로' },
              { key: 'position', label: '야간근로' },
              { key: 'annualLeave', label: '휴일근로' },
              { key: 'overtime', label: '상여금' },
              { key: 'holiday', label: '직급수당' }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 font-500 w-20">{item.label}</label>
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
      {/* 공제 */}
      <div className="flex flex-col md:flex-row text-left gap-5 mt-5 pb-5 border-b border-gray-200">
        {/* 소득세 감면 */}
        <div className="flex w-full items-center">
          <label className="text-sm text-gray-600 w-20">소득세 감면</label>
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
        <div className="flex w-full items-center">
          <label className="text-sm text-gray-600 w-20">두루누리</label>
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
      <div className="space-y-4 pt-5 pb-5 border-b border-gray-200 text-left">
       <div className="flex justify-between items-center space-x-4">
        <span className="text-gray-700 font-medium">기준소득월액</span>
        <label
          htmlFor="healthInsuranceExempt"
          className="flex items-center bg-gray-100 px-2 py-1 rounded cursor-pointer"
        >
          <input
            type="checkbox"
            id="healthInsuranceExempt"
            checked={isHealthInsuranceExempt}
            onChange={(e) => setIsHealthInsuranceExempt(e.target.checked)}
            className="peer hidden"
          />
          <div
            className={`
              w-5 h-5 rounded-full border-2
              flex items-center justify-center
              ${isHealthInsuranceExempt ? 'border-gray-400' : 'border-gray-300'}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-3 ${isHealthInsuranceExempt ? 'text-gray-400' : 'text-gray-300'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className={`ml-2 text-sm font-bold ${isHealthInsuranceExempt ? 'text-gray-500' : 'text-gray-400'}`}>
            국민·건강보험 미가입
          </span>
        </label>
      </div>


        <div className="grid grid-cols-2 gap-8">
          {/* 국민연금 */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 w-20">국민연금</label>
            <div className="flex-1 flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                className="flex-1 text-right text-sm focus:outline-none"
                value={deductions.nationalPension}
                onChange={(e) => handleDeductionChange('nationalPension', e.target.value)}
                placeholder="0"
                disabled={isHealthInsuranceExempt}
              />
              <span className="ml-1 text-xs text-gray-500">원</span>
            </div>
          </div>

          {/* 고용보험 */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 w-20">고용보험</label>
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
      {/* 지급합계 */}
      <div>

      </div>
    </div>
  );
}

