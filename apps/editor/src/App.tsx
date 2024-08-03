import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { Routes } from "~/constants/routes";
import { NotFound } from "./pages/NotFound/NotFound";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";
import { Workspace } from "./pages/Workspace/Workspace";
import { EditorDemo } from "./pages/form/EditorDemo";
import { EditorSections } from "./pages/form/EditorSections";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.SIGN_IN} component={SignIn} />
				<Route path={Routes.CREATE} component={EditorDemo} />

				<AuthRoute path={Routes.ROOT} component={Root} />
				<AuthRoute path={Routes.WS} component={Workspace} />

				<AuthRoute path={Routes.FORM} component={EditorSections} />

				{/* Default route in a switch */}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};
