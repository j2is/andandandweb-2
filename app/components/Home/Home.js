import React from "react";
import HomeStyles from "./Home.styled";
import FloatingParallaxScroll from '../FloatingParallaxScroll';
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>And And And Studio</title>
			</Head>
			<HomeStyles>
				<main>
					<FloatingParallaxScroll />
				</main>
			</HomeStyles>
		</>
	);
}
