import API from "../api";
import Header from "../components/Header";
import React from "react";
import ReviewAssignment from "./sections/ReviewAssignment";
import Section from "../components/Section";
import { useParams } from "react-router-dom";
import useRole from "../hooks/useRole";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";
import { AssignmentDate, AssignmentEstimatedDuration } from "../components";

export default () => {
	const [role] = useRole();

	const { id } = useParams();
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

	React.useEffect(() => {
		if (loading) {
			(async function () {
				try {
					const response = await API.get(`assignment/${id}`);

					console.log({ response });

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					setRecord(response.content[0].fields);
					setLoading(false);
					console.log(record);
				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);

	return (
		<React.Fragment>
			< TeacherNav />
			<Container>
				{record && (
					<React.Fragment>
						<Header heading={record.Title} subheading={record.Class_Name} />
						<AssignmentDate>Assignment created on: {record.Set}</AssignmentDate>
						<AssignmentEstimatedDuration>Estimated completion time for assignment: {record.Expected_Time} {record.Expected_Time_Unit}</AssignmentEstimatedDuration>
					</React.Fragment>
				)}

				<Section loading={loading} error={error} title="Summary">
					{record && (
						<div
							dangerouslySetInnerHTML={{ __html: record.Content }}
						></div>
					)}
				</Section>
				{record && role.staff && <ReviewAssignment assignmentId={id} />}
			</Container>
		</React.Fragment>
	);
};
