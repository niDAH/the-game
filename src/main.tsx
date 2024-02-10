import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from './app/store';

import { routesAsRouterArray } from './routes';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
const router = createBrowserRouter(routesAsRouterArray());

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
