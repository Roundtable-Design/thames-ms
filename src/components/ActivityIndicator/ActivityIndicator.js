import Loader from "react-loader-spinner";
import React from "react";
import { Wrapper } from "./styles";

export const ActivityIndicator = ({ children, ...props }) => {
	return (
		<Wrapper {...props}>
			<Loader type="ThreeDots" color="000" height={30} width={30} />
			<p>{children || "Loading..."}</p>
		</Wrapper>
	);
};
