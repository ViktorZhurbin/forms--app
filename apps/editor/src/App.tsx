import { Routes } from "@/shared/constants/routes";
import { ThemeProvider } from "@/shared/contexts/ThemeProvider/ThemeProvider";
import { Route, Switch } from "wouter";
import { AuthRoute } from "~/components/AuthRoute/AuthRoute";
import { Editor } from "./pages/Editor/Editor";
import { EditorDemo } from "./pages/EditorDemo/EditorDemo";
import { NotFound } from "./pages/NotFound/NotFound";
import { Root } from "./pages/Root/Root";
import { SignIn } from "./pages/SignIn/SignIn";
import { Workspace } from "./pages/Workspace/Workspace";

export const App = () => {
	return (
		<ThemeProvider>
			<Switch>
				<Route path={Routes.SIGN_IN} component={SignIn} />
				<Route path={Routes.CREATE} component={EditorDemo} />

				<AuthRoute path={Routes.ROOT} component={Root} />
				<AuthRoute path={Routes.WS} component={Workspace} />
				<AuthRoute path={Routes.FORM} component={Editor} />

				{/* Default route in a switch */}
				<Route component={NotFound} />
			</Switch>
		</ThemeProvider>
	);
};
