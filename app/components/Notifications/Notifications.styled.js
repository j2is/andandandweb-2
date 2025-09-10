"use client";

import styled from "styled-components";
import { font, media } from "../Styles";
import { motion } from "framer-motion";

const NotificationsStyles = styled(motion.section)`
  position: fixed;
  z-index: 6;
  display: flex;
  width: 100vw;
  height: 100vh;
	height: 100dvh;
  flex-direction: column;
  pointer-events: none;

  ul,
  li {
    padding: 0;
    margin: 0;
  }

  ul {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: center;
    justify-content: flex-end;
		padding-left: ${props => props.theme.sitePadding};
		padding-right: ${props => props.theme.sitePadding};
		padding-bottom: ${props => props.theme.sitePadding};
		${media.smallDesktopAndBelow`
			padding-left: ${props => props.theme.sitePaddingDesktop};
			padding-right: ${props => props.theme.sitePaddingDesktop};
			padding-bottom: ${props => props.theme.sitePaddingDesktop};
		`}
		${media.tabletPortraitAndBelow`
			padding-left: ${props => props.theme.sitePaddingMobile};
			padding-right: ${props => props.theme.sitePaddingMobile};
			padding-bottom: ${props => props.theme.sitePaddingMobile};
		`}
  }

  li {
		display: flex;
		justify-content: space-between;
    width: 100%;
		margin-right: auto;
		max-width: 44rem;
    position: relative;
    pointer-events: auto;
    background: ${props => props.theme.red};
    padding: 1.7rem 2rem 1.2rem
      2rem;
    ${media.smallDesktopAndBelow`
			max-width: 440px;
      padding: 17px 20px 12px 20px;
    `};
    ${media.tabletPortraitAndBelow`
      padding: 16px ${(props) => props.theme.sitePaddingMobile} 16px ${(
	props
) => props.theme.sitePaddingMobile};
    `};
  }

  li {
    transition: border-color 0.25 ease-in-out;
    border-top: 1px solid ${(props) => props.theme.black};
    border-left: 1px solid ${(props) => props.theme.black};
    border-right: 1px solid ${(props) => props.theme.black};
		border-color: ${props => props.theme.red};
    ${media.minDevicePixelRatio2`
      border-width: 0.5px;
    `};
  }

	ul > li.has-error:last-child {
		border-bottom: 1px solid ${(props) => props.theme.error};
		${media.minDevicePixelRatio2`
			border-width: 0.5px;
		`}
	}

	li p {
		position: relative;
		top: -0.3rem;
		width: calc(100% - 3rem);
		${media.smallDesktopAndBelow`
			width: calc(100% - 30px);
			top: -3px;
		`}
	}

	li.has-error {
		background: ${props => props.theme.white};
		border-color: ${props => props.theme.error};
	}

  li.has-error p {
    color: ${(props) => props.theme.error};
  }

	li p {
		color: ${props => props.theme.white};
	}


  .button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    height: 100%;
  }

  li.notification .button .circle {
    top: 50%;
  }
`;

export default NotificationsStyles;
