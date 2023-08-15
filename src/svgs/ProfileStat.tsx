import * as React from "react";
import { SVGProps } from "react";

const Profile = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='30'
		height='27'
		viewBox='0 0 30 27'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M21.6667 6.75C21.6667 10.4779 18.6819 13.5 15 13.5C11.3181 13.5 8.33333 10.4779 8.33333 6.75C8.33333 3.02208 11.3181 0 15 0C18.6819 0 21.6667 3.02208 21.6667 6.75Z'
			fill='#240F6E'
		/>
		<path
			d='M30 19.4062C30 23.6002 23.2843 27 15 27C6.71573 27 0 23.6002 0 19.4062C0 15.2123 6.71573 11.8125 15 11.8125C23.2843 11.8125 30 15.2123 30 19.4062Z'
			fill='#240F6E'
		/>
		<path d='M0 18.5625H30V27H0V18.5625Z' fill='#240F6E' />
	</svg>
);
export default Profile;
