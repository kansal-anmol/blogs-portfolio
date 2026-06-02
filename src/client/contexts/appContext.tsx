import React, { createContext, useContext } from 'react';
import { Post, Publication, StaticPage } from '../../../lib/types';

type AppContext = {
	publication: Publication;
	post: Post | null;
	page: StaticPage | null;
};

const AppContext = createContext<AppContext | null>(null);

const AppProvider = ({
	children,
	publication,
	post,
	page,
}: {
	children: React.ReactNode;
	publication: Publication;
	post?: Post | null;
	page?: StaticPage | null;
}) => {
	return (
		<AppContext.Provider
			value={{
				publication,
				post: post ?? null,
				page: page ?? null,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('useAppContext must be used within a <AppProvider />');
	}

	return context;
};
export { AppProvider, useAppContext };
