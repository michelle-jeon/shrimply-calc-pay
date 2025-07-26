import React, { useState } from "react";
import CalculatorSection from "../components/CalculatorSection/CalculatorSection";
import CalculatorTabs from "../components/CalculatorTabs/CalculatorTabs";
import Header from "../components/Header/Header";
import styled from 'styled-components';
const HomeContainer = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 53px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
  }
`;

const S = { HomeContainer };

export default function Home(){
  const [selectedTab, setSelectedTab] = useState("프리랜서");
  return (
    <S.HomeContainer>
      <Header />
      <div className="container">
        <CalculatorTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <CalculatorSection selectedTab={selectedTab} />
      </div>
    </S.HomeContainer>
  )
}