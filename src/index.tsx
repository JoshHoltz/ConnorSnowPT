// src/index.tsx
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AdminApp } from "./AdminApp";
import { ClientApp } from "./ClientApp";
import { PostHogProvider } from "posthog-js/react";

const pathname = window.location.pathname;

let RenderApp = App;

if (pathname.startsWith("/admin")) {
  RenderApp = AdminApp;
} else if (pathname.startsWith("/client")) {
  RenderApp = ClientApp;
}

const options = {
  api_host: 'https://eu.i.posthog.com',
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={'phc_NuDmT8JTMJYJcd3N1u3zgoVeiL05Wklt28nW8rVzhwk'}
      options={options}
    >
      <RenderApp />
    </PostHogProvider>
  </React.StrictMode>
);
