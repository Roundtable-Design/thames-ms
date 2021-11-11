import API from "../../api";
import CountDateButton from "../../components/CountDateButton";
import ListHeader from "../../components/ListHeader";
import ListItem from "../../components/ListItem";
import Menu from "../../components/Menu";
import React from "react";
import moment from "moment";
import queryString from "query-string";
import styled from "styled-components";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useRole from "../../hooks/useRole";

const TasksWrapper = styled.div`
	height: 50vh;
	padding: 0;
	margin: 0;
	position: sticky;
	overflow: auto;
`;

const CompletedWrapper = styled.div`
	height: calc(50vh - 65px);
	padding: 0;
	margin: 0;
	position: sticky;
	overflow: auto;
`;



export default ({ query = null }) => {
	const [role] = useRole();
	const student_id =( new URLSearchParams(useLocation().search)).get("student_id");

	const [loading, setLoading] = React.useState("Loading assignments...");
	const [error, setError] = React.useState(null);
	const [dueButtonText, setDueButtonText] = React.useState("Count Down");
	const [table, setTable] = React.useState([]);
	const [dueDateSwitch, setDueDateSwitch] = React.useState(false);

	const history = useHistory();

	const translateDate = (date, status) => {
		if (dueButtonText === "Count Down") {
			if (status == "Resubmit") {
				return "Resubmit";
			}
			return moment(new Date(date)).format("ll");
		} else {
			date = moment(new Date(date));
			const now = moment(new Date());
			const diff = moment.duration(date.diff(now)).days();
			const diffHours = moment.duration(date.diff(now)).hours();
			const monthDiff = moment.duration(date.diff(now)).months();

			if(diffHours > 0 && diffHours < 24){
				diff++;
			}
			// else if(diffHours < 0 && diffHours > -24){
			// 	diff--;
			// }
			
			if (status == "Resubmit") {
				return "Resubmit";
			} else {
				if (diff > 0) {
					if(diff==1 && monthDiff==0){
						return `Tomorrow`;
					}else if(monthDiff!==0){
						return `
							${Math.abs(monthDiff)} month${monthDiff !== 1 ? "s" : ""}
							${Math.abs(diff)} day${diff !== 1 ? "s" : ""}`;
					}else{
						return `${Math.abs(diff)} day${diff !== 1 ? "s" : ""}`;
					}
				} else if (diff < 0) {
					return `Overdue`;
				} else if (diff == 0) {
					if(monthDiff==0){
						return `Today`;
					}else if (monthDiff>0){
						return `Due in
							${Math.abs(monthDiff)} month${monthDiff !== 1 ? "s" : ""}`;
					}else{
						return `Overdue`;
					}
				}
			}
		}
	};

	const CheckOverdueReminder = (date) => {
		date = moment(new Date(date));
		const now = moment(new Date());
		const diff = moment.duration(date.diff(now)).days();
		if (diff < 0) {
			return `Overdue`;
		}
	};

	const translateCompleteDate = (date, status) => {
		if (status == "Resubmit") {
			return "Resubmit";
		} else if (status == "Handed in") {
			return moment(new Date(date)).format("MMM Do YY");
		} else {
			return "Pending";
		}
	};

	const CheckReminderTitle = (isReminder, class_name, title) => {
		if (isReminder) {
			return title;
		} else {
			return class_name;
		}
	};

	React.useEffect(() => {
		(async function () {
			try {
				let response;
				
				if(role.parent){
					response = await API.get(
						`reviews?student_id=${student_id}`
					);				
				} else {
					response = await API.get(
						"reviews" +
							(query !== null
								? `?${queryString.stringify(query)}`
								: ""));
					
				}

				console.log(response.content);

				if (!response.hasOwnProperty("content"))
					throw new Error("Empty response");

				setTable(response.content);
				console.log("table", response.content);
				setDueButtonText(dueButtonText);
				setLoading(false);
			} catch (err) {
				setError(err.toString());
			}
		})();
	}, []);

	const getStatus = () => {
		setDueDateSwitch(!dueDateSwitch);
		if (dueDateSwitch === false) {
			setDueButtonText("Due");
		} else {
			setDueButtonText("Count Down");
		}
	};

	const PushAssignment = (assignment_id) => {
		if(role.parent){
			history.push(
				`/assignment/${assignment_id}?student_id=${student_id}`
			)
		} else{
			history.push(
				`/assignment/${assignment_id}`
			)
		}
	}

	return !loading ? (
		<React.Fragment>
			<TasksWrapper>
				<ListHeader title="Tasks">
					<CountDateButton onClick={() => getStatus()}>
						{dueButtonText}
					</CountDateButton>
				</ListHeader>
				{table.length ? (
					table
						.sort(
							(a, b) =>
								new Date(a.fields.Assignment_Due) -
								new Date(b.fields.Assignment_Due)
						)
						.map(({ fields }, index) => (
							<ListItem
								reminder={fields.is_Reminder[0] || false}
								hide={
									fields.Student_Checked ||
									// fields.Teacher_Checked ||
									(fields.is_Reminder[0] &&
										CheckOverdueReminder(
											fields.Assignment_Due
										))
								}
								title={CheckReminderTitle(
									fields.is_Reminder,
									fields.Class_Name,
									fields.Assignment_Title
								)}
								date={translateDate(
									fields.Assignment_Due,
									fields.Status
								)}
								overdue={
									translateDate(
										fields.Assignment_Due,
										fields.Status
									) == "Overdue" ||
									translateDate(
										fields.Assignment_Due,
										fields.Status
									) == "Today" ||
									translateDate(
										fields.Assignment_Due,
										fields.Status
									) == "Tomorrow"
								}
								resubmit={fields.Status == "Resubmit"}
								handed={fields.Status == "Handed in"}
								onClick={() =>
									PushAssignment(fields.assignment_id)
									// history.push(
									// 	`/assignment/${fields.assignment_id}`
									// )
								}
								key={`assignment-${index}`}
							/>
						))
				) : (
					<p>No active assignments</p>
				)}
			</TasksWrapper>
			<CompletedWrapper>
				<ListHeader
					title="Completed"
					style={{ border: "none" }}
				></ListHeader>
				{table.length ? (
					table
						.sort(
							(a, b) =>
								new Date(b.fields.Assignment_Due) -
								new Date(a.fields.Assignment_Due)
						)
						.map(({ fields }, index) => (
							<ListItem
								hide={!fields.Student_Checked}
								checked={
									fields.Teacher_Checked &&
									fields.Student_Checked
								}
								complete={
									fields.Student_Checked &&
									!fields.Teacher_Checked
								}
								resubmit={fields.Status == "Resubmit"}
								title={CheckReminderTitle(
									fields.is_Reminder,
									fields.Class_Name,
									fields.Assignment_Title
								)}
								date={translateCompleteDate(
									fields.Assignment_Due,
									fields.Status
								)}
								onClick={() =>
									PushAssignment(fields.assignment_id)
									// history.push(
									// 	`/assignment/${fields.assignment_id}`
									// )
								}
								key={`assignment-${index}`}
							/>
						))
				) : (
					<p>No complete assignments</p>
				)}
			</CompletedWrapper>
			<Menu activeAssignment={true} activeAvatar={false} />
		</React.Fragment>
	) : (
		"Loading..."
	);
};
