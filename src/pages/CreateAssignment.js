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

export default () => {
	const history = useHistory();

	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [classesLoading, setClassesLoading] =
		React.useState("Loading classes...");
	const [error, setError] = React.useState();
	const [table, setTable] = React.useState();

	const [record, setRecord] = React.useState({});

	console.log("Hello?");

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

			<Heading>Create Assignment</Heading>

			<Form onSubmit={handleSubmit}>
				<Section loading={classesLoading} error={error} title="Class">
					<Form.Control
						required
						as="select"
						onChange={({ target }) => {
							const class_id =
								target.options[target.selectedIndex].value;

							console.log({ table, class_id });

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
				<Section title="Content">
					<Form.Group>
						<Form.Label>Title</Form.Label>
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
							<Form.Label>Set</Form.Label>
							<Form.Control
								required
								type="date"
								onChange={({ target }) =>
									editRecord({ Set: target.value })
								}
							/>
						</Col>
						<Col>
							<Form.Label>Due</Form.Label>
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
				<Section title="Ecpected">
					<Form.Row>
						<Col>
							<Form.Label>Expected Time Unit</Form.Label>
							<Form.Control
								as="select"
								required
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
								required
								type="text"
								onChange={({ target }) =>
									editRecord({ Expected_Time: target.value })
								}
							/>
						</Col>
					</Form.Row>
				</Section>
				<Section>
					<Button type="submit" variant="secondary">
						Submit
					</Button>
				</Section>
			</Form>
		</React.Fragment>
	);
};
