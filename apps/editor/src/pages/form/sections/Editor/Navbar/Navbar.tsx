import styles from "./Navbar.module.css";
import { NavbarFields } from "./NavbarFields/NavbarFields";
import { NavbarThankYou } from "./NavbarThankYou/NavbarThankYou";

export const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<NavbarFields />
			<NavbarThankYou />
		</div>
	);
};
