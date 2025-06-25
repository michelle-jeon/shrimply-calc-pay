import React from "react";
import './CalculatorTabs.css'

type CalculatorTabsProps = {
  onTabChange: (tab: string) => void;
};

export default function CalcuatorTabs({ onTabChange }: CalculatorTabsProps) {
  const tabs = [
  { name: "프리랜서", info: "3.3%" },
  { name: "상용직", info: "근로소득" },
  { name: "일용직", info: "일용근로" },
];
  const [selectedTab, setSelectedTab] = React.useState("프리랜서");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
    onTabChange(tabName);
  };

  return (
    <div className="flex justify-center space-x-4 bg-white rounded-full p-2 shadow-md">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
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