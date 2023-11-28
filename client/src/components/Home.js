import React, { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		document.title = 'Home';
	}, []);

	return (
		<div className="homepage">
			<div className="homeInfo">
				<p>
					{' '}
					Welcome to 'King of the Grill' a general store demo app. The frontend
					was made from scratch with the use of React and Formik, while the
					backend was made with a combination of python and flask. For more
					information about how the site works, feel free to explore the other
					links, or checkout the Readme.
				</p>
			</div>
			<div className="contactInfo">
				<p className="name">Spencer Eklund</p>
				<p>
					<a
						href="https://www.linkedin.com/in/spencer-eklund/"
						className="linkedin"
					>
						LinkedIn
					</a>
				</p>
				<p>
					<a href="https://github.com/eklspe12" className="github">
						Github
					</a>
				</p>
			</div>
		</div>
	);
};

export default Home;
