import { Form } from "@/shared/layouts/Form/Form";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";

export const App = () => {
	return (
		<ThemeProvider>
			<Form />
		</ThemeProvider>
	);
};
