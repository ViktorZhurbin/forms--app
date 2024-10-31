import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Page404 } from "@/shared/layouts/Page404/Page404";
import { Route, Switch } from "wouter";
import { FormPage } from "./pages/FormPage/FormPage";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path="/form/:formNanoId" component={FormPage} />

				{/* Default route in a switch */}
				<Route>
					<Page404 />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};
