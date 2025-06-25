import React from "react";
import '../components/CalculatorTabs/CalculatorTabs.css'

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
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={selectedTab === tab.name ? "tab-active" :"tab-inactive"}
        >
          <span>{tab.name}</span>
          <span>{tab.info}</span>
        </button>
      ))}
    </div>
  )
}