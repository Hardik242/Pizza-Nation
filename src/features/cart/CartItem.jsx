import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import UpdateItemQuantity from '../../ui/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="mr-auto flex flex-wrap items-center justify-between py-3 sm:mr-0 sm:max-w-full">
      <p className="mb-1 min-w-[50%] sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-5 sm:gap-6">
        <UpdateItemQuantity id={pizzaId} />
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
