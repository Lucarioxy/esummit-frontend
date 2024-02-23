import React, { useState, useEffect } from "react";
import "./header.css";
import { NavLink, Link } from "react-router-dom";
import IG_logo from "../../assets/IG logo.png";

import { useUserAuth } from "../../context/userAuthContext";

const menuItemsData = [
	// { label: "Timeline", link: "/Timeline" },
	{ label: "Events", link: "/Events" },
	// { label: "Sponsors", link: "/Sponsors" },
	{ label: "Speakers", link: "/Speakers" },
	{ label: "Teams", link: "/Teams" },
	{ label: "Register/Login", link: "/Register-Login" },			//index = 5
];

const Header = () => {

	const [menuOpen, setMenuOpen] = useState(false);				//for hamburger menu
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { user, logOut } = useUserAuth();	//for backend integration

	useEffect(()=>{
		if(user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	},[user])
	
	async function handleLogOut() {
		await logOut();
		setIsLoggedIn(false);
	}

	const listItems = menuItemsData.map((menuItem, index) => (
		<li key={index}>
			{index === (menuItemsData.length-1) ? ( 						// Check if the index is 5 for login/logout
				isLoggedIn ? (
					<button
						onClick={() => {
							handleLogOut();
						}}
					>
						Log Out
					</button>
				) : (
					<NavLink to="/Register-Login">Register/Login</NavLink>
				)
			) : (
				// Render regular NavLink for other menu items
				<NavLink to={menuItem.link}>{menuItem.label}</NavLink>
			)}
		</li>
	));

	return (
		<>
			<nav>
				<div className="title">
					<Link to="./">
						<img src={IG_logo} alt="logo1" />
					</Link>
				</div>

				<div
					className="menu"
					onClick={() => {
						setMenuOpen(!menuOpen);
					}}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul className={menuOpen ? "open" : ""}>{listItems}</ul>
			</nav>
		</>
	);
};

export default Header;
