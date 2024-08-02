import { EditorRoutes } from "@/shared/constants/editor.routes";
import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { FormPage } from "./pages/Editor/FormPage";
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

				<AuthRoute path={EditorRoutes.FORM} component={FormPage} />

				{/* Default route in a switch */}
				<Route component={NotFound} />
			</Switch>
		</ThemeProvider>
	);
};
