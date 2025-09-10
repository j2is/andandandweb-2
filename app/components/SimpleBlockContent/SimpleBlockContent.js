"use client";

import React, { createElement, useState } from "react";
import { PortableText, toPlainText } from '@portabletext/react'
import Link from "next/link";
import toLocale from '@/lib/toLocale';
import useLocale from '@/lib/useLocale';
import Table from '../Table';

const marks = {
	link: ({ children, value }) => {

		const { internalLink, externalLink, link, href, _type, openInNewTab, file } = value;

		if (file && file?.url) {
			return (
				<a href={file.url} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}
		if (_type && _type === "link" && (internalLink?.slug?.current || internalLink?.current) && !openInNewTab) {
			const shouldIncludeSlash = internalLink?.slug?.current?.includes("/");
			const slash = shouldIncludeSlash ? "/" : "";
			return (
				<Link
					href={`${slash}${internalLink?.slug?.current || internalLink?.current}`}
				>
					{children}
				</Link>
			);
		}
		if (_type && _type === "link" && (internalLink?.slug?.current || internalLink?.current) && openInNewTab) {
			return (
				<a href={internalLink?.slug?.current || internalLink?.current} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}
		if (externalLink && openInNewTab) {
			return (
				<a href={externalLink} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}

		if (externalLink) {
			return (
				<a href={externalLink}>{children}</a>
			);
		}

		if (href) {
			return (
				<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
			);
		}

		console.warn(`Missing link serializer for', ${value}, needs expansion in groq`);
		return null;
	},
};


function SimpleBlockContent({ blocks }) {
	const locale = useLocale();

	const localisedBlocks = typeof blocks === 'object' ? toLocale({ blocks, locale }) : blocks;
	if (!localisedBlocks) {
		console.error("Missing blocks");
		return null;
	}

	return (
		<PortableText
			value={localisedBlocks}
			onMissingComponent={(message, options) => {
				console.log(message, {
					// eg `someUnknownType`
					type: options.type,

					// 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
					nodeType: options.nodeType
				})
			}}
			components={{
				types: {
					'module.table': ({ children, value }) => {
						const { table } = value;
						return <Table rows={table?.rows} />;
					},
					blockLocaleString: ({ children, value }) => {
						return <PortableText value={value?.en?.[0]} marks={marks} />;
					},
					link: ({ children, value }) => {
						return null;
					},
				},
				list: {
					bullet: ({ children }) => <ul className="list">{children}</ul>,
					number: ({ children }) => <ol className="list">{children}</ol>,
				},
				marks
			}}
		/>
	);
}

export default SimpleBlockContent;
