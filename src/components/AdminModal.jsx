import { useState } from 'react';
import { X, Plus, Trash2, ShieldCheck, Upload, Image as ImageIcon } from 'lucide-react';
import './AdminModal.css';

const compressImage = (base64Str, maxWidth = 600, maxHeight = 600) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
    });
};

export const AdminModal = ({ isOpen, onClose, products, onAddProduct, onDeleteProduct, onUpdateProductPhoto }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Protein');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const compressedImage = await compressImage(reader.result);
                setImage(compressedImage);
                setImagePreview(compressedImage);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleItemPhotoChange = (productId, e) => {
        const file = e.target.files[0];
        if (file && onUpdateProductPhoto) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const compressedImage = await compressImage(reader.result);
                onUpdateProductPhoto(productId, compressedImage);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price) return;

        const newProduct = {
            id: Date.now(),
            title,
            price: parseFloat(price),
            category,
            image: image || '',
            description,
            getFormattedPrice() {
                return `$${this.price.toFixed(2)}`;
            }
        };

        onAddProduct(newProduct);

        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        setImagePreview(null);
    };

    return (
        <div className="admin-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                <div className="admin-header">
                    <h2><ShieldCheck size={22} color="#e53935" /> Адмін-панель (Управління товарами)</h2>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="admin-body">
                    <form className="add-product-form" onSubmit={handleSubmit}>
                        <h3>Додати новий товар</h3>

                        <input
                            type="text"
                            placeholder="Назва товару *"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <div className="form-row">
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Ціна ($) *"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />

                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Protein">Protein</option>
                                <option value="Creatine">Creatine</option>
                                <option value="Amino acids">Amino acids</option>
                                <option value="Shaker">Shaker</option>
                                <option value="Vitamins">Vitamins</option>
                                <option value="Collagen">Collagen</option>
                            </select>
                        </div>

                        <div className="file-upload-wrapper">
                            <label htmlFor="file-upload-new" className="file-upload-label">
                                <Upload size={18} />
                                <span>Обрати фото для нового товару</span>
                            </label>
                            <input
                                id="file-upload-new"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {imagePreview && (
                            <div className="image-preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button
                                    type="button"
                                    className="remove-preview-btn"
                                    onClick={() => { setImage(''); setImagePreview(null); }}
                                >
                                    <X size={14} /> Видалити
                                </button>
                            </div>
                        )}

                        <textarea
                            placeholder="Опис товару"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button type="submit" className="add-btn">
                            <Plus size={16} /> Додати товар
                        </button>
                    </form>

                    <div className="admin-products-list">
                        <h3>Поточні товари ({products.length})</h3>
                        <div className="products-scroll">
                            {products.map(p => (
                                <div key={p.id} className="admin-product-item">
                                    {p.image ? (
                                        <img src={p.image} alt={p.title} className="admin-prod-img" />
                                    ) : (
                                        <div className="admin-prod-no-img">
                                            <ImageIcon size={20} color="#9ca3af" />
                                        </div>
                                    )}

                                    <div className="item-info">
                                        <strong>{p.title}</strong>
                                        <span>${p.price} ({p.category})</span>
                                    </div>

                                    <label htmlFor={`upload-photo-${p.id}`} className="change-photo-btn" title="Змінити фото">
                                        <Upload size={16} />
                                    </label>
                                    <input
                                        id={`upload-photo-${p.id}`}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleItemPhotoChange(p.id, e)}
                                    />

                                    <button className="delete-btn" onClick={() => onDeleteProduct(p.id)} title="Видалити">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};