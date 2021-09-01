import React from "react";
import styled from "styled-components";
import {Grid} from ".";
import {BsPlusCircle} from 'react-icons/bs';

const Wrapper = styled.div`
    position: fixed;

    top: 0;
    
    width: 100vw;
    max-width: 540px;
    height: 74px;

    padding: 8px 8px 0 8px;
    margin: 0 auto;

    background: #FFFFFF;
    border-bottom: 2px solid #AAAAAA;

    z-index: 10;

`;

const Padding = styled.div`
    height: 74px;
    width: 100%;
`;

const Logo2 = styled.img.attrs({
	src: require("../assets/logo.svg"),
})`
	height: 50px;
    width: 80px;
	display: block;
`;

const LogoWrapper = styled.div`
    margin: 0 auto 0 0;
`;

const NavItem = styled.a`
    color: #5CBDE5 !important;
    margin: 0 6px;

    font-size: 15px;
    line-height: 20px;

    &:focus, &:hover, &:link, &:active {
        text-decoration: none;
        color: #CE0F69 !important;
    }
`;


const LogoutWrapper = styled.div`
    height: 100%;
    margin: 0;
`;

const LinkWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;


    ${NavItem}{
        display: flex;
        justify-items: flex-end;
        align-items: center;
    }
`;

const Button = styled.p`
    margin: 0;
    padding: 0;

	appearance: none;
    border: none;
    background: none;
    color: #5CBDE5;

    text-align: center;

    &:focus, &:hover, &:link, &:active {
        text-decoration: none;
        color: #CE0F69;
    }
`;


const TeacherNav = () => {
    const handleSuccess = () => {
		localStorage.clear();
		window.location.href = "/login";
	};
	return (
        <React.Fragment>
            <Wrapper>
                    <LinkWrapper>
                        <LogoWrapper>
                            <NavItem href="/">
                                <Logo2 />
                            </NavItem>
                        </LogoWrapper>
                    
                        <NavItem href="/">
                            Classes
                        </NavItem>

                        <NavItem href="/createAssignment" > 
                            <BsPlusCircle style={{marginRight: "6px"}}/>
                                Create
                        </NavItem>
                
                        <NavItem>
                            <Button onClick={() => 
                            handleSuccess()
                            }>Sign Out</Button>
                        </NavItem>
                    </LinkWrapper>
            </Wrapper>
            <Padding />
        </React.Fragment>

	);
};

export default TeacherNav;
