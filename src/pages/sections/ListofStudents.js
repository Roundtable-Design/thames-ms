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
	const history = useHistory();

	const [loading, setLoading] = React.useState("Loading students...");
	const [error, setError] = React.useState();

	const [records, setRecords] = React.useState();
	const [selectedRecords, setSelectedRecords] = React.useState([]);

	const [green, setGreen] = React.useState(1);
	const [buttonState, setButtonState] = React.useState();
	const [actionGP, setActionGP]  = React.useState("");
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

			setRecords(response.content);
			setYearGroup(response.content[0].fields.Year_Group<10);
			setSelectedRecords([]);
			setLoading(false);
			setButtonState(false);

		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	const updateGPForSelectedStudents = async (list, switcher) => {
		const updatedStudentsGP = records.filter(({id}) => list.includes(id))
				.map(({ id, fields }) => {
					return {
						id,
						fields: {
							Green_Points: fields.Green_Points + switcher,
						},
					};
				});

			console.log({updatedStudentsGP});

		try {
			setLoading(true);

			await API.update("students", updatedStudentsGP);

			setLoading(false);

			fetchStudents();
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}

	}

	const editPoints = async (student_id, props) => {
		
		const record = records.find(({ fields }) => fields.id === student_id);		

		Object.keys(props).forEach((key) => {
			record.fields[key] = props[key];
		});

		const {
			Green_Points,
		} = record.fields;

		console.log(Green_Points);

		const student__id = record.fields._id;

		try {
			setLoading("Updating records...");

			const response = await API.update(`student/${student__id}`, {
				Green_Points,
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

	const RemoveID = (list, id) => {
		console.log(list, id);
		list.splice(list.findIndex(e => e === id),1);
		setSelectedRecords(list);
	}

	

	return (
		
		<Section title="Students" loading={loading} error={error}>
		{yearGroup ?  (
			<div style={{display:"block", textAlign:"right", paddingBottom: "10px"}}>
				<Button 
					style={{width:"190px"}}
					yellow
					grey={!buttonState} 
					disabled={!buttonState}
					onClick={()=>{
						updateGPForSelectedStudents(selectedRecords, -1)
					}} 
						>Remove Green Point 
				</Button>
			</div>
		):("")}
		{yearGroup ?  (
			<div style={{display:"block", textAlign:"right", paddingBottom: "10px"}}>
				<Button 
					style={{width:"190px"}}
					green
					grey={!buttonState} 
					disabled={!buttonState}
					onClick={() => {
						updateGPForSelectedStudents(selectedRecords, +1);
					}} 
						>Add Green Point 
				</Button>
			</div>
		):("")}
	
			{/* <Grid> */}
				<Table style={{ width: "510px"}} striped bordered>
					<thead>
					{yearGroup ?  (
						<tr>
							<th>Name</th>
							<th >Total Green Points</th>
							<th style={{width:"190px", textAlign:"center"}}>
								Select All
								<Form.Check
									id="selectAllFoo"
									style={{textAlign:"center"}}
									onChange={({ target }) =>{
										if(target.checked){
											var checkboxes = document.getElementsByName("addFoo")
											for(var i=0; i<checkboxes.length; i++){
												checkboxes[i].checked = target.checked;
											}
											setSelectedRecords(records.map(({id}) =>id));
											setButtonState(true);

										}else{
											var checkboxes = document.getElementsByName("addFoo")
											for(var i=0; i<checkboxes.length; i++){
												checkboxes[i].checked = target.unchecked;
											}
											setSelectedRecords([]);
											setButtonState(false);
										}
										console.log({selectedRecords})
									}}
								/>
							</th>
						</tr>
						):(	
							<tr>
								<th>Name</th>
							</tr>
						)}
					</thead>
					<tbody>
						{records &&
							records.sort((a, b) => a.fields.Surname.localeCompare(b.fields.Surname)).map(({ fields, id }, index) => (
								<React.Fragment>
									{yearGroup ?  (
										
									<tr key={`row-${index}`} >
									
										<td key={`td-${1}`}>
											{fields.Surname},{" "}
											{fields.Forename}
										</td>
										<td>
											{fields.Green_Points}
										</td>
										{/* <td>
											<Button 
												yellow
												onClick={() =>
													addPoint(fields.id, fields.Green_Points)
												}
												>
													Add Green Point
											</Button>
										</td> */}
										<td >
										<Form.Check
											name="addFoo"
											key={index}
											style={{textAlign:"center"}}
											onChange={({ target }) =>{
												console.log("start ",selectedRecords)
												if(target.checked){
													setButtonState(true);
													if(!selectedRecords.includes(id)){
														selectedRecords.push(id);
														console.log(id)
														console.log("updated list add:", selectedRecords)
														console.log(selectedRecords.length>0)
													}

												}else{
													var checkboxeAll = document.getElementById("selectAllFoo")
													checkboxeAll.checked = target.unchecked;
													if(selectedRecords.length==1){
														selectedRecords.length=0;
														setButtonState(false);
														
													}else{
														RemoveID(selectedRecords, id)
													}
													console.log("updated list remove: ", selectedRecords)
												}
												}}
											/>
										</td>
									</tr>
										):(	
											<tr key={`row-${index}`}>
												<td key={`td-${1}`}>
													{fields.Surname},{" "}
													{fields.Forename}
												</td>
											</tr>
										)}
								</React.Fragment>
									
							))} 
					</tbody>
				</Table>
			{/* </Grid> */}
		</Section>
	);
};
