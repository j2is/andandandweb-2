"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const DropdownStyles = styled.section`
	position: relative;
  button, 
  .menu-item {
		font-family: ${font.family100};
		font-size: ${font.p};
		${media.smallDesktopAndBelow`
			font-size: ${font.pTablet};
		`}
		${media.tabletPortraitAndBelow`
			font-size: ${font.pMobile};
		`}
	}

	button {
		position: relative;
		width: 100%;
		text-align: left;
		height: 2.9rem;
		display: flex;
		align-items: center;
		${media.smallDesktopAndBelow`
			height: 29px;
		`}
	}

	button:after {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		display: block;
		content: '';
		background: ${props => props.theme.black};
		${media.minDevicePixelRatio2`
			height: 0.5px;
		`}
	}

	.no-default-value {
		color: ${props => props.theme.grey300};
	}

	.icon {
		position: absolute;
		top: 0.5rem;
		right: 0;
		width: 2rem;
		height: 2rem;
		transition: transform 0.15s ease-in-out;
		${media.smallDesktopAndBelow`
			top: 5px;
			width: 20px;
			height: 20px;
		`}
	}

	.icon.is-open {
		transform: rotate(180deg);
	}

	.menu-items {
		position: absolute;
		top: 2.9rem;
		display: grid;
		padding: 0;
		border: 1px solid ${props => props.theme.black};
		border-top: initial;
		z-index: 2;
		background: ${props => props.theme.white};
		${media.smallDesktopAndBelow`
			top: 29px;
		`}
		${media.minDevicePixelRatio2`
			border-width: 0.5px;
		`}
	}

	.menu-items a {
		display: block;
		padding: 0.9rem 1.2rem;
	}

	.menu-items a:hover {
		background: ${props => props.theme.grey100};
	}
`;

export default DropdownStyles;