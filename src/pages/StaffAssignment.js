import API from "../api";
import Header from "../components/Header";
import React from "react";
import ReviewAssignment from "./sections/ReviewAssignment";
import Section from "../components/Section";
import { useParams } from "react-router-dom";
import useRole from "../hooks/useRole";

export default () => {
	const [role] = useRole();

	const { id } = useParams();
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const [error, setError] = React.useState();

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
				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);

	return (
		<React.Fragment>
			{record && (
				<Header heading={record.Title} subheading={record.Class_Name} />
			)}
			<Section loading={loading} error={error} title="Summary">
				{record && (
					<div
						dangerouslySetInnerHTML={{ __html: record.Content }}
					></div>
				)}
			</Section>
			{record && role.staff && <ReviewAssignment assignmentId={id} />}
		</React.Fragment>
	);
};
