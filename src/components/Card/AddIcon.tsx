import * as React from "react";
const SvgComponent = (
	props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={21} height={35} {...props}>
		<path
			d='M2 2.002h34v41.999a5.997 5.997 0 0 1-6.001 5.998H2zm0 0'
			style={{
				fill: "none",
				strokeWidth: 4,
				strokeLinecap: "butt",
				strokeLinejoin: "miter",
				stroke: "#000",
				strokeOpacity: 1,
				strokeMiterlimit: 4,
			}}
			transform='matrix(.55263 0 0 .51704 0 .438)'
		/>
		<path
			d='m7.043 32.496-.387-.937H5.391l-.387.937h-.371l1.234-2.969H6.2l1.227 2.97zm-.5-1.242-.367-.934c-.016-.039-.028-.078-.043-.117-.016-.058-.04-.117-.059-.172a1.572 1.572 0 0 0-.05-.144c-.012.054-.028.11-.047.164-.012.054-.032.105-.043.152-.02.047-.032.086-.047.117l-.371.934zm4.535-.262c0 .332-.066.606-.195.832a1.23 1.23 0 0 1-.567.504c-.242.113-.539.168-.89.168H8.57v-2.953h.953c.32 0 .594.055.829.164.23.11.41.273.535.488.125.211.191.477.191.797zm-.39.008c0-.262-.043-.48-.141-.656a.877.877 0 0 0-.414-.383 1.564 1.564 0 0 0-.668-.125h-.527v2.363h.445c.437 0 .762-.101.976-.3.223-.2.329-.5.329-.899zm4.304-.008c0 .332-.066.606-.195.832a1.22 1.22 0 0 1-.563.504c-.246.113-.543.168-.89.168h-.856v-2.953h.95c.32 0 .597.055.828.164.234.11.41.273.535.488.129.211.191.477.191.797zm-.387.008c0-.262-.046-.48-.144-.656a.869.869 0 0 0-.41-.383 1.564 1.564 0 0 0-.668-.125h-.528v2.363h.446c.433 0 .758-.101.976-.3.22-.2.328-.5.328-.899zm0 0'
			style={{
				stroke: "none",
				fillRule: "nonzero",
				fill: "#000",
				fillOpacity: 1,
			}}
		/>
		<path
			d='M10.934 12.625h4.449v1.371h-4.45v4.285H9.458v-4.285H5.012v-1.371H9.46v-4.3h1.476zm0 0'
			style={{
				stroke: "none",
				fillRule: "nonzero",
				fill: "#1e0576",
				fillOpacity: 1,
			}}
		/>
	</svg>
);
export default SvgComponent;
