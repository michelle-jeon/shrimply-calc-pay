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
    <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 bg-white rounded-lg md:rounded-full p-2 shadow-md">
       {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)} // 부모의 상태 변경 함수 호출
          className={`flex items-center w-full md:w-auto px-4 py-2 rounded-full transition-all ${
            selectedTab === tab.name ? "bg-gray-200 font-bold text-gray-900" : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="text-base">{tab.name}</span>
          <span className="hidden md:inline text-gray-400 mx-2">•</span>
          <span className="text-sm text-gray-500">{tab.info}</span>
        </button>
      ))}
    </div>
  )
}