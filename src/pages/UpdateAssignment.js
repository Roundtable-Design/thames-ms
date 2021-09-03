import "react-quill/dist/quill.snow.css"; // ES6

import API from "../api";
import ActivityIndicator from "../components/ActivityIndicator";
// import Button from "react-bootstrap/Button";
import { Button } from "../components/";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Heading } from "../components/";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import Section from "../components/Section";
import TeacherNav from "../components/TeacherNav";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default ({
	assignmentId,
	assignmentTitle,
	assignmentContent,
	reminder,
	dueDate,
	estimatedTime,
	estimatedUnit,
}) => {
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

	const [submitLoading] = React.useState(false);
	const [assignment, setAssignment] = React.useState();

	const fetchAssignment = async () => {
		try {
			setLoading("Fetching assignment...");

			const {
				content: [assignment],
			} = await API.get(`assignment/${assignmentId}`);

			setAssignment(assignment);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editRecord = (props) => {
		const copy = { ...assignment };

		Object.keys(props).forEach((key) => {
			copy[key] = props[key];
		});

		setAssignment(copy);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading("Updating form...");

			console.log({
				Title: assignment.Title,
				Content: assignment.Content,
				Due: assignment.Due,
				Expected_Time: assignment.Expected_Time,
				Expected_Time_Unit: assignment.Expected_Time_Unit,
			});

			const { content } = await API.update(`assignment/${assignmentId}`, {
				Title: assignment.Title,
				Content: assignment.Content,
				Due: assignment.Due,
				Expected_Time: assignment.Expected_Time,
				Expected_Time_Unit: assignment.Expected_Time_Unit,
			});

			console.log("new", { content });

			setLoading(false);
			fetchAssignment();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	React.useEffect(() => {
		fetchAssignment();
	}, []);

	return (
		<React.Fragment>
			{submitLoading && (
				<ActivityIndicator>{submitLoading}</ActivityIndicator>
			)}

			<TeacherNav />
			<Container>
				<Heading style={{ marginTop: 0 }}>Update Assignment</Heading>
				<Form onSubmit={handleSubmit}>
					<Section title="Content">
						<p>
							To attach a file to this assignment add a link to a
							file on the school Google Drive
						</p>
						<Form.Group>
							<Form.Label>Title *</Form.Label>
							<Form.Control
								required
								type="text"
								defaultValue={assignmentTitle}
								onChange={({ target }) =>
									editRecord({ Title: target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Body</Form.Label>
							<ReactQuill
								defaultValue={assignmentContent}
								onChange={(value) =>
									editRecord({ Content: value })
								}
							/>
						</Form.Group>
					</Section>
					<Section title="Date">
						<Form.Row>
							<Col>
								<Form.Label>Due *</Form.Label>
								<Form.Control
									defaultValue={dueDate}
									required
									type="date"
									onChange={({ target }) =>
										editRecord({ Due: target.value })
									}
								/>
							</Col>
						</Form.Row>
					</Section>
					{!reminder && (
						<Section title="Expected time to complete assignment">
							<Form.Row>
								<Col>
									<Form.Label>Expected Time Unit</Form.Label>
									<Form.Control
										as="select"
										defaultValue={estimatedUnit}
										onChange={({ target }) =>
											editRecord({
												Expected_Time_Unit:
													target.options[
														target.selectedIndex
													].value,
											})
										}
									>
										<option value="">
											-- Select a time unit --
										</option>
										<option value="Minutes">Minutes</option>
										<option value="Hours">Hours</option>
									</Form.Control>
								</Col>
								<Col>
									<Form.Label>Expected Time</Form.Label>
									<Form.Control
										defaultValue={estimatedTime}
										type="text"
										onChange={({ target }) =>
											editRecord({
												Expected_Time: target.value,
											})
										}
									/>
								</Col>
							</Form.Row>
						</Section>
					)}
					<Section>
						<Button pink type="submit">
							Save
						</Button>
					</Section>
				</Form>
			</Container>
		</React.Fragment>
	);
};
