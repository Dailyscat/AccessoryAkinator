import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";

import { AppSync } from "./appsync.json";
console.log(AppSync);
let appSyncConfig = AppSync.Default;

const client = new AWSAppSyncClient({
  url: appSyncConfig.ApiUrl,
  region: appSyncConfig.Region,
  auth: {
    type: appSyncConfig.AuthMode,
    apiKey: appSyncConfig.ApiKey
  }
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Rehydrated
        render={({ rehydrated }) =>
          rehydrated ? (
            <App />
          ) : (
            <strong>Your custom UI componen here...</strong>
          )
        }
      ></Rehydrated>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
