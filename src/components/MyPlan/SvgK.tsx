import * as React from "react";
const SvgComponent = (props: any) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={18}
		height={20}
		fill='none'
		{...props}
	>
		<path
			fill='#fff'
			d='M0 .5h4.737v19H0V.5ZM12.316.5h3.79l-5.685 9.975h1.895l1.42 2.375L18 19.5h-5.684l-5.684-9.025L12.316.5Z'
		/>
	</svg>
);
export default SvgComponent;
