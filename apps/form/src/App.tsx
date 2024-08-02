import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { FormPage } from "./pages/FormPage/FormPage";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path="/form:formNanoId" component={FormPage} />

				{/* Default route in a switch */}
				<Route>404: No such page!</Route>
			</Switch>
		</ThemeProvider>
	);
};
