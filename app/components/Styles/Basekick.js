// ****************************************/
// Basekick Typography Utilities
// ****************************************/

import { css } from 'styled-components';
import media from './Media';

// Calculate type offset based on line height, font size and descender height scale
const calculateTypeOffset = (lineHeight, fontSize, descenderHeightScale) => {
	const lineHeightScale = lineHeight / fontSize;
	return ((lineHeightScale - 1) / 2) + descenderHeightScale;
};

/**
 * Basekick function for precise typography vertical rhythm control
 * 
 * @param {number} typeSizeModifier - Multiplier for the base font size (e.g., 2 for twice the base size)
 * @param {number} baseFontSize - The base font size in px (default: 16)
 * @param {number} descenderHeightScale - The font's descender height as a ratio (e.g., 0.11 for Lato)
 * @param {number} typeRowSpan - Number of grid rows this text should span
 * @param {number} gridRowHeight - The height of a single grid row in px (default: 4)
 * @param {number} capHeight - The font's cap height as a ratio (e.g., 0.75 for Lato)
 * @returns {string} The CSS styles
 */
const basekick = (typeSizeModifier, baseFontSize = 10, descenderHeightScale = 0.11, typeRowSpan = 6, gridRowHeight = 4, capHeight = 0.75, units = 'px') => {
	// Calculate the actual font size in pixels
	const fontSize = typeSizeModifier * baseFontSize;

	// Calculate the line height based on grid
	const lineHeight = typeRowSpan * gridRowHeight;

	// Calculate the vertical offset to align text to the baseline grid
	const typeOffset = calculateTypeOffset(lineHeight, fontSize, descenderHeightScale);

	// Calculate the space above the cap height
	const topSpace = lineHeight - capHeight * fontSize;

	// Handle cases where there's too much top space
	let heightCorrection = 0;
	if (topSpace > gridRowHeight) {
		heightCorrection = topSpace - (topSpace % gridRowHeight);
	}

	// Ensure no collapsing margins
	const preventCollapse = 1;

	return css`
    font-size: ${fontSize}${units};
    line-height: ${lineHeight}${units};
    transform: translateY(${typeOffset}em);
    padding-top: ${preventCollapse}${units};
    
    &::before {
      content: "";
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};

// Preset for editorial h1 (large headings)
basekick.editorialH1 = () => {
	// For large headings like h1 in editorial content
	// typeSizeModifier: 4 (4x base size)
	// baseFontSize: 16 (standard base)
	// descenderHeightScale: 0.11 (for fonts like Lato)
	// typeRowSpan: 8 (spans 8 grid rows)
	// gridRowHeight: 4 (4px grid)
	// capHeight: 0.75 (for fonts like Lato)
	return css`
    ${basekick(4, 16, 0.11, 8, 4, 0.75)}
    
    ${media.smallDesktopAndBelow`
      ${basekick(3.5, 16, 0.11, 7, 4, 0.75)}
    `}
    
    ${media.tabletPortraitAndBelow`
      ${basekick(2.5, 16, 0.11, 6, 4, 0.75)}
    `}
  `;
};

// Preset for editorial h2 (medium headings)
basekick.editorialH2 = () => {
	// For medium headings like h2 in editorial content
	// typeSizeModifier: 2 (2x base size)
	// baseFontSize: 16 (standard base)
	// descenderHeightScale: 0.11 (for fonts like Lato)
	// typeRowSpan: 6 (spans 6 grid rows)
	// gridRowHeight: 4 (4px grid)
	// capHeight: 0.75 (for fonts like Lato)
	return css`
    ${basekick(2, 16, 0.11, 6, 4, 0.75)}
    
    ${media.smallDesktopAndBelow`
      ${basekick(1.75, 16, 0.11, 5, 4, 0.75)}
    `}
    
    ${media.tabletPortraitAndBelow`
      ${basekick(1.5, 16, 0.11, 4, 4, 0.75)}
    `}
  `;
};

// Basekick helper that accepts rem values instead of modifiers
basekick.fromRem = (remValue, descenderHeightScale = 0.11, gridRowHeight = 4, capHeight = 0.75) => {
	// Convert rem to px (assuming 1rem = 16px)
	const fontSize = parseFloat(remValue) * 16;

	// Calculate appropriate line height based on font size
	const typeRowSpan = Math.round(fontSize / gridRowHeight) + 1;

	// Calculate size modifier
	const typeSizeModifier = fontSize / 16;

	return basekick(typeSizeModifier, 16, descenderHeightScale, typeRowSpan, gridRowHeight, capHeight);
};

// Custom implementation for your specific typography system
basekick.custom = (options = {}) => {
	const defaults = {
		typeSizeModifier: 1,
		baseFontSize: 10,
		descenderHeightScale: 0.11,
		typeRowSpan: 6,
		gridRowHeight: 4,
		capHeight: 0.75
	};

	const config = { ...defaults, ...options };

	return basekick(
		config.typeSizeModifier,
		config.baseFontSize,
		config.descenderHeightScale,
		config.typeRowSpan,
		config.gridRowHeight,
		config.capHeight
	);
};

export default basekick;