import API from "../../api";
import { Grid } from "../../components";
import React from "react";
import Section from "../../components/Section";
import Table from "react-bootstrap/Table";
import queryString from "query-string";
import { useParams } from "react-router-dom";

export default ({ query = null }) => {
	const [loading, setLoading] = React.useState("Loading students data...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();

	const [yearGroup, setYearGroup] = React.useState();

	const fetchStudents = async () => {
		try {
			const response = await API.get(
				"students" +
					(query !== null ? `?${queryString.stringify(query)}` : "")
			);

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setYearGroup(response.content[0].fields.Year_Group);

			const sorted = response.content.sort(function (a, b) {
				if (a.fields.Surname < b.fields.Surname) {
					return -1;
				}
				if (a.fields.Surname > b.fields.Surname) {
					return 1;
				}
				return 0;
			});

			console.log(response.content);

			setRecords(sorted);

			setLoading(false);
		} catch (err) {
			console.error(err);
			setError(err.toString());
		}
	};

	React.useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<Section title="Students" loading={loading} error={error}>
			<Grid>
				<Table style={{ maxWidth: "510px", minWidth: "290px" }} striped bordered>
					<tbody>
						{records &&
							records.map(({ fields, id }, index) => (
								<tr key={`row-${index}`}>
									<td key={`td-${1}`}>
										<a href={`/reviews?student_id=${id}`}>
											{fields.Surname}, {fields.Forename}
										</a>
									</td>
									<td key={`td-${1}`} style={{textAlign:"center"}}>
											{fields.Year_Group}
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Grid>
		</Section>
	);
};
