import {
	Caption,
	Heading,
	Paragraph,
	Subheading,
	TableCaption,
	Title,
} from "../components";

import API from "../api";
import Assignments from "./sections/Assignments";
import Badge from "react-bootstrap/Badge";
import Behaviour from "./sections/Behaviour";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import React from "react";
import ReviewBehaviour from "./sections/ReviewBehaviour";
import Section from "../components/Section";
import theme from "../theme";
import { useParams } from "react-router-dom";
import useRole from "../hooks/useRole";

export default () => {
	const [role] = useRole();
	const { id } = useParams();
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState();

	React.useEffect(() => {
		if (loading) {
			(async function () {
				try {
					const response = await API.get(`student/${id}`);

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					console.log(response);

					setRecord(response.content[0].fields);
					setLoading(false);
				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);

	return (
		<React.Fragment>
			{record && (
				<React.Fragment>
					<Header
						heading={`${record.Surname}, ${record.Forename}`}
						subheading={record.Year_Group}
					/>
				</React.Fragment>
			)}
			<Assignments query={{ student_id: id }} />
			<Behaviour query={{ student_id: id }} />
			{role.staff && <ReviewBehaviour />}
		</React.Fragment>
	);
};
