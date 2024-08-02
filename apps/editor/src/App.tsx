import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Redirect, Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { EditorRoutes, TabPaths } from "~/constants/routes";
import { Editor } from "./pages/Editor/Editor";
import { Results } from "./pages/Editor/Results";
import { EditorDemo } from "./pages/EditorDemo/EditorDemo";
import { NotFound } from "./pages/NotFound/NotFound";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";
import { Workspace } from "./pages/Workspace/Workspace";

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
