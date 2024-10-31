import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Page404 } from "@/shared/layouts/Page404/Page404";
import { Route, Switch } from "wouter";
import { HomePage } from "./pages/HomePage/HomePage";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path="/" component={HomePage} />

				{/* Default route in a switch */}
				<Route>
					<Page404 redirectTo="/" />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};
