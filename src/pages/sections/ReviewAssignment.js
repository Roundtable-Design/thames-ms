import API from "../../api";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import Section from "../../components/Section";
import Table from "react-bootstrap/Table";
import queryString from "query-string";

export default ({ assignmentId }) => {
	const [loading, setLoading] = React.useState("Loading reviews...");
	const [error, setError] = React.useState();
	const [reviews, setReviews] = React.useState();
	const [record, setRecord] = React.useState({});
	const [currentStatus, setCurrentStatus] = React.useState();


	const fetchReviews = async () => {
		try {
			setLoading("Fetching reviews...");
			const response = await API.get(
				`reviews?${queryString.stringify({
					assignment_id: assignmentId,
				})}`
			);

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			console.log("content", response.content);

			setReviews(response.content);
			setLoading(false);
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

	const editReview = async (review_id, props) => {
		const review = reviews.find(({ id }) => id === review_id);

		Object.keys(props).forEach((key) => {
			review.fields[key] = props[key];
		});

		console.log("Status", props);

		const {
			// Teacher_Checked,
			Status,
			Effort,
			Feedback,
		} = review.fields;

		try {
			setLoading("Updating reviews...");

			const response = await API.update(`review/${review_id}`, {
				// Teacher_Checked,
				Status,
				Effort,
				Feedback,
			});

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setLoading(false);

			fetchReviews();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}

		// setReviews(copy);
	};

	React.useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<Section title="Review" error={error}>
			{loading && <ActivityIndicator inline>{loading}</ActivityIndicator>}
			<Table style={{ minWidth: "1000px" }} striped bordered>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Effort</th>
						<th>Feedback</th>
					</tr>
				</thead>
				<tbody>
					{reviews &&
						reviews.map(({ fields }, index) => (
							<tr key={`row-${index}`}>
								<td key={`td-${1}`}>
									<Link to={`/student/${fields.student_id}`}>
										{fields.Student_Surname},{" "}
										{fields.Student_Forename}
									</Link>
								</td>
								<td key={`td-${2}`}>
								<Form.Control
									as="select"
									required
									defaultValue={fields.Status}
									onChange={({ target }) =>
									
									editReview(fields.id, {
											Status: 
												target.options[target.selectedIndex]
													.value,
										})
									}
								>	
									{/* <option value="Current Status">{fields.Status}</option> */}
									<option value="Pending">
										Pending
									</option>
									<option value="Handed In">Handed In</option>
									<option value="Re-submit">Re-submit</option>
								</Form.Control>
								</td>
								<td key={`td-${3}`}>
									<Rating
										value={fields.Effort}
										defaultValue={0}
										onChange={({ target }) =>
											editReview(fields.id, {
												Effort: target.value,
											})
										}
									/>
								</td>
								<td key={`td-${5}`}>
									<Form.Control
										value={fields.Feedback}
										onBlur={({ target }) =>
											editReview(fields.id, {
												Feedback: target.value,
											})
										}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Section>
	);
};
