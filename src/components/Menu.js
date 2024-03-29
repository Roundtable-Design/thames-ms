import API from "../api";
import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

const Wrapper = styled.div`
	box-sizing: border-box;
	position: sticky;
	bottom: 0;
	left: 0;
	height: 65px;
	max-height: 65px;
	min-height: 65px;
	width: 100vw;
	max-width: 540px;

	text-align: center;
	border-top: 2px solid #aaaaaa;
	background-color: white;

	z-index: 1500;

	display: grid;
	justify-items: center;
	align-items: center;
	/* grid-template-areas: "left right"; */
	grid-template-columns: repeat(2, 1fr);
`;

const NavItem = styled.div`
	width: 24px;
	height: 24px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url("${({ activeAssignment }) =>
		activeAssignment
			? require("../assets/icons/book-open.svg")
			: require("../assets/icons/book-off.svg")}");
	${({ avatar }) =>
		avatar &&
		`
        background-image: url("${({ activeAvatar }) =>
			activeAvatar
				? require("../assets/icons/Avatar.svg")
				: require("../assets/icons/Avatar-off.svg")}");
    `}
`;

const NavProfile = styled.div`
	width: 24px;
	height: 24px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url("${({ activeAvatar }) =>
		activeAvatar
			? require("../assets/icons/Avatar.svg")
			: require("../assets/icons/Avatar-off.svg")}");
`;

const Counters = styled.div`
	position: absolute;
	top: -3px;
	right: -7px;

	width: 15px;
	height: 15px;

	background: ${({ assignmentColor }) =>
		assignmentColor ? "#5CBDE5" : "#40C1AC"};
	border-radius: 50px;

	font-style: normal;
	//font-weight: 600;
	font-size: 7px;
	line-height: 14px;
	color: #4e4e4e;
`;

const MenuWrapper = styled.a`
	position: relative;
`;

const Menu = ({
	activeAssignment,
	activeAvatar,
	assignmentCounter,
	pointsCounter,
}) => {
	const [role] = useRole();

	const student_id = new URLSearchParams(useLocation().search).get(
		"student_id"
	);

	const [record, setRecord] = React.useState(null);
	const [count, setCount] = React.useState();
	const [totalAssignment, setTotalAssignment] = React.useState();

	const countComms = (comms) => {
		if (comms == "undefined") {
			return 0;
		} else {
			return comms.length;
		}
	};

	React.useEffect(() => {
		(async function () {
			let me;
			let reviews;

			if (role.parent) {
				me = (await API.get(`/students?id=${student_id}`)).content[0];
				reviews = (await API.get(`reviews?student_id=${student_id}`))
					.content;
			} else {
				me = (await API.get(`/me`)).content[0];
				reviews = (await API.get(`/reviews`)).content;
			}

			console.log("check me", me);

			console.log("check reviews", reviews);

			let reviewsCount = reviews.filter(
				({ fields }) =>
					!fields.Student_Checked && !fields.is_Reminder[0]
			).length;

			setTotalAssignment(reviewsCount);

			setRecord(me);

			console.log({ me });

			if (me.fields.Year_Group.toString().replace(/\D/g, "") > 9) {
				console.log("true funct");
				if (me.fields.Commendations == null) {
					setCount(0);
				} else {
					setCount(me.fields.Commendations.length);
				}
			} else {
				console.log("false funct");
				setCount(me.fields.Green_Points);
			}
		})();
	}, []);

	return (
		<Wrapper>
			<MenuWrapper
				href={`/${
					role.parent ? `reviews?student_id=${student_id}` : ""
				}`}
			>
				<NavItem activeAssignment={activeAssignment} />
				<Counters assignmentColor={true}>{totalAssignment}</Counters>
			</MenuWrapper>

			<MenuWrapper
				href={`/profile${
					role.parent ? `?student_id=${student_id}` : ""
				}`}
			>
				<NavProfile activeAvatar={activeAvatar} />
				<Counters assignmentColor={false}>{count}</Counters>
			</MenuWrapper>
		</Wrapper>
	);
};

export default Menu;
