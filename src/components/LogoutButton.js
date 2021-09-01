import React from "react";
import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
	width: 100%;
    height: auto;
	margin: 0 auto;
    padding: 30px 0;

    background: #E6EEE1;
    text-align: center;

`;

const Button = styled.button`
	width: 100%;
    max-width: 315px;
	height: 62px;

    padding: 18px 23px;
    margin: 0;

	appearance: none;
	border: 3px solid #CE0F69;
    border-radius: 3px;
    text-align: center;


	background: #FFFFFF;
    color: #002E5D;

    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;

`;

const LogoutButton = ({ ...props }) => {
    
	return (
		<Wrapper {...props}>
            <Button onClick={() => 
                window.location.href = "/signout"
				}>Sign Out</Button>
            
		</Wrapper>
	);
};

export default LogoutButton;