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
import Loader from 'react-loader-spinner'

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
	};

	const handleMarkAll = async () => {
		const updatedReviews = reviews.map(({ id }) => {
			return {
				id,
				fields: {
					Status: "Handed in",
				},
			};
		});

		try {
			setLoading(true);

			await API.update("reviews", updatedReviews);

			setLoading(false);

			fetchReviews();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}	
	};

	React.useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<Section title="Review" error={error}>
			{loading && 
				<div style={{position: 'absolute', left: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
					<Loader type="ThreeDots" color="000" height={30} width={30}></Loader>
					<p>{loading}</p>
				</div>}
			<Table style={{ minWidth: "1000px", marginTop: '100px' }} striped bordered>
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
						reviews.sort((a, b) => a.fields.Student_Surname.toString().localeCompare(b.fields.Student_Surname.toString())).map(({ fields }, index) => (
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
										value={fields.Status}
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
										onBlur={({ target }) =>
											editReview(fields.id, {
												Feedback: target.value,
											})
										}
									>{fields.Feedback}</Form.Control>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Section>
	);
};
