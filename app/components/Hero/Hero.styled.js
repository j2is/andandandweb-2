"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const HeroStyles = styled.section`
  canvas {
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		background: ${props => props.theme.white};
	}
`;

export default HeroStyles;
