import { Card, Grid, Paragraph, Title } from "../../components";

import API from "../../api";
import CountDateButton from "../../components/CountDateButton";
import ListHeader from "../../components/ListHeader";
import ListItem from "../../components/ListItem";
import Menu from "../../components/Menu";
import React from "react";
import Section from "../../components/Section";
import moment from "moment";
import queryString from "query-string";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const TasksWrapper = styled.div`
	height: 50vh;
	padding: 0;
	margin: 0;
	position: relative;
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
	const [loading, setLoading] = React.useState("Loading assignments...");
	const [error, setError] = React.useState(null);
	const [dueButtonText, setDueButtonText] = React.useState("Count Down");
	const [table, setTable] = React.useState([]);
	const [dueDateSwitch, setDueDateSwitch] = React.useState(false);


	const history = useHistory();

	const translateDate = (date, status) => {
		if (dueButtonText === "Count Down") {
			
			if (status=="Re-submit"){
				return "Re-submit";
			}
			return moment(new Date(date)).format("ll");
		} else {
			date = moment(new Date(date));
			const now = moment(new Date());
			const diff = moment.duration(date.diff(now)).days();
			const diffHours = moment.duration(date.diff(now)).hours();
			if (status=="Re-submit"){
				return "Re-submit";
			}
			else{
				if (diff > 0) {
				return `${Math.abs(diff)} day${diff !== 1 ? "s" : ""}`;
			} else if (diff < 0) {
				return `Overdue`;
			} else if (diffHours > 0 && diffHours <= 24) {
				console.log("this is Diff housrs", diffHours);
				return `Tomorrow`;
			} else if (diff == 0) {
				console.log("this is Diff", diff);
				return `Today`;
			}
			}
			
		}
	};

	const CheckOverdueRreminder = (date) => {
		date = moment(new Date(date));
		const now = moment(new Date());
		const diff = moment.duration(date.diff(now)).days();
		if (diff < 0) {
			return `Overdue`;
		}
	};

	const translateCompleteDate = (date, status) => {	
		if (status=="Re-submit"){
			return "Re-submit";
		}else if(status=="Handed In"){
			return moment(new Date(date)).format("MMM Do YY");
		}else{
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
				// Looks like a call to /reviews might make more sense. Just need to add fields in for the title of the assignment etc...

				const response = await API.get(
					"reviews" +
						(query !== null
							? `?${queryString.stringify(query)}`
							: "")
				);

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
								reminder={fields.Is_Reminder}
								hide={
									fields.Student_Checked ||
									// fields.Teacher_Checked ||
									(fields.Is_Reminder &&
										CheckOverdueRreminder(
											fields.Assignment_Due
										))
								}
								title={CheckReminderTitle(
									fields.Is_Reminder,
									fields.Class_Name,
									fields.Assignment_Title
								)}
								date={translateDate(fields.Assignment_Due, fields.Status)}
								overdue={
									translateDate(fields.Assignment_Due, fields.Status) ==
										"Overdue" ||
									translateDate(fields.Assignment_Due, fields.Status) ==
										"Today" ||
									translateDate(fields.Assignment_Due, fields.Status) ==
										"Tomorrow"
								}
								resubmit={
									fields.Status=="Re-submit"
								}
								handed={
									fields.Status=="Handed In"
								}
								onClick={() =>
									history.push(
										`/assignment/${fields.assignment_id}`
									)
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
								hide={!fields.Student_Checked }
								checked={
									fields.Teacher_Checked &&
									fields.Student_Checked
								}
								complete={
									fields.Student_Checked &&
									!fields.Teacher_Checked
								}
								resubmit={
									fields.Status=="Re-submit"
								}
								title={CheckReminderTitle(
									fields.Is_Reminder,
									fields.Class_Name,
									fields.Assignment_Title
								)}
								date={translateCompleteDate(
									fields.Assignment_Due,
									fields.Status
								)}
								onClick={() =>
									history.push(
										`/assignment/${fields.assignment_id}`
									)
								}
								key={`assignment-${index}`}
							/>
						))
				) : (
					<p>No active assignments</p>
				)}
			</CompletedWrapper>
			<Menu activeAssignment={true} activeAvatar={false} />
		</React.Fragment>
	) : (
		"Loading..."
	);
};
