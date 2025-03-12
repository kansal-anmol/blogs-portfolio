import React from 'react';

export default class MoonSVG extends React.Component {
	render() {
		return (
            <svg 
            fill="none" 
            viewBox="0 0 20 20" 
            width="20" 
            height="20"
            className={this.props.className} 
          >
            <path 
              stroke="currentColor" 
              d="M2.5 9.54c0 4.396 3.474 7.96 7.76 7.96 3.3 0 6.117-2.112 7.24-5.09a6.729 6.729 0 0 1-2.93.668c-3.809 0-6.897-3.168-6.897-7.075a7.16 7.16 0 0 1 1.448-4.337C5.375 2.232 2.5 5.543 2.5 9.541Z" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.25"
            />
          </svg>
		);
	}
}
