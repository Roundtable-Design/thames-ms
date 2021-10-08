import { Grid } from "../../components";
import API from "../../api";
import React from "react";
import Section from "../../components/Section";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import {Button} from "../../components";
import Form from "react-bootstrap/Form";




export default ({ query = null , classId}) => {
	const { id } = useParams();

	const [loading, setLoading] = React.useState("Loading students...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();

	const [green, setGreen] = React.useState(1);
	const [buttonState, setButtonState]  = React.useState(0);

	let count;

	const history = useHistory();

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

			// console.log("student list test", response.content)
			setLoading(false);

		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editPoints = async (student_id, props) => {
		const record = records.find(({ fields }) => fields.id === student_id);

		// console.log("starting edit points", record);
		

		Object.keys(props).forEach((key) => {
			record.fields[key] = props[key];
		});

		// console.log("edited props", props);

		const {
			Green_Points,
		} = record.fields;

		// console.log("This new green point", Green_Points)

		const student__id = record.fields._id;
		// console.log("found the stduent ", student_id)

		try {
			setLoading("Updating records...");

			const response = await API.update(`student/${student__id}`, {
				Green_Points,
			});

			// console.log("api call susscess", response)

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
		studentPoint++;
		// console.log("studentPoint after", studentPoint);

		editPoints(studentID, {
			Green_Points: studentPoint,
		})
	}

	// const UpdateButtonState = (checked, currentCount) =>{
	// 	console.log(checked)
	// 	if(checked){
	// 		currentCount++;
	// 		setButtonState(currentCount);
	// 		console.log(currentCount);
	// 	}else{
	// 		currentCount--;
	// 		setButtonState(currentCount);
	// 		console.log(currentCount);

	// 	}
	// } 
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
								{/* <Button 
									yellow */}
									{/* onClick={() =>
										addPoint()
									 } */}
									{/* > */}
										Add Green Points 
										{/* to All */}
								{/* </Button> */}
							</th>
							{/* <th>
								<Button 
									green={buttonState>=('input:checkbox:checked').length}
									grey={buttonState<('input:checkbox:checked').length} 
									disabled={buttonState>=('input:checkbox:checked').length}
									onClick={() =>
										console.log("clicked")
									 } 
									 >
										Add multiple Green Points 
								</Button>
							</th> */}
						</tr>
					</thead>
					<tbody>
						{records &&
							records.map(({ fields }, index) => (
								<React.Fragment>
									<tr key={`row-${index}`} >
									
										<td key={`td-${1}`}>
											{fields.Surname},{" "}
											{fields.Forename}
										</td>
										<td>
											{fields.Green_Points}
										</td>
										<td>
											<Button 
												yellow
												onClick={() =>
													addPoint(fields.id, fields.Green_Points)
												}
												>
													Add Green Point
											</Button>
										</td>
										{/* <td style={{padding: "50px 60px"}}>
										<Form.Check
											// value={false}
											// checked={false}
											style={{textAlign:"center"}}
											onChange={({ target }) =>{
												UpdateButtonState(target.checked, count);
												}										}
											/>
										</td> */}
									</tr>
								</React.Fragment>
									
							))} 
					</tbody>
				</Table>
			</Grid>
		</Section>
	);
};
