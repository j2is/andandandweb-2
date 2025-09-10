import React, { useState, useMemo, useContext } from "react";
import { produce } from "immer";

export default function makeStore() {
	// This is basically a factory for a new store instance
	const loggerActive = false;

	// Create a new context for this store instance
	const context = React.createContext();

	// Make a provider that takes an initial state
	const Provider = ({ children, initialState = {} }) => {
		// useImmer will do
		const [state, setState] = useState(initialState);

		const immerSetState = updater => {
			// if (loggerActive) console.log('STORE UPDATE');
			setState(old => {
				// if (loggerActive) console.log('before:', old);
				// if (loggerActive) console.log('updater:', updater);
				const next = produce(old, updater);
				// if (loggerActive) console.log('after:', next);
				return next;
			});
		};

		// Memoize the context value so it only updates when the state changes
		const contextValue = useMemo(() => [state, immerSetState], [state]);

		// Pass the context down
		return <context.Provider value={contextValue}>{children}</context.Provider>;
	};

	// A hook to consume the context. No need to import `useContext` everywhere. How wasteful...
	const useStore = () => useContext(context);

	// Export them however you like. I prefer a default.
	return {
		Provider,
		useStore
	};
}
