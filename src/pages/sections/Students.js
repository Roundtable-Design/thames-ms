import { Card, Grid, Paragraph, Title } from "../../components";

import API from "../../api";
import React from "react";
import Section from "../../components/Section";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export default ({ query = null }) => {
	const [loading, setLoading] = React.useState("Loading students...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();

	const history = useHistory();

	React.useEffect(() => {
		(async function () {
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
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError(err.toString());
			}
		})();
	}, []);

	return (
		<Section title="Students" loading={loading} error={error}>
			<Grid>
				{records &&
					records.map(({ fields }, index) => (
						<Card
							onClick={() =>
								history.push(`/student/${fields.id}`)
							}
							key={`student-${index}`}
						>
							<Card.Body>
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
						</Card>
					))}
			</Grid>
		</Section>
	);
};
