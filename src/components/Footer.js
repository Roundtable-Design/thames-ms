import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 15px;
`;
const FeedbackLink = styled.a`
	text-decoration: none;
	color: #002e5d;
	padding-bottom: 7px;
	margin-bottom: 10px;
	font-weight: 800;
	text-transform: uppercase;
	font-size: 14px;

	border: 2px solid #002e5d;
	padding: 8px 14px;

	&:hover {
		text-decoration: underline;
	}
`;

export default () => (
	<Wrapper>
		<FeedbackLink href="https://forms.gle/BHrMpxUmhqWeaXYB9">
			Feedback
		</FeedbackLink>
	</Wrapper>
);
