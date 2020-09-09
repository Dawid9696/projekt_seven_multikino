/** @format */

import Head from "next/head";

//Imported Styles
import "../styles/Layout.scss";

//Imported Components
import Navbar from "./Navbar";

export default function Layout({ children }) {
	return (
		<main className='Layout'>
			<Navbar />
			{children}
		</main>
	);
}
