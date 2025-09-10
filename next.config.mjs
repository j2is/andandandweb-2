/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	experimental: {
		taint: true,
		viewTransition: true,
	}
};

export default nextConfig;
