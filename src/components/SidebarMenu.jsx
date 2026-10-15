import { useState } from 'react';
import { Heart, User, Mail, ChevronDown, X } from 'lucide-react';
import './SidebarMenu.css';

export const SidebarMenu = ({ isOpen, onClose, onSelectCategory, onOpenAuth }) => {
    const [activeTab, setActiveTab] = useState('MENU');

    if (!isOpen) return null;

    const handleCategoryClick = (categoryName) => {
        if (onSelectCategory) {
            onSelectCategory(categoryName);
        }
        onClose();
    };

    return (
        <div className="sidebar-overlay" onClick={onClose}>
            <div className="sidebar-container" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                {}
                <div className="sidebar-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'MENU' ? 'active' : ''}`}
                        onClick={() => setActiveTab('MENU')}
                    >
                        MENU
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'CATEGORIES' ? 'active' : ''}`}
                        onClick={() => setActiveTab('CATEGORIES')}
                    >
                        CATEGORIES
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'LANGUAGE' ? 'active' : ''}`}
                        onClick={() => setActiveTab('LANGUAGE')}
                    >
                        LANGUAGE
                    </button>
                </div>

                {}
                {activeTab === 'MENU' && (
                    <div className="tab-content">
                        <nav className="menu-list">
                            <button className="menu-item bold" onClick={() => handleCategoryClick('All')}>HOME / ALL</button>
                            <button className="menu-item bold" onClick={() => handleCategoryClick('All')}>SHOP</button>
                            <a href="#" className="menu-item bold">BLOG</a>
                            <a href="#" className="menu-item bold">ABOUT US</a>
                            <a href="#" className="menu-item bold">FAQs</a>
                            <a href="#" className="menu-item bold">CONTACTS</a>

                            <a href="#" className="menu-item icon-item">
                                <Heart size={18} /> Wishlist
                            </a>

                            {}
                            <button
                                className="menu-item icon-item"
                                onClick={() => {
                                    onClose();
                                    if (onOpenAuth) onOpenAuth();
                                }}
                            >
                                <User size={18} /> Log in Sign up
                            </button>
                        </nav>

                        <div className="help-section">
                            <p className="help-title">Need help?</p>
                            <a href="mailto:support@ironfuel.de" className="help-email">
                                <Mail size={16} /> support@ironfuel.de
                            </a>
                        </div>
                    </div>
                )}

                {}
                {activeTab === 'CATEGORIES' && (
                    <div className="tab-content">
                        <nav className="menu-list">
                            <button className="menu-item highlight-red" onClick={() => handleCategoryClick('All')}>
                                Special offer
                            </button>
                            <button className="menu-item highlight-green" onClick={() => handleCategoryClick('All')}>
                                Halal-certified products
                            </button>
                            <button className="menu-item" onClick={() => handleCategoryClick('All')}>
                                New products
                            </button>

                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Amino acids')}>
                                <span>Amino acids</span> <ChevronDown size={16} />
                            </button>
                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Collagen')}>
                                <span>Collagen</span> <ChevronDown size={16} />
                            </button>
                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Joints and bones')}>
                                <span>Joints and bones</span> <ChevronDown size={16} />
                            </button>
                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Sports supplements for health')}>
                                <span>Sports supplements for health</span> <ChevronDown size={16} />
                            </button>
                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Creatine')}>
                                <span>Creatine</span> <ChevronDown size={16} />
                            </button>
                            <button className="menu-item has-dropdown" onClick={() => handleCategoryClick('Protein')}>
                                <span>Protein</span> <ChevronDown size={16} />
                            </button>

                            <button className="menu-item" onClick={() => handleCategoryClick('Weight gainer')}>Weight gainer</button>
                            <button className="menu-item" onClick={() => handleCategoryClick('Carbohydrates')}>Carbohydrates</button>
                            <button className="menu-item" onClick={() => handleCategoryClick('Beauty')}>Beauty</button>
                            <button className="menu-item" onClick={() => handleCategoryClick('Fat burner')}>Fat burner</button>
                            <button className="menu-item" onClick={() => handleCategoryClick('Shaker')}>Shaker</button>
                            <button className="menu-item" onClick={() => handleCategoryClick('All')}>Our recommendation</button>
                        </nav>
                    </div>
                )}

                {}
                {activeTab === 'LANGUAGE' && (
                    <div className="tab-content">
                        <nav className="menu-list">
                            <button className="menu-item">English</button>
                            <button className="menu-item">Deutsch</button>
                            <button className="menu-item">Українська</button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};