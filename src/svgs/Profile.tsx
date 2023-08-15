import * as React from "react";
import { SVGProps } from "react";

const Profile = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='18'
		height='16'
		viewBox='0 0 18 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M13 4C13 6.20914 11.2091 8 9 8C6.79086 8 5 6.20914 5 4C5 1.79086 6.79086 0 9 0C11.2091 0 13 1.79086 13 4Z'
			fill='currentColor'
		/>
		<path
			d='M18 11.5C18 13.9853 13.9706 16 9 16C4.02944 16 0 13.9853 0 11.5C0 9.01472 4.02944 7 9 7C13.9706 7 18 9.01472 18 11.5Z'
			fill='currentCOlor'
		/>
		<path d='M0 11H18V16H0V11Z' fill='currentColor' />
	</svg>
);
export default Profile;
