import React from "react";
import styled from "styled-components";
import {Grid} from "./index";

const Wrapper = styled.div`
	box-sizing: border-box;
    margin: 0;
    padding: 0;

    /* font-family: Nunito;
    font-style: normal; */
    font-weight: 800;
    font-size: 15px;
    line-height: 14px;

    height: 60px;
    padding: 14.5px 14px;
    width: 100%;
    max-width: 540px;

    border-bottom: 2px solid #AAAAAA;
    
    display: grid;
    grid-template-areas: "title date button";
    grid-template-columns: repeat(7, 1fr); //136px 149px 24px;
    column-gap: 10px;

    background-color: white;

    position: fixed;
`;

const Title = styled.h6`  
/* grid-area: title; */
    grid-column: span 3;
    font-weight: 800;
    font-size: 25px;

    color: #4E4E4E;
    margin: 0;
    padding: 0;
`;

const Padding = styled.div`
    height: 60px;
    width: 100%;
`;




const ListHeader = ({ title, children, style, ...props }) => {
	return (
        <React.Fragment>
            <Wrapper {...props} style={style}>
                <Title>{title}</Title>
                {children}
            </Wrapper>
            <Padding />
        </React.Fragment>
	);
};

export default ListHeader;
