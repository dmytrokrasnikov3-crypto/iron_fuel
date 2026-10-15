import {useState, useMemo, useEffect} from 'react';
import {Header} from './components/Header';
import {SidebarMenu} from './components/SidebarMenu';
import {ProductCard} from './components/ProductCard';
import {CartModal} from './components/CartModal';
import {CheckoutModal} from './components/CheckoutModal';
import {AdminModal} from './components/AdminModal';
import {AuthModal} from './components/AuthModal';
import {Footer} from './components/Footer';
import {initialProducts} from './data/products';
import {Search, Filter} from 'lucide-react';
import './App.css';

const heroBg = '/images/hero-bg.jpeg';

function App() {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('ironfuel_products');
        if (savedProducts) {
            try {
                const parsed = JSON.parse(savedProducts);
                return parsed.map(savedItem => {
                    const originalItem = initialProducts.find(p => p.id === savedItem.id);
                    if (originalItem) {
                        return Object.assign(
                            Object.create(Object.getPrototypeOf(originalItem)),
                            savedItem
                        );
                    }

                    return {
                        ...savedItem,
                        getFormattedPrice() {
                            return typeof this.price === 'number' ? `$${this.price.toFixed(2)}` : `$${this.price}`;
                        }
                    };
                });
            } catch (e) {
                console.error("Помилка зчитування з localStorage", e);
            }
        }
        return initialProducts;
    });

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('ironfuel_cart');
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (e) {
                console.error("Помилка зчитування кошика з localStorage", e);
            }
        }
        return [];
    });

    const [toastMessage, setToastMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        try {
            localStorage.setItem('ironfuel_products', JSON.stringify(products));
        } catch (e) {
            console.error("Помилка збереження в localStorage:", e);
        }
    }, [products]);

    useEffect(() => {
        try {
            localStorage.setItem('ironfuel_cart', JSON.stringify(cart));
        } catch (e) {
            console.error("Помилка збереження кошика у localStorage:", e);
        }
    }, [cart]);

    const totalCartCount = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }, [cart]);

    const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const handleAddProduct = (newProduct) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleUpdateProductPhoto = (productId, newPhotoUrl) => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                if (product.id === productId) {
                    if (Object.getPrototypeOf(product) !== Object.prototype) {
                        return Object.assign(
                            Object.create(Object.getPrototypeOf(product)),
                            product,
                            {image: newPhotoUrl}
                        );
                    }
                    return {...product, image: newPhotoUrl};
                }
                return product;
            })
        );
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prevCart];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: (updated[existingIndex].quantity || 1) + 1
                };
                return updated;
            }
            return [...prevCart, {...product, quantity: 1}];
        });

        setToastMessage(`Товар "${product.title}" додано до кошика!`);

        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };

    return (
        <div className="app-container">
            <Header
                currentUser={currentUser}
                totalCount={totalCartCount}
                onOpenMenu={() => setIsMenuOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenAdmin={() => setIsAdminOpen(true)}
            />

            <SidebarMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelectCategory={(category) => setSelectedCategory(category)}
                onOpenAuth={() => setIsAuthOpen(true)}
            />

            <CartModal
                isOpen={isCartOpen}
                cart={cart}
                setCart={setCart}
                onClose={() => setIsCartOpen(false)}
                onProceedToCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
                cart={cart}
                setCart={setCart}
                onClose={() => setIsCheckoutOpen(false)}
            />

            <AdminModal
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProductPhoto={handleUpdateProductPhoto}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLoginSuccess={(user) => setCurrentUser(user)}
            />

            <main className="main-content">
                <div className="hero-banner">
                    <img src={heroBg} alt="Hero Banner" className="hero-banner-img"/>
                </div>

                <section className="catalog-controls">
                    <div className="search-bar">
                        <Search size={20} className="search-icon"/>
                        <input
                            type="text"
                            placeholder="Пошук товарів (наприклад, Protein, Creatine)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="category-filters">
                        <Filter size={18}/>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))
                    ) : (
                        <p className="no-products">За вашим запитом товарів не знайдено.</p>
                    )}
                </section>
            </main>

            {}
            {toastMessage && (
                <div className="toast-notification">
                    <span className="toast-icon">✅</span>
                    <span>{toastMessage}</span>
                </div>
            )}

            <Footer/>
        </div>
    );
}

export default App;