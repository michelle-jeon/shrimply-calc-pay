import React, { useState } from "react";
import CalcuatorSection from "../components/CalculatorSection/CalculatorSection";
import CalcuatorTabs from "../components/CalculatorTabs/CalculatorTabs";
import Header from "../components/Header/Header";

export default function Home(){
  const [selectedTab, setSelectedTab] = useState("프리랜서");
  return (
    <div>
      <Header />
      <div>
        <CalcuatorTabs onTabChange={setSelectedTab} />
        <CalcuatorSection />
      </div>
    </div>
  )
}