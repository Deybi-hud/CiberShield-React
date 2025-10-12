import React from "react";
import Text from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import Header from "../components/organisms/Header";
import { Wrapper } from "../components/Templates/Wrapper";
import "../styles/pages/Home.css";

function Home() {

  return (
    <Wrapper className="wrapper">
      <SideBar/>
    </Wrapper>
  );


  
};

export default Home;
