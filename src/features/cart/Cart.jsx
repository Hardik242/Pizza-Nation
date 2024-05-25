import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  function handleClick() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-3">
      <div className="mr-auto">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart,{' '}
        <span className="underline-offset-3 text-2xl font-extrabold underline">
          {username.toUpperCase()}
        </span>
      </h2>

      <ul className="mt-3 flex w-full flex-col divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="ml-auto mt-6 justify-end space-x-2 space-y-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={handleClick}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
