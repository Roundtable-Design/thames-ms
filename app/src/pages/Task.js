import React from "react";
import Menu from "../components/Menu";
import TaskContent from "../components/TaskContent";
import TaskHeader from "../components/TaskHeader";

export default () => {
	return (
		<React.Fragment>
            <TaskHeader    
                subject="Math" 
                week ="Mon"
                date="29th Mar"
                number="20-40"
                time="Minutes"
            />
            <TaskContent content ="here should be some content"/>
            <Menu />
		</React.Fragment>
	);
};