import { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/index.css';
import { DarkModeProvider } from '@/components/contexts/darkModeContext';
import { Lora, JetBrains_Mono } from 'next/font/google';

const lora = Lora({
	subsets: ['latin'],
	variable: '--font-lora',
	display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		(window as any).adjustIframeSize = (id: string, newHeight: string) => {
			const i = document.getElementById(id);
			if (!i) return;
			// eslint-disable-next-line radix
			i.style.height = `${parseInt(newHeight)}px`;
		};
	}, []);

	return (
		<DarkModeProvider>
			<div className={`${lora.variable} ${jetbrainsMono.variable} font-sans`}>
				<Component {...pageProps} />
			</div>
		</DarkModeProvider>
	);
}
