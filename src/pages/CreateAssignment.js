import "react-quill/dist/quill.snow.css"; // ES6

import API from "../api";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Heading } from "../components/";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import Section from "../components/Section";
import Table from "react-bootstrap/Table";
import TeacherNav from "../components/TeacherNav";
import { useHistory } from "react-router-dom";

export default () => {
	const history = useHistory();

	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [classesLoading, setClassesLoading] =
		React.useState("Loading classes...");
	const [studentsLoading, setStudentsLoading] = React.useState(
		"Loading students..."
	);
	const [error, setError] = React.useState();
	const [table, setTable] = React.useState();
	const [studentsTable, setStudentsTable] = React.useState();
	const [eventType, setEventType] = React.useState();
	const [classId, setClassId] = React.useState();
	const [record, setRecord] = React.useState({});

	// removed 'Short Report' and 'Long Report' from radioEventTypes for now

	const radioEventTypes = ["Assignment", "Reminder"];
	const gradesTypes = [
		"9",
		"9/8",
		"8",
		"8/7",
		"7",
		"7/6",
		"6",
		"6/5",
		"5",
		"5/4",
		"4",
		"4/3",
		"3",
		"3/2",
		"2",
		"2/1",
		"1",
	];
	const performanceRanks = [1, 2, 3, 4];

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setSubmitLoading("Submitting form...", { record });

			console.log("Assignment is ", record);

			// Create new assignment
			const assignmentResponse = await API.create("assignment", {
				record,
			});

			console.log("Assignment was pushed");

			if (!assignmentResponse.hasOwnProperty("content"))
				throw new Error("Empty response");

			history.push("/");
		} catch (err) {
			console.error(err);
			setError(err.toString());
			console.log("Assignment cannot be created");
		}
	};

	const editRecord = (props) => {
		const copy = { ...record };

		Object.keys(props).forEach((key) => {
			copy[key] = props[key];
		});

		setRecord(copy);
	};

	React.useEffect(() => {
		(async function () {
			try {
				console.log("Starting...");
				const response = await API.get("classes");
				const students = await API.get("students");

				if (!response.hasOwnProperty("content"))
					throw new Error("Empty response");
				else if (!students.hasOwnProperty("content"))
					throw new Error("Empty student response");

				setTable(response.content);
				
				setStudentsTable(students.content);
				console.log("Ending...");
				setClassesLoading(false);
				setStudentsLoading(false);
				

			} catch (err) {
				setError(err.toString());
			}
		})();
	}, []);

	const SetCreateType =(key)=>{
		setEventType(key);
		if(key==1){
			editRecord({is_Reminder: true});
		}
	}

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
					<Section title="Type of event *">
						{radioEventTypes.map((type, key) => (
							<Form.Check
								key={key}
								type="radio"
								name="TypeOfEvent"
								label={type}
								onChange={({ target }) => {
									SetCreateType(key);
								}}
							/>
						))}
					</Section>
					<Section
						loading={classesLoading}
						error={error}
						title="Class *"
					>
						<Form.Control
							required
							as="select"
							onChange={({ target }) => {
								const class_id = target.options[target.selectedIndex].value;
								setClassId(class_id)

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
										{fields.id}
									</option>
								))}
						</Form.Control>
					</Section>
					{!(eventType == 2 || eventType == 3) && (
						<React.Fragment>
							<Section title="Content">
								<p>
									To attach a file to this assignment add a
									link to a file on the school Google Drive
								</p>
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
										onChange={(value) =>
											editRecord({ Content: value })
										}
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
												editRecord({
													Set: target.value
												})
											}
										/>
									</Col>
									<Col>
										<Form.Label>Due *</Form.Label>
										<Form.Control
											required
											type="date"
											onChange={({ target }) =>
												editRecord({
													Due: target.value
												})
											}
										/>
									</Col>
								</Form.Row>
							</Section>
							{!(eventType == 1) && (
								<Section title="Expected time to complete assignment">
									<Form.Row>
										<Col>
											<Form.Label>
												Expected Time Unit
											</Form.Label>
											<Form.Control
												as="select"
												onChange={({ target }) =>
													editRecord({
														Expected_Time_Unit:
															target.options[
																target
																	.selectedIndex
															].value,
													})
												}
											>
												<option value="">
													-- Select a time unit --
												</option>
												<option value="Minutes">
													Minutes
												</option>
												<option value="Hours">
													Hours
												</option>
											</Form.Control>
										</Col>
										<Col>
											<Form.Label>
												Expected Time
											</Form.Label>
											<Form.Control
												type="text"
												onChange={({ target }) =>
													editRecord({
														Expected_Time:
															target.value
													})
												}
											/>
										</Col>
									</Form.Row>
								</Section>
							)}
						</React.Fragment>
					)}
					{/* Commented the code for reports */}
					{/* {((eventType == 2 || eventType == 3) &&
						<React.Fragment>
							<Section loading={studentsLoading} error={error}>
								<Table style={{ minWidth: "1000px" }} striped bordered>
									<thead>
										<tr>
											<th>Name</th>
											<th>Target Grade</th>
											<th>Actual Grade</th>
											<th>Effort</th>
											<th>Quality of Homework</th>
											<th>Behaviour</th>
											<th>Meeting Deadlines</th>
										</tr>
									</thead>
									<tbody>
										{(studentsTable) &&
											studentsTable.filter(({ fields }) => fields.class_year_id.includes(classId))
												.map((({ fields }) =>
													<React.Fragment>
														<tr>
															<td>{fields.Forename}{fields.Surname}</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'9'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{gradesTypes.map((targetGrade, key) =>
																		<option key={key} value={targetGrade}>{targetGrade}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'9'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{gradesTypes.map((actualGrade, key) =>
																		<option key={key} value={actualGrade}>{actualGrade}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'1'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{performanceRanks.map((effort, key) =>
																		<option key={key} value={effort}>{effort}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'1'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{performanceRanks.map((homeworkQuality, key) =>
																		<option key={key} value={homeworkQuality}>{homeworkQuality}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'1'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{performanceRanks.map((behaviour, key) =>
																		<option key={key} value={behaviour}>{behaviour}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	defaultValue={'1'}
																	onChange={({ target }) =>

																		editRecord({})
																	}
																>
																	{gradesTypes.map((meetingDeadlines, key) =>
																		<option key={key} value={meetingDeadlines}>{meetingDeadlines}</option>
																	)}
																</Form.Control>
															</td>
														</tr>
														{(eventType == 3) &&
															<React.Fragment>
																<tr>
																	<th colSpan={4}>Comments:</th>
																	<th colSpan={3}>Targets:</th>
																</tr>
																<tr>
																	<td>
																		<Form.Control
																			value={ }
																			onBlur={
																			}
																		/>
																	</td>
																	<td>
																		<Form.Control
																			value={ }
																			onBlur={ }
																		/>
																	</td>
																</tr>
															</React.Fragment>}
													</React.Fragment>))}
									</tbody>
								</Table>
							</Section>
						</React.Fragment>)} */}
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
