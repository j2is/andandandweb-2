// ****************************************/
// Animated Underline
// ****************************************/

import { styled, css } from 'styled-components';
import media from './Media';

const underlineAnimated = color => `
	position: relative;
	&:before{
		content: '';
		display: inline-block;
		position: absolute;
		left: 0.7rem;
		bottom: 0.4rem;
		height: 1px;
		width: 0;
		transition: width 0s ease, background .3s ease;
		${media.smallDesktopAndBelow`
			bottom: 6px;
			left: 7px;
		`}
	}
	&:after {
		content: '';
		display: inline-block;
		position: absolute;
		right: 0.7rem;
		bottom: 0.4rem;
		height: 1px;
		width: 0;
		background: ${color};
		transition: width .6s ease;
		${media.smallDesktopAndBelow`
			bottom: 6px;
		`}
	}
	&:hover:before{
		width: calc(100% - 1.4rem);
		background: ${color};
		transition: width .6s ease;
		${media.smallDesktopAndBelow`
			bottom: 6px;
			width: calc(100% - 14px);
		`}
	}
	&:hover:after{
		width: calc(100% - 1.4rem);
		background: transparent;
		transition: all 0s ease;
		${media.smallDesktopAndBelow`
			width: calc(100% - 14px);
		`}
	}
	&.is-active:after{
		width: calc(100% - 1.4rem);
		background: ${color};
		transition: none:
		${media.smallDesktopAndBelow`
			width: calc(100% - 14px);
		`}
	}
`;

export default underlineAnimated;
