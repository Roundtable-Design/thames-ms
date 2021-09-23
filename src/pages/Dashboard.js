import Assignments from "./sections/Assignments";
import Classes from "./sections/Classes";
import Container from "react-bootstrap/Container";
import React from "react";
import Students from "./sections/Students";
import TeacherNav from "../components/TeacherNav";
import useRole from "../hooks/useRole";
import {Button} from "../components/";

export default () => {
	const [role] = useRole();
	const handleSuccess = () => {
		localStorage.clear();
		window.location.href = "/login";
	};
	return (
		<React.Fragment>
			{role.student && <Assignments />}
			{role.parent && (
				<Container>
					<Students />
					<Button green onClick={()=>handleSuccess()}>Sign out</Button>
				</Container>
			)}
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
