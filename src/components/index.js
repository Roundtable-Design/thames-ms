import { default as BootstrapCard } from "react-bootstrap/Card";
import styled from "styled-components";
import theme from "../theme";

export const Card = styled(BootstrapCard)`
	margin-bottom: ${theme.gutter}px;
	grid-column: 1 / -1;

	color: #002E5D !important;
	border-color: #DCEFC8;

	${({ onClick }) => onClick && `cursor: pointer;`}

	${theme.breakpoint("sm")`grid-column: span 3`}
	${theme.breakpoint(
		"md"
	)`grid-column: span 4`}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	column-gap: ${theme.gutter}px;
	row-gap: ${theme.gutter}px;

	${theme.breakpoint("md")`grid-template-columns: repeat(12, 1fr)`}
`;

const variantStyles = `
	color: ${({ variant }) => theme.color[variant]}
`;

export const Subheading = styled.h2`
	/* font-family: Avenir; */
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 27px;
	color: #002E5D;
`;

export const Heading = styled.h1`
	/* font-size: 48px;
	line-height: 56px; */
	color: #002E5D;
	margin-top: ${theme.gutter * 2}px;
	margin-bottom: ${theme.gutter * 3}px;
	/* font-weight: lighter; */
	${variantStyles}
`;

export const Logo = styled.div`
	width: 238px;
    height: 111px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
    background-image: url("${require("../assets/logo.svg")}");

	margin: 41px auto;
	/* margin-top: 127px; */

`;

const captionStyles = `
	margin-bottom: 10px;
	font-weight: 800;
	text-transform: uppercase;
	font-size: 14px;
`;

export const Caption = styled.h5`
	color: #002E5D;
	padding-bottom: 7px;
	${captionStyles}
	${variantStyles}
`;
export const TableCaption = styled.th`
	${captionStyles}
	${variantStyles}
`;

export const Title = styled.h5`
	margin: 0 0 5px;
`;

export const Paragraph = styled.p`
	font-size: 16px;
	line-height: 23px;
	${variantStyles}
`;

export const Alert = styled.div`
	background-color: ${theme.color.danger}40;
	padding: ${theme.gutter}px;
	box-sizing: border-box;
	border-radius: 3px;
	margin-bottom: ${theme.gutter * 2}px;
`;

export const Button = styled.button`
	appearance: none;
	width: auto;
	padding: 8px 11.5px;

	border: 1px solid #CE0F69;
	border-radius: 3px;
	background-color: #FFFFFF;
	
    color: #CE0F69;
	cursor: pointer;

	${({ yellow }) =>
		yellow &&
		`
		border: 3px solid #EAAA00;
		color: #002E5D;	
	`}

	${({ green }) =>
		green &&
		`
		border: 3px solid #DCEFC8;
		color: #002E5D;	
	`}

	${({ pink }) =>
		pink &&
		`
		border: 3px solid #CE0F69;
		color: #002E5D;	
	`}

	&:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	text-align: right;
	margin: 20px 0;


`;

export const AssignmentDate = styled.h5`

`
export const AssignmentEstimatedDuration = styled.h5`
`