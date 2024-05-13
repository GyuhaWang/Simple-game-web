import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: "GyuHa's Game",
	description: '개발자 왕규하 포트폴리오, 심심해서 만들어봄',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
