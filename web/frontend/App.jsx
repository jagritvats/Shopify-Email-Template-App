import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import { QueryProvider, PolarisProvider, Navbar } from './components';

export default function App() {
	// Any .tsx or .jsx files in /pages will become a route
	// See documentation for <Routes /> for more info
	const pages = import.meta.globEager(
		'./pages/**/!(*.test.[jt]sx)*.([jt]sx)'
	);

	return (
		<PolarisProvider>
			<BrowserRouter>
				<QueryProvider>
					<Navbar />
					<Routes pages={pages} />
				</QueryProvider>
			</BrowserRouter>
		</PolarisProvider>
	);
}
