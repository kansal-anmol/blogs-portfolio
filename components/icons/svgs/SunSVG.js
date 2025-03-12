import React from 'react';

export default class SunSVG extends React.Component {
	render() {
		return (
			<svg className={this.props.className} fill="none" viewBox="0 0 20 20" width="20" height="20">
				<path
					stroke="currentColor"
					d="M10 16.666v1.667m0-16.666v1.666M16.667 10h1.666M1.667 10h1.666M15 15l1.25 1.25M3.75 3.75 5 5m10 0 1.25-1.25m-12.5 12.5L5 15m9.167-5a4.167 4.167 0 1 1-8.334 0 4.167 4.167 0 0 1 8.334 0Z"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.25"
				/>
			</svg>
		);
	}
}