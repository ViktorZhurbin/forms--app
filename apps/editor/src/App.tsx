import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Redirect, Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { EditorRoutes, TabPaths } from "~/constants/routes";
import { NotFound } from "./pages/NotFound/NotFound";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";
import { Workspace } from "./pages/Workspace/Workspace";
import { Editor } from "./pages/form/Editor";
import { EditorDemo } from "./pages/form/EditorDemo";
import { Results } from "./pages/form/Results";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={EditorRoutes.SIGN_IN} component={SignIn} />
				<Route path={EditorRoutes.CREATE} component={EditorDemo} />

				<AuthRoute path={EditorRoutes.ROOT} component={Root} />
				<AuthRoute path={EditorRoutes.WS} component={Workspace} />

				<AuthRoute path={EditorRoutes.FORM} nest>
					<AuthRoute path={TabPaths.Create} component={Editor} />
					<AuthRoute path={TabPaths.Results} component={Results} />

					{/* Default route */}
					<Redirect to={TabPaths.Create} />
				</AuthRoute>

				{/* Default route in a switch */}
				<Route component={NotFound} />
			</Switch>
		</ThemeProvider>
	);
};
