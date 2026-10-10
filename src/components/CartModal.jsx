import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './CartModal.css';

export const CartModal = ({ isOpen, onClose, onProceedToCheckout }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    if (!isOpen) return null;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Ваша корзина</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Корзина пуста</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-item-img" />

                                    <div className="cart-item-info">
                                        <h4>{item.title}</h4>
                                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <button
                                        className="cart-item-remove"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Итого:</span>
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </div>

                            <div className="cart-actions">
                                <button className="clear-btn" onClick={() => dispatch(clearCart())}>
                                    Очистить
                                </button>
                                <button
                                    className="checkout-btn"
                                    onClick={() => {
                                        onClose();
                                        onProceedToCheckout();
                                    }}
                                >
                                    Оформить <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};