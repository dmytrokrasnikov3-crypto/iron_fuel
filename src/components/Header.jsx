import { useSelector } from 'react-redux';
import { Menu, ShoppingBag, User } from 'lucide-react';
import './Header.css';

export const Header = ({ onOpenMenu, onOpenCart, onOpenAdmin }) => {
    const cartItems = useSelector(state => state.cart.items);
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-btn" onClick={onOpenMenu}>
                    <Menu size={24} />
                </button>
                <span className="logo">IRON<span className="logo-accent">FUEL</span></span>
            </div>

            <div className="header-right">
                <button className="icon-btn" onClick={onOpenAdmin} title="Адмін-панель">
                    <User size={22} />
                </button>

                <button className="icon-btn cart-btn" onClick={onOpenCart}>
                    <ShoppingBag size={22} />
                    {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
                </button>
            </div>
        </header>
    );
};