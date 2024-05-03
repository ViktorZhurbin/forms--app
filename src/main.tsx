import { Theme as RadixTheme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RadixTheme>
			<App />
		</RadixTheme>
	</React.StrictMode>,
);
