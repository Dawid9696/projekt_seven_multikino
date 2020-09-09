/** @format */

import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const apolloClient = useApollo(pageProps.initialApolloState);

	const theme = {
		colors: {
			primary: "#0070f3",
		},
	};

	return (
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</Provider>
	);
}
