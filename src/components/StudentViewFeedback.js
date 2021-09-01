import React from "react";
import styled, {keyframes} from "styled-components";
import {ProfileSectionTitle, ProfileSectionContent} from "../components/Text"
import Rating from "@material-ui/lab/Rating";


const Wrapper = styled.div`
	width: 100%;
    height: auto;
	margin: 0 auto;
    padding: 19px 30px 115px 30px;

    background: #E6EEE1;    
`;

const FeedbackWrapper = styled.div`
    margin: 0;

    ${ProfileSectionTitle}{
        margin-bottom: 3px;
    }

    ${({ pending }) =>
		pending &&
		`
            display: none;
    `}
`;

const TaskStatus = styled.h6`
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;

    color: #002E5D;
    margin: 0;
    padding: 0;

    ${({ handed }) =>
		handed &&
		`
        color: #EAAA00;  
    `}

    ${({ resubmit }) =>
		resubmit &&
		`
        color: #CE0F69; 
    `}

    ${({ pending }) =>
		pending &&
		`
            color: #5CBDE5;
    `}
`;

const StatusWrapper = styled.div`
    margin: 0;
    margin-top: 19px;
    display: grid;
    grid-template-columns: 84px auto;
    row-gap: 0;
    column-gap: 10px;
    justify-items: flex-end;

    ${ProfileSectionTitle}{
        justify-self: flex-start;
    }

    ${({ pending }) =>
		pending &&
		`
        display: none;
    `}
`;


const StudentViewFeedback = ({pending, content, status, effort, handed, resubmit, ...props }) => {
	return (
		<Wrapper {...props}>
            <FeedbackWrapper pending={pending}>
                <ProfileSectionTitle>Feedback</ProfileSectionTitle>
                <ProfileSectionContent>
                    {content}
                </ProfileSectionContent>
            </FeedbackWrapper>
            <StatusWrapper>
                <ProfileSectionTitle>Task status:</ProfileSectionTitle>
                <TaskStatus pending={pending} resubmit={resubmit} handed={handed}>{status}</TaskStatus>
            </StatusWrapper>
            <StatusWrapper pending={pending}>
                <ProfileSectionTitle>Effort</ProfileSectionTitle>
                <Rating
					value={effort}
					defaultValue={0}
				/>
            </StatusWrapper>
            
		</Wrapper>
	);
};

export default StudentViewFeedback;