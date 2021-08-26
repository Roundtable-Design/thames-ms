import "react-quill/dist/quill.snow.css"; // ES6

import API from "../api";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Heading } from "../components/";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import Section from "../components/Section";
import { useHistory } from "react-router-dom";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";



export default () => {
	const history = useHistory();

	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [classesLoading, setClassesLoading] =
		React.useState("Loading classes...");
	const [studentsLoading, setStudentsLoading] =
		React.useState("Loading students...");
	const [error, setError] = React.useState();
	const [table, setTable] = React.useState();
	const [studentsTable, setStudentsTable] = React.useState();
	const [eventType, setEventType] = React.useState();
	const [classId, setClassId] = React.useState();
	const [record, setRecord] = React.useState({});
	

	// console.log("Hello?");
	const RadioEventTypes = ["Assignment", "Reminder", "Short Report", "Long Report"]
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
				console.log("Starting...");
				const response = await API.get("classes");
				const students = await API.get("students");
				
				if (!students.hasOwnProperty("content"))
					throw new Error("Empty student response");

				setStudentsTable(students.content);
				console.log("This is the response for students", students.content);
				setStudentsLoading(false);

				console.log("Student table is here", { table: students.content });


				if (!response.hasOwnProperty("content"))
					throw new Error("Empty response");

				setTable(response.content);
				console.log("This is the response", response.content);
				setClassesLoading(false);

				console.log("Table is here", { table: response.content });
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
				<Heading>Create</Heading>
				<p>NOTE: Fields marked as * are required</p>
				<Form onSubmit={handleSubmit}>
					<Section loading={classesLoading} error={error} title="Type of event *">
						{RadioEventTypes.map((type, key) =>
						<Form.Check
							key={key}
							type="radio"
							name="TypeOfEvent"
							label={type}
							onChange={({ target }) => {
								setEventType(key)
								console.log(key);
							}}
						/>
						)}
					</Section>
					<Section loading={classesLoading} error={error} title="Class *">
						<Form.Control
							required
							as="select"
							onChange={({ target }) => {
								let class_id = target.options[target.selectedIndex].value;
								setClassId(class_id)
								console.log(classId);
								console.log({ table, class_id});

								editRecord({
									class_id: [class_id],
									student_id: table.find(
										({ id }) => id === class_id
									).fields.student_id,
								});
							}}
						>
							<option value="">-- Select a class --</option>
							{table &&
								table.map(({ id, fields }) => (
									<option value={id}>
										{fields.Title}, {fields.Year_Group}
									</option>
								))}
						</Form.Control>
					</Section>
					{(eventType == 2 || eventType == 3) &&
					<Section loading={studentsLoading} error={error} title="Student *">
						<Form.Control
							required
							as="select"
							onChange={({ target }) => {
								//change here
								editRecord({
									//change here
								})	
							}}
						>
							<option value="">-- Select a student --</option>
							{(studentsTable) && 
								studentsTable.filter(({fields}) => fields.class_year_id.includes(classId))
								.map((({fields}) => 
								<option value={fields.student_id}>
									{fields.Forename}, {fields.Surname}
								</option>
								))
							}
						</Form.Control>
					</Section>
					}
					<Section title="Content">
						<p>To attach a file to this assignment add a link to a file on the school Google Drive</p>
						<Form.Group>
							<Form.Label>Title *</Form.Label>
							<Form.Control
								required
								type="text"
								onChange={({ target }) =>
									editRecord({ Title: target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Body</Form.Label>
							<ReactQuill
								onChange={(value) => editRecord({ Content: value })}
							/>
						</Form.Group>
					</Section>
					<Section title="Date">
						<Form.Row>
							<Col>
								<Form.Label>Set *</Form.Label>
								<Form.Control

									required
									type="date"
									onChange={({ target }) =>
										editRecord({ Set: target.value })
									}
								/>
							</Col>
							<Col>
								<Form.Label>Due *</Form.Label>
								<Form.Control

									required
									type="date"
									onChange={({ target }) =>
										editRecord({ Due: target.value })
									}
								/>
							</Col>
						</Form.Row>
					</Section>
					{!(eventType == 1) &&
						<Section title="Expected time to complete assignment">
							<Form.Row>
								<Col>
									<Form.Label >Expected Time Unit</Form.Label>
									<Form.Control
										as="select"

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

										type="text"
										onChange={({ target }) =>
											editRecord({ Expected_Time: target.value })
										}
									/>
								</Col>
							</Form.Row>
						</Section>}
					<Section>
						<Button type="submit" variant="secondary">
							Submit
						</Button>
					</Section>
				</Form>
			</Container>
		</React.Fragment>
	);
};
