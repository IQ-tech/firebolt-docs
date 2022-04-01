import react from '@astrojs/react';
// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference


// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	integrations: [
    react(),
	],

	dist: "dist/firebolt-docs/"
});
