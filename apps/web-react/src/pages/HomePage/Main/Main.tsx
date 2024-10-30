import { HeroSection } from "./HeroSection/HeroSection";
import styles from "./Main.module.css";

export const Main = () => {
	return (
		<main className={styles.main}>
			<HeroSection />
		</main>
	);
};
