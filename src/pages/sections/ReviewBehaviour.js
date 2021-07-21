import API from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Section from "../../components/Section";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

export default () => {
	const { id } = useParams();

	const [green, setGreen] = React.useState(0);
	const [red, setRed] = React.useState(0);
	const [comments, setComments] = React.useState("");

	const [loading, setLoading] = React.useState();
	const [error, setError] = React.useState();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading("Submitting form...");

			const response = await API.create("behaviour", {
				student_id: [id],
				Comments: comments,
				Red_Points: parseInt(red, 10),
				Green_Points: parseInt(green, 10),
			});

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setGreen(null);
			setRed(null);
			setComments(null);

			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	return (
		<Section title="Review Behaviour" error={error} loading={loading}>
			<Form onSubmit={handleSubmit}>
				<Table striped bordered>
					<thead>
						<tr>
							<th>Green Points</th>
							<th>Red Points</th>
							<th>Comments</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<Form.Control
									type="number"
									value={green}
									onChange={({ target }) =>
										setGreen(target.value)
									}
								/>
							</td>
							<td>
								<Form.Control
									type="number"
									value={red}
									onChange={({ target }) =>
										setRed(target.value)
									}
								/>
							</td>
							<td>
								<Form.Control
									as="textarea"
									value={comments}
									onChange={({ target }) =>
										setComments(target.value)
									}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
				<Button variant="secondary" type="submit">
					Submit
				</Button>
			</Form>
		</Section>
	);
};
