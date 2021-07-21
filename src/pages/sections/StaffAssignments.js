import { Card, Grid, Paragraph, Title } from "../../components";

import API from "../../api";
import React from "react";
import Section from "../../components/Section";
import moment from "moment";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export default ({ query = null }) => {
	const [loading, setLoading] = React.useState("Loading assignments...");
	const [error, setError] = React.useState(null);
	const [table, setTable] = React.useState([]);

	const history = useHistory();

	React.useEffect(() => {
		(async function () {
			try {
				const response = await API.get(
					"assignments" +
						(query !== null
							? `?${queryString.stringify(query)}`
							: "")
				);

				if (!response.hasOwnProperty("content"))
					throw new Error("Empty response");

				setTable(response.content);
				setLoading(false);
			} catch (err) {
				setError(err.toString());
			}
		})();
	}, []);

	const getStatus = (due) => {
		due = moment(new Date(due));
		const now = moment(new Date());
		const diff = moment.duration(due.diff(now)).days();

		if (diff > 0) {
			return `Due in ${Math.abs(diff)} day${diff !== 1 ? "s" : ""}`;
		} else if (diff < 0) {
			return `Due ${Math.abs(diff)} day${diff !== -1 ? "s" : ""} ago`;
		} else {
			return `Due today`;
		}
	};

	return (
		<Section title="Assignments" loading={loading} error={error}>
			{table.length ? (
				<Grid>
					{table.map(({ fields }, index) => (
						<Card
							onClick={() =>
								history.push(`/assignment/${fields.id}`)
							}
							key={`assignment-${index}`}
						>
							<Card.Body>
								<Title>{fields.Title}</Title>
								<Paragraph>{fields.Class_Name}</Paragraph>
							</Card.Body>
							<Card.Footer>{getStatus(fields.Due)}</Card.Footer>
						</Card>
					))}
				</Grid>
			) : (
				<p>No active assignments</p>
			)}
		</Section>
	);
};
