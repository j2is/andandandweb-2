"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const IconStyles = styled.section`
	position: relative;
  width: 2rem;
	height: 2rem;
	${media.smallDesktopAndBelow`
		width: 20px;
		height: 20px;
	`}
`;

export default IconStyles;
