const setRole = (role) => {
	if (!window.localStorage)
		throw new Error("Browser doesn't support localStorage.");

	window.localStorage.setItem("ts-role", role);
};

export default () => {
	if (!window.localStorage)
		throw new Error("Browser doesn't support localStorage.");

	const role = localStorage.getItem("ts-role");

	const val = new String(role);
	val.none = !["student", "parent", "staff"].includes(role);
	val.student = role === "student";
	val.parent = role === "parent";
	val.staff = role === "staff";

	console.log({ val });

	return [val, setRole];
};
