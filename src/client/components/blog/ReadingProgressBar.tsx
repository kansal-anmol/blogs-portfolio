type ReadingProgressBarProps = {
	progress: number;
};

export const ReadingProgressBar = ({ progress }: ReadingProgressBarProps) => (
	<div
		style={{
			position: 'fixed',
			top: 64,
			left: 0,
			height: '2px',
			width: `${progress * 100}%`,
			backgroundColor: '#b5f542',
			zIndex: 40,
			transition: 'width 0.1s ease-out',
		}}
	/>
);
