import { Routes } from "@/shared/constants/routes";
import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { Admin } from "./pages/Admin/Admin";
import { Builder } from "./pages/Builder/Builder";
import { BuilderDemo } from "./pages/BuilderDemo/BuilderDemo";
import { NotFound } from "./pages/NotFound/NotFound";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.SIGN_IN} component={SignIn} />
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
