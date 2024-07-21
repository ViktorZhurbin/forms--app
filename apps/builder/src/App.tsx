import { Routes } from "@/shared/constants/location";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";
import { Admin } from "./layouts/Admin/Admin";
import { Builder } from "./layouts/Builder/Builder";
import { BuilderDemo } from "./layouts/Builder/BuilderDemo/BuilderDemo";
import { Login } from "./layouts/Login/Login";
import { NotFound } from "./layouts/NotFound/NotFound";
import { Root } from "./layouts/Root/Root";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.LOGIN} component={Login} />
				<Route path={Routes.CREATE} component={BuilderDemo} />

				<AuthRoute path={Routes.ROOT} component={Root} />
				<AuthRoute path={Routes.ADMIN} component={Admin} />
				<AuthRoute path={Routes.FORM} component={Builder} />

				{/* Default route in a switch */}
				<Route component={NotFound} />
			</Switch>
		</ThemeProvider>
	);
};
