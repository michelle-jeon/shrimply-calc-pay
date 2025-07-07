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
      <div className="flex flex-col md:flex-row md:space-x-4 text-left md:justify-between">
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
                    placeholder={`최대 ${formatNumber(item.max)} 원`}
                  />
                </div>
                <span className="text-xs text-gray-400"></span>
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
      <div>

      </div>
      {/* 기준소득월액 */}
      <div>

      </div>
    </div>
  );
}

