import { createBreakpoint, createMap } from "styled-components-breakpoint";

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
};

export default {
	gutter: 15,
	breakpoint: createBreakpoint(breakpoints),
	map: createMap(breakpoints),
	color: {
		danger: "#dc3545",
		success: "#28a745",
		secondary: "#6c757d",
		light: "#efefef",
	},
};
