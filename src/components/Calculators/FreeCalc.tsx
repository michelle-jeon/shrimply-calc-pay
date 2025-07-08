import { useEffect, useState } from 'react';

type FreeCalcProps = {
  onDataChange: (data: {amount: number; isValid: boolean}) => void;
  selectedTab: string;
}

export default function FreeCalc({onDataChange, selectedTab}:FreeCalcProps) {
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setAmount('');
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
    onDataChange({amount: num, isValid});
  },[amount, isValid, onDataChange]);

  return (
    <div className='text-left pb-4'>
      <div className="flex w-full items-center space-x-4">
        <label className='text-gray-700 font-semibold'>
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
      {amount && !isValid && (
        <p className="">
          1원 이상 입력해주세요.
        </p>
      )}
    </div>
  );
}

