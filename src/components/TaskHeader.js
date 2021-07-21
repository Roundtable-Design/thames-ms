import React from "react";
import styled from "styled-components";
import {Grid} from "./index";

const Wrapper = styled.div`
	box-sizing: border-box;
    padding: 0;
    padding: 8px 22px;
    top: 0;
    left: 0;
    position: sticky;
    
    width: 100vw;
    max-width: 540px;
    height: 74px;

    background: #FFFFFF;
    border-bottom: 2px solid #AAAAAA;


    display: grid;
    grid-template-areas: 
        "icon subject due expected"
        "icon subject week number"
        "icon subject date time";

    grid-template-columns: 11% 18% 34% 34%;
    /* 36px 56px 105px 105px; */
    grid-template-rows: 23px 18px 14px;
    row-gap: 0;
    column-gap: 10px;

    justify-content: center;
    align-items: center;

`;

const SubjectImage = styled.div`
    grid-area: icon;

    width: 36px;
    height: 36px;

    background-image: url(${({ image }) => image});
    /* url("${require("../assets/icons/Calculator.svg")}"); */
    background-repeat: no-repeat;
	background-size: cover;
	background-position: center; 
    display: block;   
`;

const Subject = styled.h4`
    grid-area: subject;
    margin: 0;

    font-weight: bold;
    font-size: 15px;
    line-height: 14px;

    color: #4E4E4E;
    
`;

const Title = styled.h6`
    grid-area: due;
    margin: 0;

    font-weight: bold;
    font-size: 13px;
    line-height: 14px;
    text-align: center;

    color: #002E5D;

    ${({expected})=>expected && `
        grid-area: expected; 
        color: #4E4E4E;  
    `}
`;

const Content1 = styled.h3`
    grid-area: week; 
    margin: 0;

    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    text-align: center;

    color: #5CBDE5;

    ${({expected})=>expected && `
        grid-area: number; 
        color: #AAAAAA; 
    `}    
`;

const Content2 = styled.h3`
    grid-area: date; 
    margin: 0;

    font-weight: bold;
    font-size: 13px;
    line-height: 14px;
    text-align: center;

    color: #5CBDE5;

    ${({expected})=>expected && `
        grid-area: time; 
        color: #AAAAAA; 
    `}    
`;

const TaskHeader = ({icon, subject, week, date, number, time, image}) => {
	return (
		<Wrapper>
            <SubjectImage image={image}/>
            <Subject>{subject}</Subject>

            <Title>Due:</Title>
            <Content1>{week}</Content1>
            <Content2> {date}</Content2>

            <Title expected>Expected:</Title>
            <Content1 expected>{number}</Content1>
            <Content2 expected>{time}</Content2>
		</Wrapper>
	);
};

export default TaskHeader;
