import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "node-fetch";
import { getDataFromTree } from "@apollo/react-ssr";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get("/*", async (req, res) => {
        const client = new ApolloClient({
            link: new HttpLink({
                uri:
                    process.env.NODE_ENV === "development"
                        ? process.env.RAZZLE_API_URL
                        : process.env.RAZZLE_API_HOST,
                fetch,
            }),
            cache: new InMemoryCache(),
            ssrMode: true,
        });
        await getDataFromTree(
            <ApolloProvider client={client}>
                <StaticRouter context={context} location={req.url}>
                    <App />
                </StaticRouter>
            </ApolloProvider>
        );

        const context = {};
        const markup = renderToString(
            <ApolloProvider client={client}>
                <StaticRouter context={context} location={req.url}>
                    <App />
                </StaticRouter>
            </ApolloProvider>
        );

        if (context.url) {
            res.redirect(context.url);
        } else {
            res.status(200).send(
                `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Todo application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ""
        }
        ${
            process.env.NODE_ENV === "production"
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
            window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())};
        </script>
    </body>
</html>`
            );
        }
    });

export default server;
