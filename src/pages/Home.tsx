import { useState } from "react";
import CalculatorSection from "../components/CalculatorSection/CalculatorSection";
import CalculatorTabs from "../components/CalculatorTabs/CalculatorTabs";
import Header from "../components/Header/Header";
import styled from 'styled-components';
import Footer from "../components/Footer/Footer";
const HomeContainer = styled.div`

    // padding: 2rem;
  .container {
    display: flex;
    flex-direction: column;
    gap: 53px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const S = { HomeContainer };

export default function Home(){
  const [selectedTab, setSelectedTab] = useState("프리랜서");
  return (
    <div>
      <S.HomeContainer>
        <Header />
        <div className="container">
          <CalculatorTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
          <CalculatorSection selectedTab={selectedTab} />
        </div>
      </S.HomeContainer>
      <Footer/>
    </div>
  )
}