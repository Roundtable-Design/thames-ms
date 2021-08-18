import { Heading, Paragraph } from "../components";

import Assignments from "./sections/Assignments";
import Behaviour from "./sections/Behaviour";
import Classes from "./sections/Classes";
import { Link } from "react-router-dom";
import React from "react";
import Section from "../components/Section";
import Students from "./sections/Students";
import useRole from "../hooks/useRole";
import { Logo, Button } from "../components";
import TeacherNav from "../components/TeacherNav";
import styled from "styled-components";



export default () => {
	const [role] = useRole();

	console.log({ role });

	return (
		<React.Fragment>
			{role.student && <Assignments />}
			{role.parent && <Students />}
			{role.staff && (
				<React.Fragment>
					<TeacherNav />
					{/* <Logo style={{margin:"51px auto"}} /> */}
					<Classes />
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
