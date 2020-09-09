/** @format */

import Head from "next/head";

import "../styles/Navbar.scss";

export default function Navbar() {
	return (
		<header className='Navbar'>
			<div className='Navbar-Logo'>
				<img className='Navbar-Logo-Img' src='https://galeriamlociny.pl/app/uploads/wayfinder/url_logo/3261.png' color='black' />
			</div>
			<div className='Navbar-Navigator'>Repertuar</div>
			<div className='Navbar-UserPanel'>
				<div>
					<div>Witaj Dawid</div>
					<div>Logo</div>
				</div>
				<div>Szukaj</div>
			</div>
		</header>
	);
}
