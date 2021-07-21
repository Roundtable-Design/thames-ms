import { Card, Grid, Paragraph, Title } from "../../components";

import API from "../../api";
import React from "react";
import { Section } from "../../components/Section/Section";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export default ({ query = null }) => {
	const history = useHistory();

	const [loading, setLoading] = React.useState("Loading classes...");
	const [error, setError] = React.useState();
	const [table, setTable] = React.useState();

	React.useEffect(() => {
		(async function () {
			try {
				const response = await API.get(
					"classes" +
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

	return (
		<Section error={error} loading={loading} title="Classes">
			<Grid>
				{table &&
					table.map(({ fields }, index) => (
						<Card
							onClick={() => history.push(`/class/${fields.id}`)}
							key={`class-${index}`}
						>
							<Card.Body>
								<Title>{fields.Title}</Title>
								<Paragraph>{fields.Year_Group}</Paragraph>
							</Card.Body>
							{fields.hasOwnProperty("Assignment_Count") && (
								<Card.Footer>
									{fields.Assignment_Count} active assignment
									{fields.Assignment_Count !== 1 && "s"}
								</Card.Footer>
							)}
						</Card>
					))}
			</Grid>
		</Section>
	);
};
