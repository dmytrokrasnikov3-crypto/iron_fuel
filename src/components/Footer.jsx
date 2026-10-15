import './Footer.css';

const TikTokIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.42V9.05a6.34 6.34 0 0 0-3.56 1.01A6.33 6.33 0 0 0 3 15.67a6.34 6.34 0 0 0 10.83 4.48 6.3 6.3 0 0 0 1.94-4.48V8.67a8.28 8.28 0 0 0 4.82 1.47V6.69z"/>
    </svg>
);

const TelegramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.36 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const YoutubeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const SOCIAL_NETWORKS = [
    { id: 'tiktok', name: 'TikTok', url: 'https://tiktok.com', icon: <TikTokIcon /> },
    { id: 'telegram', name: 'Telegram', url: 'https://t.me', icon: <TelegramIcon /> },
    { id: 'facebook', name: 'Facebook', url: 'https://facebook.com', icon: <FacebookIcon /> },
    { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', icon: <YoutubeIcon /> },
    { id: 'instagram', name: 'Instagram', url: 'https://instagram.com', icon: <InstagramIcon /> },
    { id: 'twitter', name: 'Twitter / X', url: 'https://twitter.com', icon: <TwitterIcon /> }
];

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-col social-col">
                    <p className="col-title">Ми в соціальних мережах</p>

                    <div className="social-icons">
                        {SOCIAL_NETWORKS.map((social) => (
                            <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.name}
                                title={social.name}
                                className={`social-btn ${social.id}`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <p className="qr-title">Скануйте QR-код та встановлюйте застосунок</p>
                    <div className="app-download-block">
                        <div className="qr-placeholder">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://ironfuel.de"
                                alt="QR Code"
                            />
                        </div>
                        <div className="store-buttons">
                            <a href="#" className="store-badge app-store">
                                <span>Завантажити в</span>
                                <strong>App Store</strong>
                            </a>
                            <a href="#" className="store-badge google-play">
                                <span>Завантажити в</span>
                                <strong>Google Play</strong>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-col">
                    <p className="col-title">Інформація про компанію</p>
                    <ul className="footer-links">
                        <li><a href="#">Про нас</a></li>
                        <li><a href="#">Умови використання сайту</a></li>
                        <li><a href="#">Вакансії</a></li>
                        <li><a href="#">Контакти</a></li>
                        <li><a href="#">Всі категорії</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="col-title">Допомога</p>
                    <ul className="footer-links">
                        <li><a href="#">Доставка та оплата</a></li>
                        <li><a href="#">Кредит</a></li>
                        <li><a href="#">Гарантія</a></li>
                        <li><a href="#">Повернення товару</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="col-title">Сервіси</p>
                    <ul className="footer-links">
                        <li><a href="#">Бонусний рахунок</a></li>
                        <li><a href="#">Картка IronFuel</a></li>
                        <li><a href="#">Подарункові сертифікати</a></li>
                        <li><a href="#">IronFuel Обмін</a></li>
                        <li><a href="#">Корпоративним клієнтам</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="col-title">Партнерам</p>
                    <ul className="footer-links">
                        <li><a href="#">Продавати на IronFuel</a></li>
                        <li><a href="#">Реклама на IronFuel</a></li>
                        <li><a href="#">Співпраця з нами</a></li>
                        <li><a href="#">Франчайзинг</a></li>
                        <li><a href="#">Оренда приміщень</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="payment-icons">
                    <span className="payment-badge mastercard">Mastercard</span>
                    <span className="payment-badge visa">Verified by VISA</span>
                </div>
                <p className="copyright">
                    © 2001–2026 Інтернет-магазин «IronFuel™» — Заряджаємо ваші тренування
                </p>
            </div>
        </footer>
    );
};