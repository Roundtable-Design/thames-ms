import API from "../../api";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Button } from "../../components/";
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

	const editReview = async (review_id, props) => {
		const review = reviews.find(({ id }) => id === review_id);

		Object.keys(props).forEach((key) => {
			review.fields[key] = props[key];
		});

		console.log("all props", props);

		const {
			// Teacher_Checked,
			Late,
			Status,
			Effort,
			Feedback,
		} = review.fields;

		try {
			setLoading("Updating reviews...");

			const response = await API.update(`review/${review_id}`, {
				// Teacher_Checked,
				Late,
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

	const handleMarkAll = async () => {
		const updatedReviews = reviews.map((value) => {
			const copy = { ...value };

			copy.fields.Status = "Handed in";

			return copy;
		});

		setLoading(true);

		API.update("reviews", updatedReviews)
			.then(console.log)
			.catch(console.error)
			.finally(() => {
				setLoading(false);
				fetchReviews();
			});

		// try {
		// 	await API.update(`reviews`, updatedReviews);
		// } catch (err) {
		// 	console.error(err);
		// 	setError(err.toString());
		// }
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
						<th>
							<Button yellow onClick={handleMarkAll}>
								Mark all as <i>Handed in</i>
							</Button>
						</th>
						<th>Effort</th>
						<th>Late</th>
						<th>Feedback</th>
					</tr>
				</thead>
				<tbody>
					{reviews &&
						reviews.map(({ fields }, index) => (
							<tr key={`row-${index}`}>
								<td key={`td-${1}`}>
									{/* <Link to={`/student/${fields.student_id}`}> */}
									{fields.Student_Surname},{" "}
									{fields.Student_Forename}
									{/* </Link> */}
								</td>
								<td key={`td-${2}`}>
									<Form.Control
										as="select"
										required
										defaultValue={fields.Status}
										onChange={({ target }) =>
											editReview(fields.id, {
												Status: target.options[
													target.selectedIndex
												].value,
											})
										}
									>
										{/* <option value="Current Status">{fields.Status}</option> */}
										<option value="Pending">Pending</option>
										<option value="Handed in">
											Handed in
										</option>
										<option value="Resubmit">
											Resubmit
										</option>
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
								<td key={`td-${4}`}>
									<Form.Check
										value={fields.Late}
										checked={fields.Late}
										onChange={({ target }) =>
											editReview(fields.id, {
												Late: target.checked,
											})
										}
									/>
								</td>
								<td key={`td-${5}`}>
									<Form.Control
										as="textarea"
										// value={fields.Feedback}
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
