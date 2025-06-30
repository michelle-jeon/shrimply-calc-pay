import { useEffect, useState } from 'react';

type FreeCalcProps = {
  onDataChange: (data: {amount: number; isValid: boolean}) => void;
}

export default function FreeCalc({onDataChange}:FreeCalcProps) {
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  // 유효성 검사
  const validateAmount = (value:string): boolean => {
    return !isNaN(parseInt(value)) && parseInt(value) > 0;
  }

  const handleAmountChange = (e) =>{
    setAmount(e.target.value);
    const valid = validateAmount(e.target.value);
    setIsValid(valid);
  }

  useEffect(()=>{
    const num = parseInt(amount) || 0;
    onDataChange({amount: num, isValid});
  },[amount, isValid, onDataChange]);

  return (
    <div className='text-left'>
      <div className="flex w-full">
        <label className=''>
          지급액 <span className="text-red-50">*</span>
        </label>
        <div className="flex grow">
          <input 
            type="text"
            className='grow text-right'
            value={amount}
            onChange={handleAmountChange}
            placeholder='0'
          />
          <span className="">원</span>
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

