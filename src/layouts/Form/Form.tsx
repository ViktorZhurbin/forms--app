import { ModalsProvider } from "@mantine/modals";
import { ThemeProvider } from "~/contexts/ThemeProvider/ThemeProvider";
import { Builder } from "./Builder/Builder";

export const Form = () => {
	return (
		<ThemeProvider>
			<ModalsProvider>
				<Builder />
			</ModalsProvider>
		</ThemeProvider>
	);
};
