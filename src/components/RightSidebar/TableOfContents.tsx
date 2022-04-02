import { useState, useEffect, useRef } from 'react';

const TableOfContents = ({ headers = [] }) => {
	const itemOffsets = useRef([]);
	const [activeId, setActiveId] = useState<string>();

	useEffect(() => {
		const getItemOffsets = () => {
			const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
			itemOffsets.current = Array.from(titles).map((title) => ({
				id: title.id,
				topOffset: title.getBoundingClientRect().top + window.scrollY,
			}));
		};

		getItemOffsets();
		window.addEventListener('resize', getItemOffsets);

		return () => {
			window.removeEventListener('resize', getItemOffsets);
		};
	}, []);

	return (
		<div>
			<h2 className="heading">On this page</h2>
			<ul>
				<li className={`header-link depth-2 ${activeId === 'overview' ? 'active' : ''}`.trim()}>
					<a href="#overview">Overview</a>
				</li>
				{headers
					.filter(({ depth }) => depth > 1 && depth < 4)
					.map((header) => (
						<li key={`${header.slug}-item`} className={`header-link depth-${header.depth} ${activeId === header.slug ? 'active' : ''}`.trim()}>
							<a href={`#${header.slug}`}>{header.text}</a>
						</li>
					))}
			</ul>
			</div>
	);
};

export default TableOfContents;
