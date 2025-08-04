import { useEffect, useState } from "react";
import * as S from './PayslipInfo.styles';
import * as RS from '../Calculators/RegularCalc.styles';

export type PayslipInfoData = {
  companyName: string;
  workerName: string;
  workYear: string;
  workMonth: string;
  payYear: string;
  payMonth: string;
  payDay: string;
  workerCountType: '4인 이하' | '5인 이상';
}

type PayslipInfoProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (info: PayslipInfoData) => void;
  workerType:string;
};

export default function PayslipInfo({isOpen,onClose,onSubmit,workerType}: PayslipInfoProps){
  const [payslipInfo,setPayslipInfo] = useState<PayslipInfoData>({
    companyName: '',
    workerName: '',
    workYear: '',
    workMonth: '',
    payYear: '',
    payMonth: '',
    payDay: '',
    workerCountType: '4인 이하',
  });
  const [isValid, setIsValid] = useState(false);

   // 현재 날짜 정보
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // 컴포넌트가 열릴 때마다 현재 날짜로 초기화
  useEffect(() => {
    if (isOpen) {
      setPayslipInfo({
        companyName: '',
        workerName: '',
        workYear: currentYear.toString(),
        workMonth: currentMonth.toString(),
        payYear: currentYear.toString(),
        payMonth: currentMonth.toString(),
        payDay: currentDay.toString(),
        workerCountType: '4인 이하',
      });
    }
  }, [isOpen, currentYear, currentMonth, currentDay]);

  // 선택 가능한 연도 목록 (작년부터 올해까지)
  const getAvailableYears = () => {
    const years: number[] = [];
    for (let year = currentYear - 1; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  // 선택 가능한 월 목록 (연도에 따라 다름)
  const getAvailableMonths = (year: string) => {
    const yearNum = parseInt(year);
    const months:number[] = [];
    
    if (yearNum === currentYear - 1) {
      // 작년인 경우 1월부터 12월까지
      for (let month = 1; month <= 12; month++) {
        months.push(month);
      }
    } else if (yearNum === currentYear) {
      // 올해인 경우 1월부터 현재월까지
      for (let month = 1; month <= currentMonth; month++) {
        months.push(month);
      }
    }
    
    return months;
  };

  // 지급일 연도 목록 (근무년월 이후만 가능)
  const getAvailablePayYears = () => {
    if (!payslipInfo.workYear) return getAvailableYears();
    
    const workYearNum = parseInt(payslipInfo.workYear);
    const years:number[] = [];
    
    for (let year = workYearNum; year <= currentYear; year++) {
      years.push(year);
    }
    
    return years;
  };

  // 지급일 월 목록 (근무년월 이후만 가능)
  const getAvailablePayMonths = (payYear: string) => {
    if (!payYear || !payslipInfo.workYear || !payslipInfo.workMonth) {
      return getAvailableMonths(payYear);
    }
    
    const payYearNum = parseInt(payYear);
    const workYearNum = parseInt(payslipInfo.workYear);
    const workMonthNum = parseInt(payslipInfo.workMonth);
    
    const months:number[] = [];
    
    if (payYearNum === currentYear - 1) {
      // 작년인 경우
      const startMonth = payYearNum === workYearNum ? workMonthNum : 1;
      for (let month = startMonth; month <= 12; month++) {
        months.push(month);
      }
    } else if (payYearNum === currentYear) {
      // 올해인 경우
      const startMonth = payYearNum === workYearNum ? workMonthNum : 1;
      for (let month = startMonth; month <= currentMonth; month++) {
        months.push(month);
      }
    }
    
    return months;
  };

  // 선택 가능한 일 목록 (연도와 월에 따라 다름)
  const getAvailableDays = (year: string, month: string) => {
    if (!year || !month) return [];
    
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    // 해당 월의 마지막 날 구하기
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    
    const days:number[] = [];
    let maxDay = lastDay;
    
    // 현재 연월인 경우 오늘까지만
    if (yearNum === currentYear && monthNum === currentMonth) {
      maxDay = Math.min(lastDay, currentDay);
    }
    
    for (let day = 1; day <= maxDay; day++) {
      days.push(day);
    }
    
    return days;
  };

  //값 변경 시마다 validation
  useEffect(() => {
    const isAllValid =
      payslipInfo.companyName.trim() !== '' &&
      payslipInfo.workerName.trim() !== '' &&
      payslipInfo.workYear !== '' &&
      payslipInfo.workMonth !== '' &&
      payslipInfo.payYear !== '' &&
      payslipInfo.payMonth !== '' &&
      payslipInfo.payDay !== '';

    setIsValid(isAllValid);
  }, [payslipInfo]);

  //근무 연도 변경 : 월 초기화, 지급일 검증
  const handleWorkYearChange =(newYear:string)=>{
    const newInfo = {
      ...payslipInfo,
      workYear:newYear,
      workMonth:''
    };

    if(payslipInfo.payYear && payslipInfo.payMonth){
      if(parseInt(payslipInfo.payYear) < parseInt(newYear)){
        newInfo.payYear='';
        newInfo.payMonth='';
        newInfo.payDay='';
      }
    }
    setPayslipInfo(newInfo);
  }

  //근무월 변경
  const handleWorkMonthChange =(newMonth:string) =>{
    const newInfo={
      ...payslipInfo,
      workMonth:newMonth,
    }

    if(payslipInfo.payYear && payslipInfo.payMonth){
      const payYearNum = parseInt(payslipInfo.payYear);
      const payMonthNum = parseInt(payslipInfo.payMonth);
      const workYearNum = parseInt(payslipInfo.workYear);
      const newWorkMonthNum = parseInt(newMonth);
      
      if (payYearNum === workYearNum && payMonthNum < newWorkMonthNum){
        newInfo.payMonth = '';
        newInfo.payDay = '';
      }
    }
    setPayslipInfo(newInfo);
  }

  // 지급 연도 변경
  const handlePayYearChange = (newYear: string) => {
    setPayslipInfo({
      ...payslipInfo,
      payYear: newYear,
      payMonth: '',
      payDay: '' 
    });
  };

  //지급월 변경
  const handlePayMonthChange = (newMonth: string) => {
    const availableDays = getAvailableDays(payslipInfo.payYear, newMonth);
    const currentDay = parseInt(payslipInfo.payDay);
    
    setPayslipInfo({
      ...payslipInfo,
      payMonth: newMonth,
      payDay: availableDays.includes(currentDay) && !isNaN(currentDay) ? payslipInfo.payDay : '' // 현재 선택된 일이 유효하지 않으면 초기화
    });
  };

  //지급일 변경
  const handlePayDayChange = (newDay: string) => {
    setPayslipInfo({
      ...payslipInfo,
      payDay: newDay
    });
  };

  //만들기
  const handleSubmit =()=>{
    onSubmit(payslipInfo);
  }

  // 닫힘
  if(!isOpen) return null;

  //열림
  return (
     <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <S.InputSection>
          {/* 사업장명 */}
          <S.InputRow>
            <S.Label className="required">
              사업장명
            </S.Label>
            <S.Input
              type="text"
              value={payslipInfo.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayslipInfo({...payslipInfo, companyName: e.target.value})}
              placeholder="사업장명을 입력해주세요"
            />
          </S.InputRow>

          {/* 소득자명 */}
          <S.InputRow>
            <S.Label className="required">
              소득자명
            </S.Label>
            <S.Input
              type="text"
              value={payslipInfo.workerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayslipInfo({...payslipInfo, workerName: e.target.value})}
              placeholder="소득자명을 입력해주세요"
            />
          </S.InputRow>
          {/* 상시근로자수 */}
          {workerType === '상용직' && (
            <S.InputRow>
              <S.Label>상시 근로자수</S.Label>
              <RS.ToggleButtonContainer>
                {["4인 이하","5인 이상"].map((value, idx)=>(
                  <RS.ToggleButton
                    key={idx}
                    onClick={() => setPayslipInfo({ ...payslipInfo, workerCountType: value as '4인 이하' | '5인 이상' })}
                    $isActive={payslipInfo.workerCountType === value}
                  >
                    {value}
                  </RS.ToggleButton>
                ))}
              </RS.ToggleButtonContainer>
            </S.InputRow>
          )}

          {/* 근무년월 */}
          <S.InputRow>
            <S.Label>근무년월</S.Label>
            <div className="flex space-x-2">
              <S.Select
                value={payslipInfo.workYear}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleWorkYearChange(e.target.value)}
              >
                <option value="">선택</option>
                {getAvailableYears().map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </S.Select>
              <S.Select
                value={payslipInfo.workMonth}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handleWorkMonthChange(e.target.value)}
              >
                <option value="">선택</option>
                {getAvailableMonths(payslipInfo.workYear).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </S.Select>
            </div>
          </S.InputRow>

          {/* 지급일 */}
          <S.InputRow>
            <S.Label>지급일</S.Label>
            <div className="flex space-x-2">
              <S.Select
                value={payslipInfo.payYear}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handlePayYearChange(e.target.value)}
              >
                <option value="">선택</option>
                {getAvailablePayYears().map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </S.Select>
              <S.Select
                value={payslipInfo.payMonth}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handlePayMonthChange(e.target.value)}
              >
                <option value="">월 선택</option>
                {getAvailablePayMonths(payslipInfo.payYear).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </S.Select>
              <S.Select
                value={payslipInfo.payDay}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handlePayDayChange(e.target.value)}
              >
                <option value="">일 선택</option>
                {getAvailableDays(payslipInfo.payYear, payslipInfo.payMonth).map(day => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </S.Select>
            </div>
          </S.InputRow>
        </S.InputSection>

        {/* 버튼들 */}
        <S.ButtonContainer>
          {/* <S.CloseButton onClick={onClose}>
            뒤로
          </S.CloseButton> */}
          <S.SubmitButton
            onClick={handleSubmit}
            disabled={!isValid}
          >
            만들기
          </S.SubmitButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}