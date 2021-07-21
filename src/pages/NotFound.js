import { Paragraph, Title } from "../components";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import React from "react";
import useRole from "../hooks/useRole";

export default () => {
	const [role] = useRole();

	return (
		<Container>
			<Title>Page not found</Title>
			<Paragraph>
				<Link to={`/`}>
					Back to {role.none ? "login" : "dashboard"}
				</Link>
			</Paragraph>
		</Container>
	);
};
