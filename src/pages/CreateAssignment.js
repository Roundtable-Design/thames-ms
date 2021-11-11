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
import Loader from 'react-loader-spinner'

export default () => {
	const history = useHistory();

	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [classesLoading, setClassesLoading] =
		React.useState("Loading classes...");
	const [studentsLoading, setStudentsLoading] = React.useState(
		"Loading students..."
	);
	const [staffLoading, setStaffLoading] = React.useState(
		"Loading staff..."
	);
	const [reportsLoading, setReportsLoading] = React.useState(
		"Loading reports..."
	);

	const [error, setError] = React.useState();
	const [table, setTable] = React.useState();
	const [studentsTable, setStudentsTable] = React.useState();
	const [reports, setReports]  = React.useState();

	const [staffID, setStaffID] = React.useState();
	const [eventType, setEventType] = React.useState(0);
	const [record, setRecord] = React.useState({});
	const [className, setClassName] = React.useState();
	const [classID, setClassID] = React.useState();
	const [selectedReports, setSelectedReports] = React.useState();

	// removed 'Short Report' and 'Long Report' from radioEventTypes for now

	const radioEventTypes = ["Assignment", "Reminder", "Short Report", "Long Report"];
	const gradesTypes = ["9", "8/9", "8", "7/8", "7", "6/7", "6", "5/6", "5", "4/5", "4", "3/4", "3", "2/3", "2", "1/2", "1"];
	const performanceRanks = ["n/a", 1, 2, 3, 4];

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setSubmitLoading("Submitting form...", { record });
			let route = (eventType == 0 || eventType == 1) ? "assignment" : "reports";
			let assignmentResponse;

			if(route == "assignment"){
				assignmentResponse = await API.create(route, {
					record,
				});				
			} 
			
			// else if(route == "reports") {
			// 	assignmentResponse = await API.update(route, {
			// 		record,
			// 	});	
				// }

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

	const editReport = async (report_id, props) => {
		// const copy = { ...reports };
		const report = reports.find(({id}) => id===report_id);

		Object.keys(props).forEach((key) => {
			report.fields[key] = props[key];
		});

		const {
			target_grade,
			actual_grade,
			effort,
			homework_quality,
			behaviour,
			meeting_deadlines,
			comments,
			targets,
		} = report.fields;

		try {
			setReportsLoading("Updating report...");

			const response = await API.update(`report/${report_id}`, {
				target_grade,
				actual_grade,
				effort,
				homework_quality,
				behaviour,
				meeting_deadlines,
				comments,
				targets,
			});

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setReportsLoading(false);
			
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}

	}

	React.useEffect(() => console.log('this is the record',record),[record]);

	React.useEffect(() => {
		(async function () {
			try {
				console.log("Starting...");
				const response = await API.get("classes");
				const students = await API.get("students");
				const staff = await API.get("me");
				const reports = await API.get("reports");

				if (!response.hasOwnProperty("content"))
					throw new Error("Empty response");
				else if (!students.hasOwnProperty("content"))
					throw new Error("Empty student response");

				setTable(response.content);

				setStudentsTable(students.content);

				setStaffID(staff.content[0].id);

				const sorted = reports.content.sort(function (a, b) {
					if (a.fields.Surname < b.fields.Surname) {
						return -1;
					}
					if (a.fields.Surname > b.fields.Surname) {
						return 1;
					}
					return 0;
				});

				setReports(sorted);
				setSelectedReports(sorted);

				console.log("Ending...");
				setClassesLoading(false);
				setStudentsLoading(false);
				setStaffLoading(false);
				setReportsLoading(false);

			} catch (err) {
				setError(err.toString());
			}
		})();
	}, []);



	const SetCreateType = (key) => {
		setEventType(key);
		if (key === 1) {
			editRecord({ is_Reminder: true });
		}
	};

	const createReport = async (newReport)  => {
		try {
			const newReports = await API.create("reports", {
				newReport,
			});	

			if (!newReports.hasOwnProperty("content"))
				throw new Error("Empty response");

			
			
			const reports = await API.get("reports");

			const sorted = reports.content.sort(function (a, b) {
				if (a.fields.Surname < b.fields.Surname) {
					return -1;
				}
				if (a.fields.Surname > b.fields.Surname) {
					return 1;
				}
				return 0;
			});

			setReports(sorted);
			setSelectedReports(sorted);
			editRecord({});
			setReportsLoading(false);

		} catch (err) {
			console.error(err);
			setError(err.toString());
			console.log("Assignment cannot be created");
		}
	}

	const findStudentWithoutReport = async (reportsList, studentList, classId) => {
		
		//find list func student's id that does not have report
		if(reportsList.length!==0){
			// case: some students in the class needs @create report@
			const studentwithoutreport = studentList.filter(({id}) => !id.includes(reportsList.map(({fields}) => fields.student_id))).map(({id}) => id);

			if(studentwithoutreport.length !== 0){
				editRecord({});

				const props = {
					student_id: studentwithoutreport,
					class_id: [classId],
					staff_id: [staffID],
				};
				const copy = { ...record };

				Object.keys(props).forEach((key) => {
					copy[key] = props[key];
				});

				createReport(copy);
			}
		}else{
			// case: all students in the class needs @create report@
			const studentwithoutreport = studentList.map(({id}) => id);

			editRecord({});

			const props = {
				student_id: studentwithoutreport,
				class_id: [classId],
				staff_id: [staffID],
			};
		
			const copy = { ...record };

			Object.keys(props).forEach((key) => {
				copy[key] = props[key];
			});

			createReport(copy);
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
								setClassID(class_id);
								setClassName(table.find(({id}) => id===class_id).fields.id); 
								
								
								if((eventType == 2 || eventType == 3) 
										&& class_id !== undefined){

									const studentList = table.find(({ id }) => id === class_id).fields.student_id.split(", ").map(niceId => studentsTable.find(({ fields }) => fields.id === niceId));		
									let class_reports = reports.filter(({ fields }) => fields.class_id.includes(class_id));									
									
									if(class_reports.length<studentList.length){
										// case: new student or all student did not had report created before
										if(studentList !== undefined){
											findStudentWithoutReport(class_reports, studentList, class_id);
										}
									}else if(class_reports.length>studentList.length){
										//case: reports for old students are present
										let smart = class_reports.filter(({fields}) => (studentList.map(({id}) => id)).includes(fields.student_id.toString()) );
										setSelectedReports(smart);
									}else{
										//case: reports up to date with student list
										setSelectedReports(class_reports);
									}
								}else if((eventType == 0 || eventType == 1)){
									editRecord({
										class_id: [class_id],
										staff_id: [staffID],
										student_id: table.find(({ id }) => id === class_id).fields.student_id.split(", ").map(niceId => studentsTable.find(({ fields }) => fields.id === niceId).id),

									});
								}
							}}
						>
							<option value="" selected disabled>-- Select a class --</option>
							{table &&
								table.map(({ id, fields }) => (
									<option value={id}>{fields.id}</option>
								))}
						</Form.Control>
					</Section>
					<Section title="Type of event *">
						{radioEventTypes.map((type, key) => (
							<Form.Check
								key={key}
								type="radio"
								name="TypeOfEvent"
								label={type}
								checked={(eventType) === key}

								onChange={({ target }) => {
									SetCreateType(key);
									
									if((eventType == 2 || eventType == 3) 
										&& classID !== undefined){

										const studentList = table.find(({ id }) => id === classID).fields.student_id.split(", ").map(niceId => studentsTable.find(({ fields }) => fields.id === niceId));		
										let class_reports = reports.filter(({ fields }) => fields.class_id.includes(classID));									
										
										if(class_reports.length<studentList.length){
											// case: new student or all student did not had report created before
											if(studentList !== undefined){
												findStudentWithoutReport(class_reports, studentList, classID);
											}
										}else if(class_reports.length>studentList.length){
											//case: reports for old students are present
											let smart = class_reports.filter(({fields}) => (studentList.map(({id}) => id)).includes(fields.student_id.toString()) );
											setSelectedReports(smart);
										}else{
											//case: reports up to date with student list
											setSelectedReports(class_reports);
										}
									}else if((eventType == 0 || eventType == 1) && classID !== undefined){
										editRecord({
											class_id: [classID],
											staff_id: [staffID],
											student_id: table.find(({ id }) => id === classID).fields.student_id.split(", ").map(niceId => studentsTable.find(({ fields }) => fields.id === niceId).id),
	
										});
									}
								}}
							/>
						))}
					</Section>
					{!(eventType == 2 || eventType == 3) &&(
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
													Set: target.value,
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
													Due: target.value,
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
															target.value,
													})
												}
											/>
										</Col>
									</Form.Row>
								</Section>
							)}
						</React.Fragment>
					)}
					{(eventType == 2 || eventType == 3) && reportsLoading && (
						<div style={{position: 'absolute', left: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
							<Loader type="ThreeDots" color="000" height={30} width={30}></Loader>
							<p>{reportsLoading}</p>
						</div>
						)}
					{((eventType == 2 || eventType == 3) &&
						<React.Fragment>
						
							<Section error={error} style={{marginTop: '50px'}}>
								<Table style={{ minWidth: "1000px", maxWidth:"1000px" }} striped bordered>
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
										{selectedReports && classID &&
											// && reports.filter(({ fields }) => fields.class_id.includes(classID))
											// selectedReports
											selectedReports.filter(({ fields }) => fields.class_id.includes(classID))
											.map((({ fields, id }) => {
												
													return (
													<React.Fragment>
														<tr>
															<td>{fields.Surname}, {fields.Forename} </td>
															<td>
																<Form.Control
																	as="select"
																	required
																	value={fields.target_grade}
																	// defaultValue={'9'}
																	onChange={({ target }) =>

																		editReport(id, {target_grade: target.value})
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
																	value={fields.actual_grade}
																	onChange={({ target }) =>

																		editReport(id, {actual_grade: target.value})
																	}
																>
																	<option value="falling short of target">falling short of target</option>
																	<option value="progressing well towards target">progressing well towards target</option>
																	<option value="at or above target">at or above target</option>
																	{gradesTypes.map((actualGrade, key) =>
																		<option key={key} value={actualGrade}>{actualGrade}</option>
																	)}
																</Form.Control>
															</td>
															<td>
																<Form.Control
																	as="select"
																	required
																	value={fields.effort}
																	// defaultValue={'1'}
																	onChange={({ target }) =>

																		editReport(id, {effort: target.value})
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
																	// defaultValue={'1'}
																	value={fields.homework_quality}
																	onChange={({ target }) =>

																		editReport(id, {homework_quality: target.value})
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
																	// defaultValue={'1'}
																	value={fields.behaviour}
																	onChange={({ target }) =>
																		editReport(id, {behaviour: target.value})
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
																	// defaultValue={'1'}
																	value={fields.meeting_deadlines}
																	onChange={({ target }) =>

																		editReport(id,{meeting_deadlines: target.value})
																	}
																>
																	{performanceRanks.map((meetingDeadlines, key) =>
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
																	<td colSpan={4}>
																		<Form.Control
																			as="textarea"
																			rows={5}
																			onBlur={({ target }) =>
																				editReport(id, {comments: target.value})
																			}
																		>{fields.comments}</Form.Control>
																	</td>
																	<td colSpan={3}>
																		<Form.Control
																			as="textarea"
																			rows={5}
																			onBlur={({ target }) =>
																				editReport(id, {targets: target.value
																					})
																			}
																		>{fields.targets}</Form.Control>
																	</td>
																</tr>
															</React.Fragment>}
													</React.Fragment>)}))}
									</tbody>
								</Table>
							</Section>
						</React.Fragment>)}
					{((eventType == 0 || eventType == 1) &&
					<Section>
						<Button type="submit" variant="secondary">
							Submit
						</Button>
					</Section>
					)}
				</Form>
			</Container>
		</React.Fragment>
	);
};
