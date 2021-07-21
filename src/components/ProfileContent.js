import styled, { keyframes } from "styled-components";

import API from "../api";
import { Edit } from "@material-ui/icons";
import React from "react";
import marked from "marked";

const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 30px 0;
	padding-top: 0;
	margin: 0;

	width: 100%;
	height: auto;
	/* calc(100vh - 65px); */

	background: #e8e6df;
`;
const Achievement = styled.div`
	background-color: #99d6ea;
	padding: 36px 39px;
	margin: 0;

	width: 100%;
	height: auto;
`;

const Title = styled.h6`
	font-style: normal;
	font-weight: 800;
	font-size: 15px;
	line-height: 20px;

	color: #4e4e4e;

	margin: 0;
	margin-bottom: 4px;
`;

const Content = styled.div`
	font-style: normal;
	//font-weight: 600;
	font-size: 15px;
	line-height: 20px;

	color: #4e4e4e;
	background: #ffffff;
	border-radius: 3px;
	padding: 10px;
`;
const GeneralLinks = styled.div`
	padding: 0 30px;
	margin: 0;
	margin-top: 30px;

	width: 100%;
	height: auto;

	${Title} {
		margin-bottom: 9px;
	}
`;

const Reports = styled.div`
	padding: 0 30px;
	margin: 0;
	margin-top: 30px;

	width: 100%;
	height: auto;

	${Title} {
		margin-bottom: 9px;
	}
`;

const Link = styled.div`
	padding: 0;
	margin: 0;
	margin-bottom: 10px;

	width: 100%;
	height: auto;

	display: grid;
	grid-template-columns: 31px auto;
	column-gap: 7px;

	${({ report }) =>
		report &&
		`
        display: block; 
    `}

	font-style: normal;
	//font-weight: 600;
	font-size: 15px;
	line-height: 18px;

	a {
		color: #002e5d;
		margin: 0;
		margin-bottom: 10px;
		display: block;
		height: 20px;

		img {
			padding-right: 7px;
			padding-left: 11px;
		}
	}

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: #002e5d;
		cursor: pointer;
	}
`;

const AttachmentImage = styled.div`
	width: 20px;
	height: 20px;
	justify-self: end;

	background-image: url("${require("../assets/icons/paperclip-pink.svg")}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: transparent;
`;

const data = [
	{
		link: "",
		title: "first link",
	},
	{
		link: "",
		title: "first link",
	},
	{
		link: "",
		title: "first link",
	},
];

const ProfileContent = ({ children, achievement, report, ...props }) => {
	const [record, setRecord] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState();

	React.useEffect(() => {
		if (loading) {
			(async function () {
				try {
					const response = await API.get(`/general`);

					if (!response.hasOwnProperty("content"))
						throw new Error("Empty response");

					const record = response.content;
					setRecord(record);

					setLoading(false);
				} catch (err) {
					setError(err.toString());
				}
			})();
		}
	}, [loading]);

	return !loading ? (
		<Wrapper {...props}>
			<Achievement>
				<Title>Achievement</Title>
				<Content
					dangerouslySetInnerHTML={{ __html: marked(achievement) }}
				/>
			</Achievement>
			<GeneralLinks>
				<Title>Useful Information</Title>
				{record.map(({ fields }) => (
					<Link>
						<AttachmentImage />
						<a href={fields.Link}>{fields.Name}</a>
					</Link>
				))}
			</GeneralLinks>
			<Reports>
				<Title>Reports</Title>
				<Link report={report}>{children}</Link>
			</Reports>
		</Wrapper>
	) : (
		"Loading..."
	);
};

export default ProfileContent;
