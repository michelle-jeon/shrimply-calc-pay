import React, { useState } from "react";
import CalcuatorSection from "../components/CalculatorSection/CalculatorSection";
import CalcuatorTabs from "../components/CalculatorTabs/CalculatorTabs";
import Header from "../components/Header/Header";import styled from 'styled-components';
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

export default function Home(){
  const [selectedTab, setSelectedTab] = useState("프리랜서");
  return (
    <HomeContainer>
      <Header />
      <div className="container">
        <CalcuatorTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <CalcuatorSection selectedTab={selectedTab} />
      </div>
    </HomeContainer>
  )
}