import { Link } from '@shopify/polaris';
import React from 'react';
import './Navbar.css';
export function Navbar() {
	const queryParams = new URLSearchParams(window.location.search);
	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link url={'/?' + queryParams.toString()}>Home</Link>
				</li>
				<li>
					<Link url={'/template?' + queryParams.toString()}>
						Template Editor
					</Link>
				</li>
				<li>
					<Link url={'/templates?' + queryParams.toString()}>
						Templates
					</Link>
				</li>
			</ul>
		</nav>
	);
}
