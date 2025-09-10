'use client';

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../components/Styles";
import Store from "../stores";
import { initialState as appStore } from "../stores/AppStore";

// Build initial state
const initialState = {
	...appStore,
};

const ThemeWrapper = (props) => (
	<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export function Providers({ children }) {
	return (
		<ThemeWrapper>
			<Store.Provider initialState={initialState}>
				{children}
			</Store.Provider>
		</ThemeWrapper>
	);
}