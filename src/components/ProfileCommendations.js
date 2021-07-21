import { LaptopWindows } from "@material-ui/icons";
import React from "react";
import styled, {keyframes} from "styled-components";

import Grid from "./"

export const CommendationsWrapper = styled.div`
	box-sizing: border-box;
	padding: 29px 30px;
	margin: 0;

	width:  100%;//100vw;
	/* max-width: 540px; */
	height: auto;

	background: #E6EEE1;
    display: ${({show}) => show ? "grid" : "none"};

    
    column-gap: 40px;//78px;
    row-gap: 40px;
    grid-template-columns: 1fr 1fr; //83px 83px;
    justify-items: center;
    align-items: center;
    
	font-style: normal;
	color: #4E4E4E;

`;

const CommendationItem = styled.div`
    display: grid;
    grid-template-rows: 82.29px 20px;
    row-gap: 10px;

    justify-self: center;
    align-items: center;
    text-align: center;
    justify-items: center;

    padding: 0;
    margin: 0;
`;

const Title = styled.h6`
    align-items: center;
    text-align: center;
    white-space: nowrap;
    /* overflow: hidden;
    text-overflow: ellipsis; */
	margin: 0;

	font-weight: 800;
    font-size: 15px;
    line-height: 20px;
`;

const CommendationIcon = styled.div`
	width: 82.29px;
    height: 82.29px;

	background-image: url("${require("../assets/icons/Commendation.svg")}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: transparent;
`;

const comms =[
    {
        title: "Netball",
        points: "",
    },
    {
        title: "Bronze DofE",
        points: "",
    },
    {
        title: "Art Rep",
        points: "",
    },
    {
        title: "Newsletter",
        points: "",
    },
]


const ProfileCommendations = ({children}) => {

	return (
        <CommendationItem>
            <CommendationIcon />
            <Title>{children}</Title>
        </CommendationItem>
	);
};

export default ProfileCommendations;
