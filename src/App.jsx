import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./ui/Home'));
const Error = lazy(() => import('./ui/Error'));
const Menu = lazy(() => import('./features/menu/Menu'));
const Cart = lazy(() => import('./features/cart/Cart'));
const Order = lazy(() => import('./features/order/Order'));
const ScrollToTop = lazy(() => import('./utils/ScrollToTop'));

// const Home =lazy(()=>import('./ui/Home'))
// import Error from './ui/Error';
// import Cart from './features/cart/Cart';
// import ScrollToTop from './utils/ScrollToTop';

import { loader as menuLoader } from './features/menu/Menu';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Loader from './ui/Loader';

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}

export default App;
