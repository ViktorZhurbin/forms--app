import { Route, Switch } from "wouter";
import { Admin } from "./pages/Admin/Admin";
import { Builder } from "./pages/Builder/Builder";
import { FormPreview } from "./pages/FormPreview/FormPreview";

export const App = () => {
	return (
		<Switch>
			<Route path="/" component={Admin} />
			<Route path="/forms/:id/create" component={Builder} />
			<Route path="/forms/:id/preview" component={FormPreview} />

			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	);
};
