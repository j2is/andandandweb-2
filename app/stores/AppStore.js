import Store from ".";
// import { v4 as uuidv4 } from "uuid";

const initialState = {
	activeMenuIndex: undefined
};


function useAppStore() {
	const [state, setState] = Store.useStore(initialState);

	const setActiveMenuIndex = (i) =>
		setState((draft) => {
			draft.activeMenuIndex = i;
		});

	return [
		state,
		{
			setActiveMenuIndex
		},
	];
}

export { initialState, useAppStore };
