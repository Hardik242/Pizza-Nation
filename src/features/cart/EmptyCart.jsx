import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mt-4 space-y-4 px-4 text-center">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="text-xl">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
