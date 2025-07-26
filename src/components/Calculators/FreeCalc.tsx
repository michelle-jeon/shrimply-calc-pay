import { useEffect, useState } from 'react';
import * as S from './Calculators.styles';

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
      {amount && !isValid && (
        <S.ErrorMessage>
          1원 이상 입력해주세요.
        </S.ErrorMessage>
      )}
    </S.CalculatorContainer>
  );
}

