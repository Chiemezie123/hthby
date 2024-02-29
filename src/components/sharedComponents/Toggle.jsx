import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";


const Toggle = ({ setSwtichMode, switchMode, }) => {
  return (
    <Container
      onClick={() => {setSwtichMode(!switchMode)}}
      active={switchMode.toString()}
    //   disabled={disabled?.toString()}
    >
      <Ball active={switchMode.toString()}>
        {/* <img src={switchMode ? <FaCheck/> : <MdOutlineCancel/>} alt="toggle" /> */}
      </Ball>
    </Container>
  );
};

export default Toggle;

const Container = styled.div`
  border: 2px solid rgba(19, 60, 20, 1);
  border-radius: 50px;
  width: 4rem;
  height: 2.5rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.active === "false" ? "flex-end" : "flex-start"};
  cursor: ${(props) => (props.disabled === "true" ? "" : "pointer")};
  background-color: ${(props) =>
    props.active === "true" ? " rgba(19, 60, 20, 1)" : ""};
  transition: all ease 0.05s;
`;
const Ball = styled.div`
  border-radius: 50%;
  background-color: ${(props) =>
    props.active === "true" ? "rgba(204, 255, 56, 1)" : "rgba(19, 60, 20, 1)"};
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: ${(props) =>
    props.active === "true" ? "rotate(45deg);" : "rotate(0)"}; */
  transition: all ease 0.05s;
  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }
`;
