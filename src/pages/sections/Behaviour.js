import API from "../../api";
import Badge from "react-bootstrap/esm/Badge";
import React from "react";
import Section from "../../components/Section";
import Table from "react-bootstrap/Table";
import queryString from "query-string";

export default ({ query = null }) => {
	const [loading, setLoading] = React.useState("Loading behaviour...");
	const [error, setError] = React.useState();
	const [records, setRecords] = React.useState();

	const fetchBehaviour = async () => {
		try {
			const response = await API.get(
				"behaviour" +
					(query !== null ? `?${queryString.stringify(query)}` : "")
			);

			if (!response.hasOwnProperty("content"))
				throw new Error("Empty response");

			setRecords(response.content);
			setLoading(false);
		} catch (err) {
			setError(err.toString());
		}
	};

	React.useEffect(() => {
		fetchBehaviour();
	}, []);

	return (
		<Section title="Behaviour" loading={loading} error={error}>
			<Table striped bordered>
				<thead>
					<tr>
						<th>Points</th>
						<th>Comments</th>
					</tr>
				</thead>
				<tbody>
					{records &&
						records.map(({ fields }, index) => {
							const {
								Green_Points,
								Red_Points,
								Comments,
							} = fields;

							return (
								<tr key={`row-${index}`}>
									<td>
										{Green_Points ? (
											<Badge variant="success">
												● {Green_Points}
											</Badge>
										) : (
											""
										)}
										{Red_Points ? (
											<Badge variant="danger">
												● {Red_Points}
											</Badge>
										) : (
											""
										)}
									</td>
									<td>{Comments}</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</Section>
	);
};
