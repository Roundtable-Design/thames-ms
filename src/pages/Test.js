import React from "react";
import api from "../api";

export default () => {
	React.useEffect(() => {
		(async function () {
			const response = await api.get(`reviews`);

			console.log({ response });
		})();
	});

	return (
		<React.Fragment>
			<h1>Test page</h1>
		</React.Fragment>
	);
};
