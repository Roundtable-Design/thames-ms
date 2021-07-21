import styled from "styled-components";
import theme from "../../theme";

export const Wrapper = styled.div`
	${({ error }) =>
		error &&
		`
		background-color: ${theme.color.danger}40;
	`}

	padding-bottom: ${theme.gutter}px;
	margin: 0;
	/* border-bottom: 1px solid ${theme.color.light}; */

	/* margin-bottom: ${theme.gutter * 2}px; */
`;
