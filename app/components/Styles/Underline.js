// ****************************************/
// Underline
// ****************************************/

import { styled, css } from 'styled-components';
import media from './Media';

// https://eager.io/blog/smarter-link-underlines/

const textShadowToCropUnderline = color => `
	text-shadow: .03em 0 ${color}, -.03em 0 ${color}, 0 .03em ${color}, 0 -.03em ${color}, .06em 0 ${color}, -.06em 0 ${color}, .09em 0 ${color}, -.09em 0 ${color}, .12em 0 ${color}, -.12em 0 ${color}, .15em 0 ${color}, -.15em 0 ${color}
`;

const underline = (backgroundColor, color) => `
	color: ${color};
	text-decoration: none;
	${textShadowToCropUnderline(backgroundColor)};
	background-image: linear-gradient(${backgroundColor}, ${backgroundColor}), linear-gradient(${backgroundColor}, ${backgroundColor}), linear-gradient(${color}, ${color});
	background-size: .05em 1px, .05em 1px, 1px 1px;
	background-repeat: no-repeat, no-repeat, repeat-x;
	background-position: 0% 95%, 100% 95%, 0% 95%;
	${media.tabletPortraitAndBelow`
		background-position: 0% 95%, 100% 95%, 0% 95%;
	`}
	&::selection{
		@include textShadowToCropUnderline(${props => props.theme.selectionColor});
		background: ${props => props.theme.selectionColor};
	}
	&:before, &:after, *, *:before, *:after{
		text-shadow: none;
	}
	&:visited{
		color: ${color};
	}
`;

export default underline;
