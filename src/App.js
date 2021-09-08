import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";

import Assignment from "./pages/Assignment";
import Assignments from "./pages/sections/Assignments";
import Class from "./pages/Class";
import Container from "react-bootstrap/Container";
import CreateAssignment from "./pages/CreateAssignment";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import React from "react";
import StaffAssignment from "./pages/StaffAssignment";
import Student from "./pages/Student";
import Test from "./pages/Test";
import useRole from "./hooks/useRole";

const App = () => {
	const [role] = useRole();

	return (
		<BrowserRouter>
			<Route path="/test" component={Test} />

			<Route exact path="/" component={role.none ? Login : Dashboard} />
			<Switch>
				{role.parent && (
					<Route path="/reviews" component={Assignments} />
				)}

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
				<Route path="/login" component={Login} />
				{/* {role.none && <Redirect from="/" to="/login" />} */}
				{/* <Route component={NotFound} /> */}
			</Switch>
			{role.staff && (<Footer />)}
			
		</BrowserRouter>
	);
};

export default App;
