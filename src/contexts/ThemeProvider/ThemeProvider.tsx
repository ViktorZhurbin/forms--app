import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<MantineProvider theme={theme} /* defaultColorScheme="auto" */>
			{children}
		</MantineProvider>
	);
};
