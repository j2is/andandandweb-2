"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const HomeStyles = styled.section`
  width: 100%;
	height: 100%;
	min-height: 100dvh;

	.logo {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}
`;

export default HomeStyles;
