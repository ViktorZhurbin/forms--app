import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import styles from "./HomePage.module.css";
import { Main } from "./Main/Main";

export const HomePage = () => {
	return (
		<div className={styles.home}>
			<Header />
			<Main />
			<Footer />
		</div>
	);
};
