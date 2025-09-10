"use client";

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const MyModuleStyles = styled.section`
  ${media.smallDesktopAndBelow`
	`}
  ${media.mobileOnly`
	`}
`;

export default MyModuleStyles;
