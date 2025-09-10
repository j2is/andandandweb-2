import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from '@/lib/providers';
import GlobalStyles from '@/components/Styles/GlobalStyles';
import "@/components/Styles/FontFace.css";

export default async function RootLayout({
	children,
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="stylesheet" href="https://webfonts.typotheque.com/WF-046450-012616.css" type="text/css" />
			</head>
			<body>
				<Providers>
					<StyledComponentsRegistry>
						<GlobalStyles />
						{children}
					</StyledComponentsRegistry>
				</Providers>
			</body>
		</html>
	)
}