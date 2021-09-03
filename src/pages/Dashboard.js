import Assignments from "./sections/Assignments";
import Classes from "./sections/Classes";
import Container from "react-bootstrap/Container";
import React from "react";
import Students from "./sections/Students";
import TeacherNav from "../components/TeacherNav";
import useRole from "../hooks/useRole";

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
