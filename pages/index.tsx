/** @format */

import Head from "next/head";

//Imported Components
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import InComing from "../components/Incoming";
import SortTab from "../components/SortTab";
import Repertuar from "../components/Repertuar";

export default function Home() {
	return (
		<Layout>
			<Slider />
			<InComing />
			<SortTab />
			<Repertuar />
		</Layout>
	);
}
