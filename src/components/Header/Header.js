import { Heading, Subheading, Logo } from "..";

import React from "react";
import Section from "../Section";
import { Wrapper } from "./styles";
import theme from "../../theme";

export const Header = ({ heading, subheading, ...props }) => {
	return (
		<Section {...props}>
			{/* <Logo /> */}
			<Heading style={{ marginBottom: "20px" }}>{heading}</Heading>
			<Subheading style={{ marginBottom: `0` }}>
				{subheading}
			</Subheading>
		</Section>
	);
};
