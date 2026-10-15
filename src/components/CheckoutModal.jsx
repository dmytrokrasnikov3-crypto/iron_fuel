import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { X, CheckCircle } from 'lucide-react';
import './CheckoutModal.css';

export const CheckoutModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Введіть ваше ім'я";
        if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Введіть коректний номер телефону";
        if (!formData.address.trim()) newErrors.address = "Введіть адресу доставки";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setIsSubmitted(true);
            dispatch(clearCart());
        }
    };

    return (
        <div className="checkout-overlay" onClick={onClose}>
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X size={20} /></button>

                {isSubmitted ? (
                    <div className="checkout-success">
                        <CheckCircle size={50} color="#2e7d32" />
                        <h2>Дякуємо за замовлення!</h2>
                        <p>Менеджер зв'яжеться з вами найближчим часом для підтвердження.</p>
                        <button className="submit-btn" onClick={onClose}>На головну</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <h2>Оформлення замовлення</h2>

                        <div className="form-group">
                            <label>ПІБ *</label>
                            <input
                                type="text"
                                placeholder="Іван Іванов"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Телефон *</label>
                            <input
                                type="tel"
                                placeholder="+380..."
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>Адреса доставки *</label>
                            <textarea
                                placeholder="Місто, номер відділення Нової Пошти..."
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <button type="submit" className="submit-btn">Підтвердити замовлення</button>
                    </form>
                )}
            </div>
        </div>
    );
};