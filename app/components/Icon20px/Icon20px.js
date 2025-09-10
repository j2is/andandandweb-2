"use client";

import React, { useState } from "react";
import Icon20pxStyles from "./Icon20px.styled";
import Image from 'next/image';

export default function Icon20px({ src, alt, priority = true, textClass }) {
	return (
		<Icon20pxStyles className={`icon-wrapper ${textClass || ''}`}>
			<Image src={src} alt={alt} fill={true} priority={priority} />
		</Icon20pxStyles>
	);
}
