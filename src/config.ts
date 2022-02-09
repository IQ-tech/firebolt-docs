export const SITE = {
	title: 'Firebolt',
	description: 'Your website description.',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
		alt: 'astro logo on a starry expanse of space,' + ' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
	'Português (BR)': 'pt-BR'
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
	en: [
		{ text: 'Documentation', header: true },
		{ text: 'Introduction', link: 'en/introduction' },
		{ text: 'Getting Started', link: 'en/page-2' },
		{ text: 'Tutorial', link: 'en/page-3' },

		{ text: 'Guides', header: true },
		{ text: 'JSON Schema', link: 'en/page-4' },

		{ text: 'Examples', header: true },
		{ text: 'Basics', link: 'en/page-4' },

		{ text: 'API Reference', header: true },
		
	],
	'pt-BR': [
		{ text: 'Documentation', header: true },
		{ text: 'Introduction', link: 'pt-BR/introduction' },
		{ text: 'Getting Started', link: 'pt-BR/page-2' },
		{ text: 'Tutorial', link: 'pt-BR/page-3' },

		{ text: 'Guides', header: true },
		{ text: 'JSON Schema', link: 'pt-BR/page-4' },

		{ text: 'Examples', header: true },
		{ text: 'Basics', link: 'pt-BR/page-4' },

		{ text: 'API Reference', header: true },
		
	],
};
