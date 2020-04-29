import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.RAZZLE_API_URL, fetch }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});


hydrate(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
