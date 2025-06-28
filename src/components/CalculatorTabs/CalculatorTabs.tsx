import React from "react";
import './CalculatorTabs.css'

type CalculatorTabsProps = {
  onTabChange: (tab: string) => void;
  selectedTab: string;
};

export default function CalcuatorTabs({ onTabChange, selectedTab }: CalculatorTabsProps) {
  const tabs = [
  { name: "프리랜서", info: "3.3%" },
  { name: "상용직", info: "근로소득" },
  { name: "일용직", info: "일용근로" },
];

  return (
    <div className="flex justify-center space-x-4 bg-white rounded-full p-2 shadow-md">
       {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)} // 부모의 상태 변경 함수 호출
          className={`px-4 py-2 rounded-full ${
            selectedTab === tab.name ? "bg-[#e5e7eb] font-bold" : "bg-transparent"
          }`}
        >
          <span>{tab.name}</span>
          <span className="text-sm text-gray-500">{tab.info}</span>
        </button>
      ))}
    </div>
  )
}