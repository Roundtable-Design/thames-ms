import React from "react";
import styled from "styled-components";
import {LogoutTitle} from "../components/Text";
import { GoogleLogout } from 'react-google-login'



const HeaderWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
	height: 100vh;
    padding: 0;
    margin: 0;
	text-align: center;

    background: #E3E3DD;

	display: flex; 
    flex-direction: column;
	align-items: center;
	justify-content: center;

    ${LogoutTitle}{
        margin: 0 60px;
        margin-bottom: 40px;
    }
`;

const ButtonsWrapper = styled.div`
    padding: 0;
    margin: 0 71px;

    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    justify-items: center;

    ${LogoutTitle}{
        margin-bottom: 0;
    }
    
`;

export default () => {

    const handleSuccess = () => {
		localStorage.clear();
		window.location.href = "/login";
	};

	return (
        <HeaderWrapper>
            <LogoutTitle>Are you sure you want to sign out?</LogoutTitle>
            
            <ButtonsWrapper>
                <LogoutTitle onClick={() => 
                    window.location.href = "/profile"
				    }>No</LogoutTitle>
                {/* <GoogleLogout
                    clientId="218807385555-cnlc8e780kouun416qag1fe5r0uenioq.apps.googleusercontent.com"
                    buttonText="Sign out"
                    onLogoutSuccess={handleSuccess}
                    // style={{}}
                    // disabledStyle
                > */}
                <LogoutTitle onClick={() => 
                    handleSuccess()
				    }>Yes</LogoutTitle>
                {/* </GoogleLogout> */}
            </ButtonsWrapper>
        </HeaderWrapper>
	);
};


