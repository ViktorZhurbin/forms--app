import { Route, Switch } from "wouter";
import { Admin } from "./pages/Admin/Admin";
import { Builder } from "./pages/Builder/Builder";
import { Form } from "./pages/Form/Form";

export const App = () => {
	return (
		<Switch>
			<Route path="/" component={Admin} />
			<Route path="/forms/:id/create" component={Builder} />
			<Route path="/forms/:id/preview" component={Form} />

			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	);
};
