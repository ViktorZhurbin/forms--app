import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider";

export const App = () => {
	return (
		<ThemeProvider>
			<div>App</div>
		</ThemeProvider>
	);
};
