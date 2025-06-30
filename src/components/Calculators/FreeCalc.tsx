import { useState } from 'react';

type FreeCalcProps = {
  onDataChange: (data: {amount: number; isValid: boolean}) => void;
}

export default function FreeCalc({onDataChange}:FreeCalcProps) {
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleAmountChange = () =>{
    
  }

  return (
    <div className='flex'>
      <label className=''>
        지급액 <span className="text-red-50">*</span>
      </label>
      <div className="">
        <input 
          type="text"
          className=''
          value={amount}
          onChange={handleAmountChange}
          placeholder='0'
        />
        <span className="">원</span>
      </div>
      {amount && !isValid && (
        <p className="">
          1원 이상 입력해주세요.
        </p>
      )}
    </div>
  );
}

