import { useState } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import { loginWithGoogle, loginWithFacebook } from '../firebase';
import './AuthModal.css';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введіть коректний Email';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Пароль має містити щонайменше 6 символів';
        }
        if (isRegister) {
            if (!formData.name.trim()) {
                newErrors.name = "Введіть ім'я";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Паролі не збігаються';
            }
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const userData = {
                name: isRegister ? formData.name : formData.email.split('@')[0],
                email: formData.email,
                role: 'user'
            };

            localStorage.setItem('ironfuel_user', JSON.stringify(userData));
            if (onLoginSuccess) onLoginSuccess(userData);

            setErrors({});
            onClose();
        }
    };

    const handleSocialLogin = async (providerName) => {
        setLoading(true);
        setErrors({});
        try {
            let userData;
            if (providerName === 'Google') {
                userData = await loginWithGoogle();
            } else if (providerName === 'Facebook') {
                userData = await loginWithFacebook();
            }

            localStorage.setItem('ironfuel_user', JSON.stringify(userData));
            if (onLoginSuccess) onLoginSuccess(userData);
            onClose();
        } catch (err) {
            console.error(`Error with ${providerName} login:`, err);
            setErrors({
                social: `Не вдалося увійти через ${providerName}. Перевірте конфігурацію Firebase.`
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="auth-header">
                    <h2>{isRegister ? 'Створити акаунт' : 'Вхід у кабінет'}</h2>
                    <p>{isRegister ? 'Заповніть дані для реєстрації в IronFuel' : 'Введіть ваші дані для входу'}</p>
                </div>

                {errors.social && (
                    <div className="error-banner" style={{ color: '#e53935', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>
                        {errors.social}
                    </div>
                )}

                {}
                <div className="social-buttons">
                    <button
                        type="button"
                        className="social-btn google-btn"
                        onClick={() => handleSocialLogin('Google')}
                        disabled={loading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.13C3.26 21.3 7.31 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.37l3.99-3.13z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.63l3.99 3.13c.95-2.85 3.6-4.96 6.72-4.96z"/>
                        </svg>
                        <span>{loading ? 'Завантаження...' : 'Google'}</span>
                    </button>

                    <button
                        type="button"
                        className="social-btn facebook-btn"
                        onClick={() => handleSocialLogin('Facebook')}
                        disabled={loading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>{loading ? 'Завантаження...' : 'Facebook'}</span>
                    </button>
                </div>

                <div className="divider">
                    <span>або за допомогою Email</span>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {isRegister && (
                        <div className="form-group">
                            <label>Ім'я</label>
                            <div className="input-with-icon">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Олександр"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {isRegister && (
                        <div className="form-group">
                            <label>Підтвердження пароля</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    )}

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {isRegister ? 'Зареєструватися' : 'Увійти'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>{isRegister ? 'Вже є акаунт?' : 'Ще немає акаунту?'}</span>
                    <button
                        type="button"
                        className="toggle-auth-btn"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setErrors({});
                        }}
                    >
                        {isRegister ? 'Увійти' : 'Зареєструватися'}
                    </button>
                </div>
            </div>
        </div>
    );
};