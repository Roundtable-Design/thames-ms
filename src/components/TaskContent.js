import styled, { keyframes } from "styled-components";

import React from "react";
import Sparkles from "../components/Sparkles";
const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 0;
	padding: 19px 30px;

	width: 100vw;
	max-width: 540px;
	height: 100%;

	background: #f8f8f8;
`;

const ContentWapper = styled.div`
	//font-weight: 600;
	font-size: 15px;
	line-height: 20px;

	color: #4e4e4e;

	margin: 0;
	padding: 0;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 800;
		font-size: 15px;
		line-height: 20px;
		margin-bottom: 5px;
	}

	p {
		font-weight: normal;
		margin-bottom: 18px;
	}

	ul,
	ol {
		font-weight: normal;
		margin-bottom: 18px;
		padding-left: 25px;
	}

	li {
		margin-bottom: 5px;
	}

	a {
		margin: 18px 10px;
		display: block;
		color: #4e4e4e;

		img {
			padding-right: 7px;
			padding-left: 10px;
		}
	}
`;

const Attachment = styled.div`
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 20px 227px;
	column-gap: 7px;
`;

const AttachmentImage = styled.div`
	width: 20px;
	height: 20px;

	background-image: url("${require("../assets/icons/paperclip.svg")}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: transparent;
`;

const ToggleWrapper = styled.div`
	width: calc(100vw - 60px);
	max-width: 480px;
	margin: 0 auto;
`;
const CompleteToggle = styled.div`
	margin: 38px auto;
	padding: 18px 23px;
	width: 100%;
	max-width: 315px;
	/* height: 62px; */

	border-radius: 3px;
	background: #ffffff;
	border: 3px solid #eaaa00;

	color: #002e5d;
	font-weight: 800;
	font-size: 15px;
	line-height: 20px;

	display: grid;
	grid-template-columns: 84% 16%;
	/* 219px 35px; */
	column-gap: 10px;
`;

const ToggleButton = styled.button`
	width: 35px;
	height: 21px;

	appearance: none;
	border: none;
	align-self: center;

	background-image: url("${({ checked }) =>
		checked
			? require("../assets/icons/toggle - on.svg")
			: require("../assets/icons/toggle - off.svg")}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: transparent;
`;

const TaskContent = ({ title, complete, children, onChange, ...props }) => {
	const [checked, setChecked] = React.useState(complete);

	const handleChange = () => {
		setChecked(!checked);
		onChange();
	};

	return (
		<Wrapper>
			<ContentWapper>{children}</ContentWapper>
			<Sparkles effect={checked}>
				<ToggleWrapper>
					<CompleteToggle>
						Have you completed the task?
						<ToggleButton
							id="togleImg"
							checked={checked}
							{...props}
							onClick={handleChange}
						/>
					</CompleteToggle>
				</ToggleWrapper>
			</Sparkles>
		</Wrapper>
	);
};

export default TaskContent;
