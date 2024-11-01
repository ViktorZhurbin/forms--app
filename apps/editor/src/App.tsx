import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Page404 } from "@/shared/layouts/Page404/Page404";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { Routes } from "~/constants/routes";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";
import { Workspace } from "./pages/Workspace/Workspace";
import { EditorDemo } from "./pages/form/EditorDemo";
import { Form } from "./pages/form/Form";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.SIGN_IN} component={SignIn} />
				<Route path={Routes.CREATE} component={EditorDemo} />
				<AuthRoute path={Routes.ROOT} component={Root} />
				<AuthRoute path={Routes.WS} component={Workspace} />
				``
				<AuthRoute path={Routes.FORM} component={Form} />
				{/* Default route in a switch */}
				<Route>
					<Page404 redirectTo={Routes.ROOT} />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};
