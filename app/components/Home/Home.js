import React from "react";
import HomeStyles from "./Home.styled";
import FloatingParallaxScroll from '../FloatingParallaxScroll';
import Head from "next/head";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<Head>
				<title>And And And Studio</title>
			</Head>
			<HomeStyles>
				<main>
					<FloatingParallaxScroll />
					<section className="logo">
						<Image src="/images/logo.svg" alt="And And And Studio" width={375} height={29} />
					</section>
				</main>
			</HomeStyles>
		</>
	);
}
