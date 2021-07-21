import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
/* grid-area: date; */
	grid-column: span 3;
	appearance: none;
	border: 1px solid #C7C9C7;
	border-radius: 3px;
	background-color: #FFFFFF;
	padding: 6.5px 11.5px;
	box-sizing: border-box;
	width: 103px;

	font-family: Nunito;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 14px;

	text-align: center;
	justify-self: center;
	
    color: #C7C9C7;

	cursor: pointer;
`;


const CountDateButton = ({ children, ...props }) => {
	return (
		<Wrapper {...props}>
			{children}
		</Wrapper>
	);
};

export default CountDateButton;
