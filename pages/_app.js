import '@/styles/global.css'; // Import your global CSS file
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Loading from '../components/Loading';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const startLoading = () => setIsLoading(true);
		const endLoading = () => setIsLoading(false);

		router.events.on('routeChangeStart', startLoading);
		router.events.on('routeChangeComplete', endLoading);
		router.events.on('routeChangeError', endLoading);

		return () => {
			router.events.off('routeChangeStart', startLoading);
			router.events.off('routeChangeComplete', endLoading);
			router.events.off('routeChangeError', endLoading);
		};
	}, [router]);

	return (
		<>
			<Head>
				<title>Bitfa</title>
				<meta name="description" content="Bitfa Exam"/>
				<meta name="keywords" content="Bitfa Exam"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="../public/favicon.ico"/>
			</Head>
			{isLoading && <Loading/>}
			<div className="container">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
