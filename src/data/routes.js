import Assignment from "../pages/Assignment";
import Class from "../pages/Class";
import Student from "../pages/Student";

export default [
	{
		path: "/class/:id",
		component: Class,
		roles: ["staff"],
	},
	{
		path: "/assignment/:id",
		component: Assignment,
		roles: ["staff", "parent", "student"],
	},
	{
		path: "/student/:id",
		component: Student,
		roles: ["staff", "parent", "student"],
	},
];
