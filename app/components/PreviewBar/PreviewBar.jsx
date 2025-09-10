"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PreviewBarStyles from './PreviewBar.styled'

export default function PreviewBar() {
	const path = usePathname();

	return (
		<PreviewBarStyles>
			<div className="container">
				<div className="flex-wrapper">
					<div className="content">
						<p className="preview-text">
							You are currently viewing the website in preview mode.
						</p>

						<Link
							className="exit-link"
							href={`/api/disable-draft?slug=${path}`}
							prefetch={false}
						>
							Click here to exit
						</Link>
					</div>
				</div>
			</div>
		</PreviewBarStyles>
	);
};
