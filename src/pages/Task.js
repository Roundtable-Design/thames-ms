import React from "react";
import Menu from "../components/Menu";
import TaskContent from "../components/TaskContent";
import TaskHeader from "../components/TaskHeader";

export default () => {
	return (
		<React.Fragment>
            <TaskHeader    
                subject="Maths" 
                week ="Mon"
                date="29th Mar"
                number="20-40"
                time="Minutes"
            />
            <TaskContent content=""/>
            <Menu />
		</React.Fragment>
	);
};
