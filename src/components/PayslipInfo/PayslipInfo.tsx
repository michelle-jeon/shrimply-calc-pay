import { useState } from "react";

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

  if(!isOpen) return null;
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-6">입금명세서 생성</h2>
        
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
              </select>
              <select
                value={payslipInfo.workMonth}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
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
              </select>
              <select
                value={payslipInfo.payMonth}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
              </select>
              <select
                value={payslipInfo.payDay}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
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
              payslipInfo.companyName && payslipInfo.workerName
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