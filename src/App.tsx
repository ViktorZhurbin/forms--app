import { Route, Switch } from "wouter";
import { Admin } from "./layouts/Admin/Admin";
import { Form } from "./layouts/Form/Form";

export const App = () => {
	return (
		<Switch>
			<Route path="/" component={Admin} />
			<Route path="/forms/:id" component={Form} />

			{/* Default route in a switch */}
			<Route>404: No such page!</Route>
		</Switch>
	);
};
