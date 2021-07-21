import { Grid } from "./index";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	box-sizing: border-box;
	margin: 0;
	padding: 0;

	/* font-family: Nunito;
    font-style: normal; */
	font-weight: 800;
	font-size: 15px;
	line-height: 14px;

	height: 53px;
	padding: 14.5px 20px;
	width: 100%;

	border-bottom: 2px solid #eeeeee;

	display: grid;
	grid-template-areas: "title date button";
	grid-template-columns: repeat(7, 1fr); //136px 149px 24px;
	column-gap: 10px;

	background-color: white;

	&:hover{
		cursor: pointer;
	}

	${({ reminder }) =>
		reminder &&
		`
        ${Title}{
            color: #E8927C;
        }    
    `}

	${({ complete }) =>
		complete &&
		`   
        background-color: #E6EEE1;
        border: none;
        ${Title}{
            color: #002E5D;
        }
        ${Date}{
            color: #5CBDE5; //002E5D;
        } 
    `}
    ${({ checked }) =>
		checked &&
		`
        ${Title}{
            color: #EAAA00;
        }
        ${Date}{
            color: #EAAA00;
        }
        ${ViewMore}{
            background-image: url("${require("../assets/icons/check.svg")}");
        }   
    `}

	${({ overdue }) =>
		overdue &&
		`
        ${Date}{
            color: #CE0F69;
        } 
    `}

	${({ resubmit }) =>
		resubmit &&
		`
        ${Date}{
            color: #CE0F69;
        } 
		${ViewMore}{
            background-image: url("${require("../assets/icons/chevron-right.svg")}");
        } 
    `}

${({ handed }) =>
		handed &&
		`
        ${Date}{
            color: #EAAA00;
        } 
		${ViewMore}{
            background-image: url("${require("../assets/icons/check.svg")}");
        } 
    `}

	${({ hide }) =>
		hide &&
		`
        display: none;   
    `}
`;

const Title = styled.h6`
	/* grid-area: title; */
	grid-column: span 3;
	color: #4e4e4e;
	margin: 0;
	padding: 0;  
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis; 
`;

const Date = styled.h6`
	/* grid-area: date; */
	grid-column: span 3;
	color: #5cbde5;
	text-align: center;
	/* color: ${({dueColor}) => dueColor ? "#CE0F69" : "#5cbde5"}; */

	 /* background:
 */
	margin: 0;
	padding: 0;
`;

const ViewMore = styled.button`
	/* grid-area: button; */
	grid-column: 7 /-1;

	appearance: none;
	border: none;

	width: 24px;
	height: 24px;

	background-image: url("${require("../assets/icons/chevron-right.svg")}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-color: transparent;
`;

const ListItem = ({
	title,
	date,
	onOpen,
	reminder,
	complete,
	checked,
	children,
	hide,
	overdue,
	resubmit,
	handed,
	...props
}) => {
	return (
		<Wrapper
			{...props}
			reminder={reminder}
			complete={complete}
			checked={checked}
			hide={hide}
			overdue={overdue}
			resubmit={resubmit}
			handed={handed}
		>
			<Title>{title}</Title>
			<Date id="due"> {date} </Date>
			<ViewMore OnClick={onOpen} />
			{children}
		</Wrapper>
	);
};

export default ListItem;
