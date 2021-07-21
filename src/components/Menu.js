import API from "../api";
import React from "react";
import styled from "styled-components";

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
	grid-template-columns: repeat(3, 1fr);
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
	const [record, setRecord] = React.useState(null);
	const [count, setCount] = React.useState();
	const [totalAssignment, setTotalAssignment] = React.useState(0);
	const [loading, setLoading] = React.useState("Loading assignment data...");
	const countComms = (comms) => {
		if(comms == 'undefined'){
			return 0;
		}else{
			return comms.length;
		}
	}

	React.useEffect(() => {
		(async function () {
			const {
				content: [me],
			} = await API.get(`/me`);
			let { content: reviews } = await API.get(`/reviews`);

			let reviewsCount = reviews.filter(
				({ fields }) => !fields.Student_Checked && !fields.Is_Reminder
			).length;

			setTotalAssignment(reviewsCount);

			setRecord(me);

			setCount(me.fields.Green_Points);

			console.log(me.fields.Year_Group)

			if (me.fields.Year_Group[0].toString().replace(/\D/g, "") > 9) {
				setCount(me.fields.Commendations.length);
			}
			setLoading(false);
		})();
	}, []);

	return (
		<Wrapper>
			<MenuWrapper href="/">
				<NavItem activeAssignment={activeAssignment} />
				<Counters assignmentColor={true}>{totalAssignment}</Counters>
			</MenuWrapper>
			<MenuWrapper href= {!loading ? `/achievements/${record.id}` : ("/") }>
				<NavItem activeAssignment={activeAvatar} />
			</MenuWrapper>
			<MenuWrapper href="/profile">
				<NavProfile activeAvatar={activeAvatar} />
				<Counters assignmentColor={false}>{count}</Counters>
			</MenuWrapper>
		</Wrapper>
	);
};

export default Menu;
