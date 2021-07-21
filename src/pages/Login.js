import LoginButton, { WebLink } from "../components/LoginButton";

import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
	height: 55vh;
	padding: 0;
	margin: 0;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginWrapper = styled.div`
	box-sizing: border-box;
	height: 45vh;

	margin: 0;
	padding: 34px 0;

	background-color: #e3e3dd;
	text-align: center;
`;

export default () => {
	return (
		<React.Fragment>
			<HeaderWrapper>
				<Header subheading={"Please sign in to continue"} />
			</HeaderWrapper>
			<LoginWrapper>
				<LoginButton />
				<WebLink href="https://www.thameschristianschool.org.uk/">
					Back to the Thames website
				</WebLink>
			</LoginWrapper>
		</React.Fragment>
	);
};

/*
Expired token: eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNTQxNWIxM2FjYjk1OTBmNzBkZjg2Mjc2NWM2NTVmNWE3YTAxOWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjE4ODA3Mzg1NTU1LWNubGM4ZTc4MGtvdXVuNDE2cWFnMWZlNXIwdWVuaW9xLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjE4ODA3Mzg1NTU1LWNubGM4ZTc4MGtvdXVuNDE2cWFnMWZlNXIwdWVuaW9xLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwNzk5Mjk2NDg5NDM4NDAzNzkzIiwiaGQiOiJyb3VuZC10YWJsZS5jby51ayIsImVtYWlsIjoiZ2lsQHJvdW5kLXRhYmxlLmNvLnVrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ0QTc1dWVZY2R4dm0yOERSSnNfV3JnIiwibmFtZSI6IkdpbCBWaXJnbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaDFaQWdJZ01jSC10NzJHdnM0XzJ6UHlsTWliWEtISzAtdFFSaXE9czk2LWMiLCJnaXZlbl9uYW1lIjoiR2lsIiwiZmFtaWx5X25hbWUiOiJWaXJnbyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTk2ODE2MDQyLCJleHAiOjE1OTY4MTk2NDIsImp0aSI6ImZkNmZiMDUyZmQyOTQzODgwMmUwZDEwMDA5ZmEyMWNjMTcwYWU3MDIifQ.opaiwWj-Yh3aec9zq07EENaJGK9nkBM-5NjR8DKvUD3ppfWZMXmt2YG0AhWGvRmYMfK_xZeIiSFpZQeqdYXaIAaWpY16BBMLVqMJzmrg4K2_Q9CKvgNPZH_GNRJNfBwoo5LkqZSV00au9rQfOr8rA_qMzVDh5uKrycTNHYbVbow-i7DQg0TkvtN6-tt_BSzrtLtwCWKNyEL1G1QG0USkLtIGAKSjFxuRPEHCgq4sVyEktu9S9MFMuMhKJ4-EXdNTYzrYLtCfr3StXw2e_7EQawJBcY890G9qfFN7Wfz2WKCa2fpf6ZS5VkNYRYg-oNY1XGUzQSnHdTmo4-VNx21lzg
*/
