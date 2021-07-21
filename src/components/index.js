import { default as BootstrapCard } from "react-bootstrap/Card";
import styled from "styled-components";
import theme from "../theme";

export const Card = styled(BootstrapCard)`
	margin-bottom: ${theme.gutter}px;
	grid-column: 1 / -1;

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
	font-size: 48px;
	line-height: 56px;
	margin-top: ${theme.gutter * 2}px;
	margin-bottom: ${theme.gutter * 3}px;
	font-weight: lighter;
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
	margin-top: 127px;

`;

const captionStyles = `
	margin-bottom: 10px;
	font-weight: 800;
	text-transform: uppercase;
	font-size: 14px;
`;

export const Caption = styled.h5`
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
