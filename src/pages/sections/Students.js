import { Grid } from "../../components";

import API from "../../api";
import React from "react";
import Section from "../../components/Section";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {Button} from "../../components/";



export default ({query = null, classId}) => {
	const { id } = useParams();

	const [loading, setLoading] = React.useState("Loading students data...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();

	const [green, setGreen] = React.useState(1);

	const history = useHistory();

	const [yearGroup, setYearGroup] = React.useState();

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

			
			setYearGroup(response.content[0].fields.Year_Group);
			

			const sorted = response.content.sort(function(a,b){
				if(a.fields.Surname < b.fields.Surname) { return -1; }
				if(a.fields.Surname > b.fields.Surname) { return 1; }
				return 0;
			})

			setRecords(sorted);

			setLoading(false);

		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const editPoints = async (student_id, props) => {
		const record = records.find(({ id }) => id === student_id);
		console.log(records);

		console.log(student_id);

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
		editPoints(studentID, {
			Green_Points: studentPoint,
		})
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
							{yearGroup <=9 && (<th>Total Green Points</th>)}
							{yearGroup <=9 && (
							<th>
								{/* <Button 
									yellow 
									onClick={() =>
										addPoint()
									 }
									>  */}
										Add Green Points to All 
								{/* </Button> */}
							</th>)}
						</tr>
					</thead>
					<tbody>
						{records &&
							records.map(({ fields }, index) => (
								<React.Fragment>
										{/* fields.class_year_id.includes(classId) && ? ( */}
										<tr key={`row-${index}`} >
										
											<td key={`td-${1}`}>
												{fields.Surname},{" "}
												{fields.Forename}
											</td>
											{yearGroup <=9 && (<td>
												{fields.Green_Points}
											</td>)}
											{yearGroup <=9 && (<td>
												<Button 
													yellow
													onClick={() =>
														addPoint(fields.id, fields.Green_Points)
													}
													>
														Add Green Point
												</Button>
											</td>)}
										</tr>
								</React.Fragment>	
							))} 
					</tbody>
				</Table>
			</Grid>
		</Section>
	);
};
