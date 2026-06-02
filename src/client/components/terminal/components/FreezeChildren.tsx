import React, { Component } from 'react';

interface FreezeChildrenProps {
	children: React.ReactNode;
}

export class FreezeChildren extends Component<FreezeChildrenProps> {
	shouldComponentUpdate() {
		// Stop React from ever re-rendering this subtree after the initial mount.
		return false;
	}

	render() {
		return <>{this.props.children}</>;
	}
}
