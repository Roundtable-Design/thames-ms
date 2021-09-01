import styled, { keyframes } from "styled-components";

import React from "react";

const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 36px 30px 36px 39px;
	margin: 0;

	width: 100%;
	/* max-width: 540px; */
	height: 212px;
	/* calc(100vh - 130px); */

	background: #e8e6df;
	color: #4e4e4e;

	display: grid;
	grid-template-rows: 64px 64px;
	row-gap: 12px;

	font-style: normal;
	font-size: 15px;
	line-height: 20px;
`;

const ClassInfo = styled.div`
	display: grid;
	grid-template-areas:
		"class tutor"
		"year name";
	column-gap: 40px;
	row-gap: 5px;
	grid-template-columns: 15% 42%;
	grid-template-rows: 19px 40px;
`;

const EmailInfo = styled.div`
	display: grid;
	grid-template-areas:
		"title"
		"email";
	row-gap: 5px;
	grid-template-rows: 19px 40px;
`;

const InfoTitle = styled.h5`
	grid-area: class;
	margin: 0;

	font-weight: 800;

	${({ tutor }) =>
		tutor &&
		`
        grid-area: tutor; 
    `}
	${({ email }) =>
		email &&
		`
        grid-area: title; 
    `}
`;

const InfoContent = styled.p`
	grid-area: year;
	background: #ffffff;
	border-radius: 3px;
	padding: 10px;
	margin: 0;

	//font-weight: 600;

	${({ tutor }) =>
		tutor &&
		`
        grid-area: name; 
    `}
	${({ email }) =>
		email &&
		`
        grid-area: email; 
    `}
`;

const ProfileInfo = ({ year, tutor, email }) => {
	return (
		<Wrapper>
			<ClassInfo>
				<InfoTitle>Year</InfoTitle>
				<InfoContent>{year}</InfoContent>

				<InfoTitle tutor>Form Tutor</InfoTitle>
				<InfoContent tutor>{tutor}</InfoContent>
			</ClassInfo>
			<EmailInfo>
				<InfoTitle email>Email</InfoTitle>
				<InfoContent email>{email}</InfoContent>
			</EmailInfo>
		</Wrapper>
	);
};

export default ProfileInfo;
