import React, { useCallback } from "react";
import ButtonStyles from "./Button.styled";
import { Button as HeadlessButton } from '@headlessui/react'

export default function Button({ type = "button", children, onClick, onPointerEnter, textClass, isPrimary, disabled = false }) {
	const onButtonClick = useCallback((e) => {
		if (onClick) {
			onClick(e);
		}
	}, [onClick]);

	const onButtonHover = useCallback((e) => {
		if (onPointerEnter) {
			onPointerEnter(e);
		}
	}, [onPointerEnter]);

	return (
		<ButtonStyles className={`button ${textClass || ''} ${isPrimary ? 'is-primary' : ''}`} onPointerEnter={onButtonHover}>
			<HeadlessButton onClick={(e) => onButtonClick(e)} type={type} disabled={disabled}>
				{children}
			</HeadlessButton>
		</ButtonStyles>
	);
}
