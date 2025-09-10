'use client';

// ****************************************/
// Global Styles & Resets
// ****************************************/

import { createGlobalStyle, css } from "styled-components";
import media from "./Media";
import font from "./Font";
import animation from "./Animation";

const styles = css`
  
  *{
		margin: 0;
		padding: 0;
	}


	html{
		box-sizing: border-box;
		-webkit-print-color-adjust: exact;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

	iframe {
		margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
	}

	*, *:before, *:after{
		box-sizing: inherit;
	}

	body,h1,h2,h3,h4,p{
		border: 0;
	}

	body {
		line-height: 1;
	};

	::selection{
		background: ${({ theme }) => theme.selectionHighlightColor};
		color: black;
	}

  button:focus {
    outline: none;
  }

	.small-caps {
		text-transform: uppercase;
		font-size: ${font.smallCaps};
		font-family: ${font.family200};
		line-height: ${font.titleLineHeight};
		${media.smallDesktopAndBelow`
			font-size: ${font.smallCapsMobile};
		`}
	}

  a,
  a:hover {
    cursor: pointer;
  }


	button {
		border: 0;
		background: transparent;
	}

  fieldset {
    border: 0;
  }

	.flexwrap main,
	.flexwrap-item{
		flex: 1;
	}

	.main-wrapper{
		background: white;
		width: 100%;
	}


  span.error {
    font-family: ${font.family200};
    color: ${props => props.theme.error};
    font-size: ${font.p};
    margin-top: 1rem;
    display: block;
    ${media.smallDesktopAndBelow`
      font-size: ${font.pMobile};
      margin-top: 10px;
    `};
  }

	a {
		outline: 0;
		text-decoration: none;
	}

	ul{
		text-decoration: none;
		list-style-type: none;
		padding: 0;
    font-family: ${font.family100};
	}

	.no-select{
		user-select: none;
	}

	button:hover {
		cursor: pointer;
	}

	.disabled{
		pointer-events: none;
	}

  input {
    -webkit-appearance: none;
  };

  input[type="password"]{
    font-family: arial;
    letter-spacing: 0.3rem;
    ${media.smallDesktopAndBelow`
      letter-spacing: 3px;
    `};
  }

  input:-webkit-autofill div {
    padding-left: 0;
  }

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		-webkit-box-shadow: 0 0 0px 1000px ${props => props.theme.grey100} inset;
	}

	body, h1, h2, h3, h4, h5, h6, p, a, li, span, input, label, button, em, figcaption, small{
		text-rendering: optimizelegibility;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		-webkit-font-smoothing: antialiased;
		color: ${props => props.theme.black};
		font-weight: normal;
		font-feature-settings: "kern" 1;
	}


  button[disabled]{
    opacity: 0.2;
    pointer-events: none;
  }

	.is-desktop {
		@media (max-width: 980px) {
			display: none;
		}
	}

	.is-mobile {
		display: none;
		@media (max-width: 980px) {
			display: block;
		}
	}



	`;

const GlobalStyles = createGlobalStyle`
	${styles}
`;

export default GlobalStyles;
