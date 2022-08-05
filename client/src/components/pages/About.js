import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

const About = () => {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		authContext.loadUser();

		//eslint-disable-next-line
	});
	return (
		<div>
			<h1>About</h1>
		</div>
	);
};

export default About;
