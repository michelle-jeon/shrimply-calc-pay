import * as S from './CalculatorTabs.styles';

type CalculatorTabsProps = {
  onTabChange: (tab: string) => void;
  selectedTab: string;
};

export default function CalculatorTabs({ onTabChange, selectedTab }: CalculatorTabsProps) {
  const tabs = [
  { name: "프리랜서", info: "3.3%" },
  { name: "상용직", info: "근로소득" },
  { name: "일용직", info: "일용근로" },
];

  return (
    <S.TabsContainer>
       {tabs.map((tab) => (
        <S.TabButton
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          $isActive={selectedTab === tab.name}
        >
          <S.TabName>{tab.name}</S.TabName>
          <S.Separator>•</S.Separator>
          <S.TabInfo>{tab.info}</S.TabInfo>
        </S.TabButton>
      ))}
    </S.TabsContainer>
  )
}