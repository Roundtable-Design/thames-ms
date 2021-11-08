import { AssignmentDate, AssignmentEstimatedDuration } from "../components";
import { Button, ButtonWrapper } from "../components/";

import API from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import { Heading } from "../components/";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import ReviewAssignment from "./sections/ReviewAssignment";
import Section from "../components/Section";
import TeacherNav from "../components/TeacherNav";
import UpdateAssignment from "./UpdateAssignment";
import moment from "moment";
import { useParams } from "react-router-dom";
import useRole from "../hooks/useRole";

export default () => {
	const [role] = useRole();

	const { id } = useParams();
	// const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

	const [edit, setEdit] = React.useState(false);
	const [buttonText, setButtonText] = React.useState("Edit");
	const [assignment, setAssignment] = React.useState();

	const fetchAssignment = async () => {
		try {
			console.log("Fetching");

			setLoading("Fetching assignment...");

			const {
				content: [assignment],
			} = await API.get(`assignment/${id}`);

			setAssignment(assignment.fields);
			console.log("this is current assignment", assignment);
			setButtonText(buttonText);

			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	React.useEffect(() => {
		if (loading) {
			fetchAssignment();

			console.log("this is ass id", id);
		}
	}, [loading]);

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

			const { content } = await API.update(`assignment/${id}`, {
				Title: assignment.Title,
				Content: assignment.Content,
				Set: assignment.Set,
				Due: assignment.Due,
				Expected_Time: assignment.Expected_Time,
				Expected_Time_Unit: assignment.Expected_Time_Unit,
			});

			console.log("new", { content });

			setLoading(false);
			
			setEdit(!edit);
			console.log(edit);
			setButtonText("Edit");
			fetchAssignment();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const transformDate = (date) => {
		return moment(new Date(date)).format("LL");
	};

	const openEdit = () => {
		setEdit(!edit);
		if (!edit) {
			setButtonText("Cancel");
		} else {
			setButtonText("Edit");
		}
	};

	return (
		<React.Fragment>
			<TeacherNav />
			<Container>
				<ButtonWrapper>
					<Button green onClick={() => openEdit()}>
						{buttonText}
					</Button>
				</ButtonWrapper>

				{assignment && edit && (
					<React.Fragment>
						<Container>
							<Heading style={{ marginTop: 0 }}>
								Update Assignment
							</Heading>
							<Form onSubmit={handleSubmit}>
								<Section title="Content">
									<p>
										To attach a file to this assignment add
										a link to a file on the school Google
										Drive
									</p>
									<Form.Group>
										<Form.Label>Title *</Form.Label>
										<Form.Control
											required
											type="text"
											defaultValue={assignment.Title}
											onChange={({ target }) =>
												editRecord({
													Title: target.value,
												})
											}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Body</Form.Label>
										<ReactQuill
											defaultValue={assignment.Content}
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
												defaultValue={assignment.Set}
												required
												type="date"
												onChange={({ target }) =>
													editRecord({
														Set: target.value,
													})
												}
											/>
										</Col>
									</Form.Row>
								</Section>
								<Section title="Date">
									<Form.Row>
										<Col>
											<Form.Label>Due *</Form.Label>
											<Form.Control
												defaultValue={assignment.Due}
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
								{!assignment.is_Reminder && (
									<Section title="Expected time to complete assignment">
										<Form.Row>
											<Col>
												<Form.Label>
													Expected Time Unit
												</Form.Label>
												<Form.Control
													as="select"
													defaultValue={
														assignment.Expected_Time_Unit
													}
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
													defaultValue={
														assignment.Expected_Time
													}
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
								<Section>
									<Button pink type="submit">
										Save
									</Button>
								</Section>
							</Form>
						</Container>
					</React.Fragment>
				)}

				{assignment && !edit && (
					<React.Fragment>
						<Header
							heading={assignment.Title}
							subheading={assignment.Class_Name}
							style={{ marginTop: 0 }}
						/>
						<AssignmentDate>
							Assignment created on:{" "}
							{transformDate(assignment.Set)}
						</AssignmentDate>
						<AssignmentDate>
							Assignment is due on:{" "}
							{transformDate(assignment.Due)}
						</AssignmentDate>
						{!assignment.is_Reminder && (
							<AssignmentEstimatedDuration>
								Estimated completion time for assignment:{" "}
								{assignment.Expected_Time}{" "}
								{assignment.Expected_Time_Unit}
							</AssignmentEstimatedDuration>
						)}
					</React.Fragment>
				)}

				{assignment && !edit && (
					<Section loading={loading} error={error} title="Summary">
						<div
							dangerouslySetInnerHTML={{
								__html: assignment.Content,
							}}
						></div>
					</Section>
				)}
				{assignment && role.staff && !edit && (
					<ReviewAssignment
						assignmentId={id}
					/>
				)}
			</Container>
		</React.Fragment>
	);
};
