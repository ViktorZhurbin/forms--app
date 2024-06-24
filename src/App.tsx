import { ModalsProvider } from "@mantine/modals";
import { Provider } from "tinybase/ui-react";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";
import { Admin } from "./layouts/Admin/Admin";
import { Builder } from "./layouts/Builder/Builder";
import { useStore } from "./mocks/store";

export const App = () => {
	const store = useStore();

	return (
		<ThemeProvider>
			<Provider store={store}>
				<ModalsProvider>
					<Switch>
						<Route path="/" component={Admin} />
						<Route path="/forms/:id" component={Builder} />

						{/* Default route in a switch */}
						<Route>404: No such page!</Route>
					</Switch>
				</ModalsProvider>
			</Provider>
		</ThemeProvider>
	);
};
