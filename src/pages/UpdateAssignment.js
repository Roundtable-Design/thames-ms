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
	// const [record, setRecord] = React.useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setSubmitLoading("Submitting form...", { record });

			// Create new assignment
			const assignmentResponse = await API.create("assignment", {
				record,
			});

			if (!assignmentResponse.hasOwnProperty("content"))
				throw new Error("Empty response");

			history.push("/");
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editRecord = (props) => {
		const copy = { ...record };

		Object.keys(props).forEach((key) => {
			copy[key] = props[key];
		});

		console.log("Edit => ", copy);
		console.log("Props", props);
		setRecord(copy);
	};

	React.useEffect(() => {
		(async function () {
			try {
					const response = await API.get(`assignment/${id}`);

					console.log({ response });

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					setRecord(response.content[0].fields);
					setLoading(false);
					console.log("check assignment data", record);
				// } 
				// console.log("Starting...");

				// const response = await API.get("classes");

				// if (!response.hasOwnProperty("content"))
				// 	throw new Error("Empty response");

				// setTable(response.content);
				// console.log("This is the response", response.content);
				// setClassesLoading(false);

				// console.log("Table is here", { table: response.content });
			} catch (err) {
				setError(err.toString());
			}
		})();
	}, []);

	return (
		<React.Fragment>

			{submitLoading && (
				<ActivityIndicator>{submitLoading}</ActivityIndicator>
			)}

			<TeacherNav />
			<Container>
				<Heading>Update Assignment</Heading>
				<Form onSubmit={handleSubmit}>
					<Section title="Content">
						<p>To attach a file to this assignment add a link to a file on the school Google Drive</p>
						<Form.Group>
							<Form.Label>Title *</Form.Label>
							<Form.Control
								required
								type="text"
                                value={assignmentTitle}
								onChange={({ target }) =>
									editRecord({ Title: target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Body</Form.Label>
							<ReactQuill
								 defaultValue={assignmentContent}
								// dangerouslySetInnerHTML={{ __html: record.Content }}
                                // value={assignmentContent }
								onChange={(value) => editRecord({ Content: value })}
							/>
						</Form.Group>
					</Section>
					<Section title="Date">
						<Form.Row>
							<Col>
								<Form.Label>Due *</Form.Label>
								<Form.Control
                                    value={dueDate}
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
                                        value={estimatedUnit}

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
                                        value={estimatedTime}
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
