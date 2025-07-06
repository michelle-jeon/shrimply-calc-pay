import { useEffect, useState } from "react";

type PayslipInfoData = {
  companyName: string;
  workerName: string;
  workYear: string;
  workMonth: string;
  payYear: string;
  payMonth: string;
  payDay: string;
}

export default function PayslipInfo({isOpen}){
  const [payslipInfo,setPayslipInfo] = useState<PayslipInfoData>({
    companyName: '',
    workerName: '',
    workYear: '',
    workMonth: '',
    payYear: '',
    payMonth: '',
    payDay: ''
  })

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
        payDay: currentDay.toString()
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

  if(!isOpen) return null;

  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-6">임금명세서 생성</h2>
        
        <div className="space-y-4 mb-6">
          {/* 사업장명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업장명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={payslipInfo.companyName}
              placeholder="사업장명을 입력해주세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 소득자명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              소득자명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={payslipInfo.workerName}
              placeholder="소득자명을 입력해주세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 근무년월 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">근무년월</label>
            <div className="flex space-x-2">
              <select
                value={payslipInfo.workYear}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택</option>
                {getAvailableYears().map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <select
                value={payslipInfo.workMonth}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택</option>
                {getAvailableMonths(payslipInfo.workYear).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
            </div>
          </div>

          {/* 지급일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지급일</label>
            <div className="flex space-x-2">
              <select
                value={payslipInfo.payYear}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택</option>
                {getAvailablePayYears().map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <select
                value={payslipInfo.payMonth}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">월 선택</option>
                {getAvailablePayMonths(payslipInfo.payYear).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
              <select
                value={payslipInfo.payDay}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">일 선택</option>
                {getAvailableDays(payslipInfo.payYear, payslipInfo.payMonth).map(day => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-3">
          <button
            className="flex-1 py-4 rounded-lg text-gray-700 font-medium text-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            취소
          </button>
          <button
            className={`flex-1 py-4 rounded-lg text-white font-medium text-lg transition-all duration-200 ${
              payslipInfo.companyName && payslipInfo.workerName && payslipInfo.workYear && payslipInfo.workMonth && payslipInfo.payYear && payslipInfo.payMonth && payslipInfo.payDay
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  )
}