import { useEffect, useState } from 'react';
import * as S from './Calculators.styles';

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
    <S.CalculatorContainer>
      <S.InputRow>
        <S.Label className='required'>
          지급액
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
      <S.InputRow>
        <S.Label>근무일수</S.Label>
        <S.Select 
          value={workingDays}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWorkingDays(parseInt(e.target.value))}
        >
          <option value="{0}">선택</option>
          {[...Array(31)].map((_, i)=>(
              <option key={i+1} value={i+1}>{i+1}일</option>
            ))
          }
        </S.Select>
      </S.InputRow>
      {amount && !isValid && (
        <S.ErrorMessage>
          1원 이상 입력해주세요.
        </S.ErrorMessage>
      )}
    </S.CalculatorContainer>
  );
}

