import React, { useState } from "react";
import CalcuatorSection from "../components/CalculatorSection/CalculatorSection";
import CalcuatorTabs from "../components/CalculatorTabs/CalculatorTabs";
import Header from "../components/Header/Header";

export default function Home(){
  const [selectedTab, setSelectedTab] = useState("프리랜서");
  return (
    <div>
      <Header />
      <div className="container flex flex-col gap-[53px] items-center justify-start w-full max-w-[1440px] mx-auto py-0">
        <CalcuatorTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <CalcuatorSection selectedTab={selectedTab} />
      </div>
    </div>
  )
}