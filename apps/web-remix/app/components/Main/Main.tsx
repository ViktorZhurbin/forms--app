import { Grid } from "@mantine/core";
import { HeroSection } from "./HeroSection/HeroSection";
import styles from "./Main.module.css";

export const Main = () => {
	return (
		<Grid justify="center" className={styles.main}>
			<Grid.Col span={12}>
				<HeroSection />
			</Grid.Col>
		</Grid>
	);
};
