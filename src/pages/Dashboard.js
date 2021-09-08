import Assignments from "./sections/Assignments";
import Classes from "./sections/Classes";
import Container from "react-bootstrap/Container";
import React from "react";
import Students from "./sections/Students";
import TeacherNav from "../components/TeacherNav";
import useRole from "../hooks/useRole";

export default () => {
	const [role] = useRole();

	return (
		<React.Fragment>
			{role.student && <Assignments />}
			{/* {role.parent && <ParentStudents />} */}
			{role.staff && (
				<React.Fragment>
					<TeacherNav />
					<Container>
						<Classes />
					</Container>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
