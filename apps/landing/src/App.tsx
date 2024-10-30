import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { HomePage } from "./pages/HomePage/HomePage";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path="/" component={HomePage} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
};
