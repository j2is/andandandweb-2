"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const ButtonStyles = styled.section`
 &.primary button{
	border: 1px solid ${props => props.theme.black};
	text-align: center;
	padding: 0rem 2.2rem 0.2rem 2.2rem;
	font-family: ${font.family100};
	font-size: ${font.p};
	width: auto;
	height: 3rem;
	letter-spacing: ${font.pLetterSpacing};
	display: flex;
  align-items: center;
  justify-content: center;
	transition: background 0.15s ease-in-out, color 0.15s ease-in-out;
	${media.smallDesktopAndBelow`
		font-size: ${font.pTablet};
		height: 30px;
		letter-spacing: ${font.pLetterSpacingMobile};
		padding: 0 22px 2px 22px;
	`}
	${media.tabletPortraitAndBelow`
		font-size: ${font.pMobile};
		padding: 0 17px 1px 17px;
	`}
	${media.minDevicePixelRatio2`
		border-width: 0.5px;
	`}
 }

 &.secondary button{
	width: min-content;
	font-family: ${font.family100};
	font-size: ${font.p};
	height: 3rem;
	letter-spacing: ${font.pLetterSpacing};
	transition: color 0.15s ease-in-out;
	${media.smallDesktopAndBelow`
		font-size: ${font.pTablet};
		height: 30px;
		letter-spacing: ${font.pLetterSpacingMobile};
	`}
	${media.tabletPortraitAndBelow`
		font-size: ${font.pMobile};
	`}
 }

 &.secondary button:hover {
	color: ${props => props.theme.grey300};
 }

 &.primary button:hover {
	background: ${props => props.theme.black};
	color: ${props => props.theme.white};
	border-color: ${props => props.theme.black};
 }
`;

export default ButtonStyles;
