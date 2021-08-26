import API from "../api";
import Header from "../components/Header";
import React from "react";
import ReviewAssignment from "./sections/ReviewAssignment";
import Section from "../components/Section";
import { useParams } from "react-router-dom";
import useRole from "../hooks/useRole";
import TeacherNav from "../components/TeacherNav";
import Container from "react-bootstrap/Container";
import { AssignmentDate, AssignmentEstimatedDuration } from "../components";
import {ButtonWrapper, Button} from "../components/";
import UpdateAssignment from "./UpdateAssignment";
import moment from "moment";



export default () => {
	const [role] = useRole();

	const { id } = useParams();
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

	const [edit,setEdit] = React.useState(false);

	React.useEffect(() => {
		if (loading) {
			(async function () {
				try {
					const response = await API.get(`assignment/${id}`);

					console.log({ response });

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					setRecord(response.content[0].fields);
					setLoading(false);
					console.log(record);
				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);
	
	const transformDate = (date) => {
		return moment(new Date(date)).format('LL'); 
	};


	return (
		<React.Fragment>
			< TeacherNav />
			<Container>
				<ButtonWrapper 
				// hide={edit}
				>
					<Button green
						onClick={()=>setEdit(!edit)}
						>Edit</Button>
				</ButtonWrapper>

				{record && edit && (
					<React.Fragment>
						<UpdateAssignment 
							assignmentId={id} 
							assignmentTitle={record.Title} 
							assignmentContent={record.Content} 
							reminder={record.is_Reminder}
							dueDate={record.Due}
							estimatedTime={record.Expected_Time} 
							estimatedUnit={record.Expected_Time_Unit}
							/>
					</React.Fragment>
				)}
				
				{record && !edit &&
				 (
					<React.Fragment>
						<Header heading={record.Title} subheading={record.Class_Name} 
							style={{marginTop: 0}}/>
						<AssignmentDate>Assignment created on: {transformDate(record.Set)}</AssignmentDate>
						<AssignmentDate>Assignment is due on: {transformDate(record.Due)}</AssignmentDate>
						{!record.is_Reminder && (
							<AssignmentEstimatedDuration>Estimated completion time for assignment: {record.Expected_Time} {record.Expected_Time_Unit}</AssignmentEstimatedDuration>
						)}
					</React.Fragment>
				)}

				{record && !edit &&(
					<Section loading={loading} error={error} title="Summary">
						
							<div
								dangerouslySetInnerHTML={{ __html: record.Content }}
							></div>
						
					</Section>
				)}
				{record && role.staff && !edit && <ReviewAssignment assignmentId={id} />}
			</Container>
		</React.Fragment>
	);
};
