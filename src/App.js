import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";

import Assignment from "./pages/Assignment";
import Class from "./pages/Class";
import Container from "react-bootstrap/Container";
import CreateAssignment from "./pages/CreateAssignment";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import React from "react";
import StaffAssignment from "./pages/StaffAssignment";
import Student from "./pages/Student";
import Test from "./pages/Test";
import useRole from "./hooks/useRole";
import Logout from "./pages/Logout";
import Ach from "./pages/Ach"


const App = () => {
	const [role] = useRole();

	return (
		<BrowserRouter>
			<Route path="/test" component={Test} />

			<Route exact path="/" component={role.none ? Login : Dashboard} />
			<Switch>
				{role.student || role.parent ? (
					<Route path="/assignment/:id" component={Assignment} />
				) : (
					""
				)}

				{role.student || role.parent ? (
					<Route path="/profile" component={Profile} />
				) : (
					""
				)}
				{role.staff ? (
					<Route path="/assignment/:id" component={StaffAssignment} />
				) : (
					""
				)}
				{!role.none ? (
					<Route path="/student/:id" component={Student} />
				) : (
					""
				)}

				{role.staff ? (
					<Route path="/class/:id" component={Class} />
				) : (
					""
				)}
				{role.staff ? (
					<Route
						path="/createAssignment"
						component={CreateAssignment}
					/>
				) : (
					""
				)}
				{role.student || role.parent ? (
					<Route path="/signout" component={Logout} />
				) : (
					""
				)}
				{role.staff || role.student ? (
					<Route path="/achievements/:id" component={Ach} />
				) : (
					""
				)}
				<Route path="/login" component={Login} />
				{/* {role.none && <Redirect from="/" to="/login" />} */}
				{/* <Route component={NotFound} /> */}
			</Switch>
			{/* </Container> */}
		</BrowserRouter>
	);
};

export default App;
