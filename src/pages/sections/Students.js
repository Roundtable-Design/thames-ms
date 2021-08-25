import { Card, Grid, Paragraph, Title } from "../../components";

import API from "../../api";
import React from "react";
import Section from "../../components/Section";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {Button} from "../../components/";



export default ({ query = null , classId}) => {
	const { id } = useParams();

	const [loading, setLoading] = React.useState("Loading students...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();
	const [behaviour, setBehaviour] = React.useState();

	const [green, setGreen] = React.useState(1);

	const [red, setRed] = React.useState(0);
	const [comments, setComments] = React.useState("");

	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading("Submitting form...");

			const response = await API.create("behaviour", {
				student_id: [id],
				Green_Points: parseInt(green, 10),
			});

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setGreen(null);

			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const fetchStudents = async () => {
		try {
			const response = await API.get(
				
				"students" +
					(query !== null
						? `?${queryString.stringify(query)}`
						: "")
			);
			
			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setRecords(response.content);
			console.log("class : ", response.content);

			// delete api get behaviour later

				const responseBehaviour = await API.get(
					"behaviour"
					+
					(query !== null
						? `?${queryString.stringify(query)}`
						: "")
				);

				if (!responseBehaviour.hasOwnProperty("content"))
					throw new Error("Empty response");	

				setBehaviour(responseBehaviour.content);
				console.log("behaviour ", responseBehaviour.content);

			// 

			setRed(0);
			setComments("");

			setLoading(false);

		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editPoints = async (student_id, props) => {
		const record = records.find(({ id }) => id === student_id);
		console.log(record.id);

		Object.keys(props).forEach((key) => {
			record.fields[key] = props[key];
		});

		const {
			Green_Points,
		} = record.fields;

		try {
			setLoading("Updating records...");

			const response = await API.update(`student/${student_id}`, {
				Green_Points
			});

			console.log("green points - try getting response", Green_Points);

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setLoading(false);

			fetchStudents();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const addPoint = (studentID, studentPoint) => {
		setGreen(green);
		console.log("green addPoint", green);
		console.log("student Point original", studentPoint);
		studentPoint++;
		console.log("student Point updated", studentPoint);
		editPoints(studentID, {
			Green_Points: studentPoint,
		})
		console.log("done");
	}

	React.useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<Section title="Students" loading={loading} error={error}>
			<Grid>
				<Table style={{ width: "510px"}} striped bordered>
					<thead>
						<tr>
							<th>Name</th>
							<th>Total Green Points</th>
							<th>
								<Button 
									yellow
									// onClick={() =>
									// 	addPoint()
									// }
									>
										Add Green Point to All
								</Button>
							</th>
						</tr>
					</thead>
					<tbody>
						{records &&
							records.map(({ fields }, index) => (
								<React.Fragment>
									{fields.class_year_id.includes(classId) ? (
										<tr key={`row-${index}`} >
										
											<td key={`td-${1}`}>
											{/* <Link to={`/student/${fields.student_id}`}> */}
												{fields.Surname},{" "}
												{fields.Forename}
											{/* </Link> */}
											</td>
											{/* <td key={`td-${1}`}>
												{fields.Year_Group}
											</td> */}
											<td>
												{fields.Green_Points}
											</td>
											<td>
												<Button 
													yellow
													onClick={() =>
														addPoint(fields.id, fields.Green_Points)
														// editPoints(fields.id, {
														// 	Green_Points: target.value,
														// })
													}
													>
														Add Green Point
												</Button>
											</td>
										</tr>
									):(
										""
									)} 

								</React.Fragment>
									
							))} 
					</tbody>
				</Table>

							{/* <Card
							onClick={() =>
								history.push(`/student/${fields.id}`)
						 	}
						 	key={`student-${index}`}
						 > */}
						 	{/* <Card.Body>
						 		<Title>
						 			{fields.Surname}, {fields.Forename}
						 		</Title>
						 		<Paragraph>{fields.Year_Group}</Paragraph>
						 	</Card.Body>
						 	<Card.Footer>
						 		{fields.Assignment_Title.length} active
						 		assignment
						 		{fields.Assignment_Title.length !== 1 && "s"}
						 	</Card.Footer>
						 </Card> */}
					 {/* ))} */}
			</Grid>
		</Section>
	);
};
