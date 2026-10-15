import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';


export const ProductCard = ({ product, onAddToCart }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.getFinalPrice ? product.getFinalPrice() : product.price,
            image: product.image,
            category: product.category,
        };


        dispatch(addToCart(cartItem));


        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    return (
        <div className="product-card">
            {product.discountPercent && (
                <div className="badge-discount">-{product.discountPercent}%</div>
            )}

            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>

            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                {}
                {product.flavor && <span className="product-spec">Смак: {product.flavor}</span>}
                {product.volume && <span className="product-spec">Об'єм: {product.volume}</span>}

                <div className="product-bottom">
                    <div className="product-price">
                        {product.getFinalPrice ? (
                            <>
                                <span className="price-old">{product.getFormattedPrice()}</span>
                                <span className="price-current">{product.getFormattedDiscountPrice()}</span>
                            </>
                        ) : (
                            <span className="price-current">{product.getFormattedPrice()}</span>
                        )}
                    </div>

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <ShoppingCart size={18} /> Додати
                    </button>
                </div>
            </div>
        </div>
    );
};