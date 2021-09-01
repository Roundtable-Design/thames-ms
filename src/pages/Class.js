import { Caption, Heading, TableCaption } from "../components";

import API from "../api";
import Assignments from "./sections/Assignments";
import { Button } from "@material-ui/core";
import Header from "../components/Header";
import React from "react";
import Section from "../components/Section";
import StaffAssignments from "./sections/StaffAssignments";
import Students from "./sections/Students";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";

export default () => {
	const { id } = useParams();
	const [record, setRecord] = React.useState({
		Title: "",
	});

	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState();

	React.useEffect(() => {
		if (loading) {
			(async function () {
				try {
					const response = await API.get(`class/${id}`);

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					const { fields } = response.content[0];

					setRecord(fields);
					setLoading(false);

				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);

	return (
		<React.Fragment>
			<TeacherNav />
			<Container>
				{record && (
					<Header
						error={error}
						heading={record.Title}
						subheading={record.Year_Group}
					/>
				)}
				<StaffAssignments
					query={{
						class_id: id,
					}}
				/>

				{record && <Students 
						query={{
							class_id: id,
						}}
					classId={id} 
					/>}
			</Container>
		</React.Fragment>
	);
};
