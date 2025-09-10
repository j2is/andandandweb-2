"use client";

import React, { useState, Fragment } from "react";
import DropdownStyles from "./Dropdown.styled";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import Icon20px from '../Icon20px';
import { useSearchParams } from 'next/navigation';

export default function Dropdown({ label = 'Select an option', anchor = "bottom", options, defaultValue, disabled = false }) {
	if (!options?.length) {
		console.warn('Dropdown component requires options prop')
		return null;
	}

	if (!label) {
		console.warn('Dropdown component requires label prop')
		return null;
	}

	return (
		<DropdownStyles className="dropdown">
			<Menu as="div">
				{({ open }) => (
					<>
						<MenuButton disabled={disabled}>
							<span className={`${!defaultValue ? 'no-default-value' : ''}`}>{defaultValue || label}</span>
							<Icon20px src={"/images/dropdown.svg"} alt="Dropdown" textClass={`icon ${open ? 'is-open' : ''}`} />
						</MenuButton>
						<MenuItems as="div" className={`menu-items ${anchor}`}>
							{options.map((option, index) => (
								<MenuItem key={index}>
									{({ active }) => (
										<>
											{option.label}
										</>
									)}
								</MenuItem>
							))}
						</MenuItems>
					</>
				)}
			</Menu>
		</DropdownStyles>
	);
}