import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, deleteItem, getIsInCartStatus } from '../cart/cartSlice';
import { useEffect, useState } from 'react';
import UpdateItemQuantity from '../../ui/UpdateItemQuantity';
// import { addItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const price = unitPrice * 10;
  const [isSmall, setIsSmall] = useState(false);
  const dispatch = useDispatch();
  const isInCart = useSelector(getIsInCartStatus(id));

  useEffect(function () {
    const myFunc = () =>
      setIsSmall(
        (window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) < 678
      );
    myFunc();
    const id = window.addEventListener('resize', myFunc);
    return () => window.removeEventListener(id, myFunc);
  }, []);

  function handleClick() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice: price,
      quantity: 1,
      totalPrice: price,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteClick() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        height="196"
        className={`my-auto h-20 sm:h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-xs capitalize italic text-stone-500 sm:text-sm">
          {ingredients.join(', ')}
        </p>
        <div className="mt-2 flex  items-center justify-between sm:mt-auto">
          {!soldOut ? (
            <p className="text-xs sm:text-sm">{formatCurrency(price)}</p>
          ) : (
            <p className="text-xs font-medium uppercase text-stone-500 sm:text-sm">
              Sold out
            </p>
          )}
          {isInCart && !soldOut ? (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <UpdateItemQuantity id={id} />
              <Button
                type={isSmall ? 'xsmall' : 'small'}
                onClick={handleDeleteClick}
              >
                {isSmall ? <i className="fa-solid fa-trash"></i> : 'Remove'}
              </Button>
            </div>
          ) : (
            !soldOut && (
              <Button type={isSmall ? 'xsmall' : 'small'} onClick={handleClick}>
                {isSmall ? (
                  <i className="fa fa-shopping-cart"></i>
                ) : (
                  'Add to cart'
                )}
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
