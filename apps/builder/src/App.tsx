import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";
import { Admin } from "./layouts/Admin/Admin";
import { Builder } from "./layouts/Builder/Builder";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path="/" component={Admin} />
				<Route path="/forms/:id" component={Builder} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
};
