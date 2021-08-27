import "react-quill/dist/quill.snow.css"; // ES6

import API from "../api";
import ActivityIndicator from "../components/ActivityIndicator";
// import Button from "react-bootstrap/Button";
import {Button} from "../components/";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Heading } from "../components/";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import Section from "../components/Section";
import { useHistory } from "react-router-dom";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import queryString from "query-string";



export default ({assignmentId, assignmentTitle, assignmentContent, reminder, dueDate, estimatedTime, estimatedUnit}) => {
	const history = useHistory();

    const { id } = useParams();
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [classesLoading, setClassesLoading] = React.useState("Loading classes...");
	const [table, setTable] = React.useState();
	const [isAssignment, setIsAssignment] = React.useState();
	const [assignment, setAssignment] = React.useState();
	

	const fetchAssignment = async () => {
		try {
			setLoading("Fetching assignment...");

			console.log("assignmentId", assignmentId)

			const response = await API.get(`assignment/${assignmentId}`);

			// const response = await API.get(
			// 	`assignments?${queryString.stringify({
			// 		assignment_id: assignmentId,
			// 	})}`
			// );
			// const response = await API.get(`assignment/${assignmentId}`);

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			
			// assignmentTitle={record.Title} 
			// assignmentContent={record.Content} 
			// reminder={record.is_Reminder}
			// dueDate={record.Due}
			// estimatedTime={record.Expected_Time} 
			// estimatedUnit={record.Expected_Time_Unit}

			setAssignment(response.content);
			console.log("this assignment", response.content);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editRecord = (props) => {
		// const assignment = assignment.find(({ id }) => id === assignmentId);

		const copy = { ...assignment };

		Object.keys(props).forEach((key) => {
			copy[key] = props[key];
			// assignment.fields[key] = props[key];
		});

		console.log("Props", props);
		setAssignment(copy);

		// const {
		// 	Title,
		// 	Content,
		// 	Due,
		// 	Expected_Time,
		// 	Expected_Time_Unit,
		// } = assignment.fields;

		console.log(assignment);

		// console.log(record);
	};

	const handleSubmit = async (event) => {

		try {
			setLoading("Updating form...");

			const assignmentUpdate = await API.update('assignment/${assignmentId}',{
				assignment,
			});

			if (!assignmentUpdate.hasOwnProperty("content"))
				throw new Error("Empty response");

				console.log("newAssignment", assignmentUpdate)
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
				<Heading style={{marginTop: 0}}>Update Assignment</Heading>
				<Form onSubmit={handleSubmit}>
					<Section title="Content">
						<p>To attach a file to this assignment add a link to a file on the school Google Drive</p>
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
								onChange={(value) => editRecord({ Content: value })}
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
					{!reminder &&
						<Section title="Expected time to complete assignment">
							<Form.Row>
								<Col>
									<Form.Label >Expected Time Unit</Form.Label>
									<Form.Control
										as="select"
                                        defaultValue={estimatedUnit}

										onChange={({ target }) =>
											editRecord({
												Expected_Time_Unit:
													target.options[target.selectedIndex]
														.value,
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
											editRecord({ Expected_Time: target.value })
										}
									/>
								</Col>
							</Form.Row>
						</Section>}
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
