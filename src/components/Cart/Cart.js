import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <div className={classes.summary}>
              <span className={classes.price}>${item.price.toFixed(2)}</span>
              <span className={classes.amount}>x {item.amount}</span>
            </div>
          </div>
          <div className={classes.actions}>
            <button onClick={() => cartCtx.removeItem(item.id)}>−</button>
            <button onClick={() => cartCtx.addItem({...item, amount: 1})}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );

  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + (item.price * item.amount), 0
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  )
}

export default Cart