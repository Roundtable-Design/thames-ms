import styled from "styled-components";

export const Wrapper = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: white;
	z-index: 10;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${({ inline }) =>
		inline &&
		`
		position: relative;
		width: 100%;
		height: 150px;
	`}
`;
