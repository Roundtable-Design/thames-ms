import Button from "react-bootstrap/Button";
import { ReactComponent as Home } from "../assets/icons/home.svg";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { useHistory } from "react-router-dom";

const Bar = styled(Navbar).attrs({ bg: "light", expand: "lg" })`
	margin-bottom: ${theme.gutter}px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
`;

const HomeIcon = styled(Home)`
	position: absolute;
	left: 15px;
	top: 15px;
	width: 30px;
	height: 30px;
`;

export default () => {
	const history = useHistory();

	return (
		<Bar>
			<HomeIcon onClick={() => history.push("/")} />
			{/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#link">Link</Nav.Link>
				</Nav>
			</Navbar.Collapse> */}
			<img src={require("../assets/ts-logo.svg")} height={30} />
		</Bar>
	);
};
