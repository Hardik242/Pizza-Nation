import { useDispatch, useSelector } from 'react-redux';
import {
  decItemQuantity,
  incItemQuantity,
  getQuantity,
} from '../features/cart/cartSlice';
import Button from './Button';

export default function UpdateItemQuantity({ id }) {
  //   console.log(id);
  const dispatch = useDispatch();
  const quantity = useSelector(getQuantity(id));
  //   console.log(quantity);

  return (
    <div className="flex items-center justify-center">
      <Button
        disabled={quantity == 1}
        type={'quant'}
        onClick={() => {
          dispatch(decItemQuantity(id));
        }}
      >
        -
      </Button>
      <div className="rounded-xl px-3 py-3 text-center text-black">
        {quantity}
      </div>
      <Button type={'quant'} onClick={() => dispatch(incItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}
