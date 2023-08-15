/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		staticFolder: "/public",
	},
	productionBrowserSourceMaps: false,
	devIndicators: {
		autoPrerender: false,
	},
};

module.exports = nextConfig;
