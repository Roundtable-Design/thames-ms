import { Heading, Paragraph } from "../components";

import Assignments from "./sections/Assignments";
import Behaviour from "./sections/Behaviour";
import Classes from "./sections/Classes";
import { Link } from "react-router-dom";
import React from "react";
import Section from "../components/Section";
import Students from "./sections/Students";
import useRole from "../hooks/useRole";
import { Logo } from "../components";

export default () => {
	const [role] = useRole();

	console.log({ role });

	return (
		<React.Fragment>
			{role.student && <Assignments />}
			{role.parent && <Students />}
			{role.staff && (
				<React.Fragment>
					<Logo />
					<Classes />
					<Section>
						<Link to="/createAssignment" style={{color: "#CE0F69"}}>
							Create new assignment
						</Link>
					</Section>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
