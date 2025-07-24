import { useEffect, useState } from 'react';

type DayCalcProps = {
  onDataChange: (data: {amount: number; workingDays:number; isValid: boolean}) => void;
  selectedTab: string;
}

export default function DayCalc({onDataChange, selectedTab}:DayCalcProps) {
  const [amount, setAmount] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setAmount('');
    setWorkingDays(0);
    setIsValid(false);
  }, [selectedTab]);

  // 유효성 검사
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

  useEffect(()=>{
    const num = parseInt(amount) || 0;
    const valid = isValid && workingDays > 0;
    onDataChange({amount: num, workingDays, isValid: valid});
  },[amount, workingDays, isValid, onDataChange]);

  return (
    <div className='text-left pb-4'>
      <div className="flex w-full items-center space-x-4">
        <label className='text-gray-700 font-semibold' style={{'width':'60px'}}>
          지급액 <span className="text-red-500">*</span>
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
      <div className="flex w-full items-center space-x-4">
        <label className='text-gray-700 font-semibold' style={{'width':'60px'}}>근무일수</label>
        <select 
          value={workingDays}
          onChange={(e)=>setWorkingDays(parseInt(e.target.value))}
          className='border border-gray-300 flex grow text-right rounded-md px-3 py-2 mt-1'
        >
          <option value="{0}">선택</option>
          {[...Array(31)].map((_, i)=>(
              <option key={i+1} value={i+1}>{i+1}일</option>
            ))
          }
        </select>
      </div>
      {amount && !isValid && (
        <p className="">
          1원 이상 입력해주세요.
        </p>
      )}
    </div>
  );
}

