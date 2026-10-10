import React, {useState, useMemo, useEffect} from 'react';
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
import heroBg from './assets/images/hero-bg.jpeg';
import './App.css';

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
            alert("Пам'ять браузера переповнена! Якщо ви додаєте фотографії, переконайтеся, що вони стискаються у компоненті AdminModal.");
        }
    }, [products]);

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
        setProducts([newProduct, ...products]);
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

    return (
        <div className="app-container">
            <Header
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
                onClose={() => setIsCartOpen(false)}
                onProceedToCheckout={() => setIsCheckoutOpen(true)}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
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
                    {}
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
                            <ProductCard key={product.id} product={product}/>
                        ))
                    ) : (
                        <p className="no-products">За вашим запитом товарів не знайдено.</p>
                    )}
                </section>
            </main>

            <Footer/>
        </div>
    );
}

export default App;