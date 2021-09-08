import { Heading, Paragraph } from "../components";

import Assignments from "./sections/Assignments";
import Behaviour from "./sections/Behaviour";
import Classes from "./sections/Classes";
import { Link } from "react-router-dom";
import React from "react";
import Section from "../components/Section";
import ParentStudents from "./sections/ParentStudents";
import useRole from "../hooks/useRole";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";



export default () => {
	const [role] = useRole();

	console.log({ role });

	return (
		<React.Fragment>
			{role.student && <Assignments />}
			{role.parent && <ParentStudents />}
			{role.staff && (
				<React.Fragment>
					<TeacherNav />
					{/* <Logo style={{margin:"51px auto"}} /> */}
					<Container>
						<Classes />
					</Container>
					{/* <Section>
						<Link to="/createAssignment" style={{color: "#CE0F69"}}>
							<Button>Create assignment</Button>
						</Link>
					</Section> */}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
