import React from "react";
import styled from "styled-components";
import {Grid} from "./index";

const Wrapper = styled.div`
	box-sizing: border-box;
    padding: 0;
    padding: 14px;

    width: 100vw;
    max-width: 540px;
    height: 65px;

    background: #FFFFFF;
    border-bottom: 2px solid #AAAAAA;

    display: grid;
    grid-template-areas: 
        "icon subject name points"
        "icon subject name number";

    grid-template-columns: 10% 15% 38% 27%;
    grid-template-rows: 19px 18px;
    row-gap: 0;
    column-gap: 11px;

    justify-content: center;
    align-items: center;

`;

const SubjectImage = styled.div`
    grid-area: icon;

    width: 29.15px;
    height: 26.07px;

    background-image: url("${require("../assets/icons/profile.svg")}");
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
    grid-area: name;
    margin: 0;

    font-weight: bold;
    font-size: 15px;
    line-height: 14px;
    text-align: center;

    color: #AAAAAA;

    ${({points})=>points && `
        grid-area: points; 
        font-size: 13px;
        color: #002E5D; 
    `}
`;

const Content = styled.h3`
    grid-area: number; 
    margin: 0;

    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    text-align: center;

    color: #40C1AC;   
`;

const ProfileHeader = ({name, pointssystem, points}) => {
	return (
		<Wrapper>
            <SubjectImage />
            <Subject>Profile</Subject>

            <Title>{name}</Title>

            <Title points>{pointssystem}</Title>
            <Content>{points}</Content>
		</Wrapper>
	);
};

export default ProfileHeader;
