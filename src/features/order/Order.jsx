// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../cart/cartSlice';

function Order() {
  const order = useLoaderData();
  const [text, setText] = useState('Click to Copy');

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status) dispatch(clearCart());
  }, []);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="relative text-xl font-semibold">
          Order{' '}
          <CopyToClipboard text={id}>
            <span
              className="underline hover:cursor-pointer hover:font-extrabold hover:text-black"
              onClick={() => setText('Copied ✔️')}
            >
              #{id}
            </span>
          </CopyToClipboard>{' '}
          <span className="absolute left-1/2 top-full -translate-x-[55%] rounded-lg bg-teal-300 px-1 py-0.5 text-xs text-stone-900 opacity-0 sm:opacity-100">
            {text}
          </span>
          status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-teal-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-teal-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza:{' '}
          <span className="font-extrabold text-stone-800">
            {formatCurrency(orderPrice * 10)}
          </span>
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority:{' '}
            <span className="font-extrabold text-stone-800">
              {' '}
              {formatCurrency(70)}
            </span>
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice * 10 + 70)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
