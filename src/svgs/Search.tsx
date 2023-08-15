import * as React from "react";
import { SVGProps } from "react";

const Search = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='17'
		height='23'
		viewBox='0 0 17 23'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M6.22236 13.3361L2 22M15 8.32204C15 11.8136 12.0899 14.6441 8.5 14.6441C4.91015 14.6441 2 11.8136 2 8.32204C2 4.83048 4.91015 2 8.5 2C12.0899 2 15 4.83048 15 8.32204Z'
			stroke='currentColor'
			strokeWidth='4'
		/>
	</svg>
);
export default Search;
