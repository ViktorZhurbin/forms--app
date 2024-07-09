import { Routes } from "@/shared/constants/location";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";
import { FormPage } from "./pages/FormPage/FormPage";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.FORM} component={FormPage} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
};
