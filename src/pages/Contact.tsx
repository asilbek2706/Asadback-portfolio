import React, { useState, useCallback, useEffect } from 'react';
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { useContactStore } from '../store/useContactStore';
import '../styles/contact/Contact.scss';

const ContactForm: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { submitContact, isSubmitting, isSuccess, error, resetStatus } =
        useContactStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        const badge = document.querySelector(
            '.grecaptcha-badge'
        ) as HTMLElement;
        if (badge) {
            badge.style.visibility = 'hidden';
            badge.style.opacity = '0';
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (isSuccess || error) resetStatus();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!executeRecaptcha) return;

            const token = await executeRecaptcha('contact_form');
            const success = await submitContact({
                ...formData,
                recaptcha_token: token,
            });

            if (success) setFormData({ name: '', email: '', message: '' });
        },
        [executeRecaptcha, formData, submitContact]
    );

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="row">
                <div className="col-12" data-aos="fade-up" data-aos-delay="400">
                    <div className="input-group-wrapper">
                        <span className="required-star">*</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ismingiz"
                        />
                    </div>
                </div>

                <div className="col-12" data-aos="fade-up" data-aos-delay="500">
                    <div className="input-group-wrapper">
                        <span className="required-star">*</span>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Telefon yoki elektron pochta"
                        />
                    </div>
                </div>

                <div className="col-12" data-aos="fade-up" data-aos-delay="600">
                    <div className="input-group-wrapper">
                        <span className="required-star">*</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Xabar"
                            rows={1}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div
                className="submit-wrapper"
                data-aos="fade-up"
                data-aos-delay="700"
            >
                <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                >
                    <span>Jo'natish</span>
                    <div className="arrow-circle">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                    </div>
                </button>
                <p className="required-note">
                    * Belgilangan maydonlarni to'ldirish kerak.
                </p>
            </div>

            <div className="recaptcha-terms">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy" target="_blank">
                    {' '}
                    Privacy Policy
                </a>{' '}
                and
                <a href="https://policies.google.com/terms" target="_blank">
                    {' '}
                    Terms of Service
                </a>{' '}
                apply.
            </div>

            {(isSuccess || error) && (
                <div className="status-wrapper">
                    {isSuccess && (
                        <div className="status-msg success">
                            Xabaringiz yuborildi!
                        </div>
                    )}
                    {error && <div className="status-msg error">{error}</div>}
                </div>
            )}
        </form>
    );
};

const Contact: React.FC = () => {
    const siteKey = '6LfAH2gsAAAAAKLLBq6V09t6nnUhKpfRAEBOKH3b';

    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey} language="uz">
            <section id="contact" className="contact-section">
                <div className="container">
                    <div
                        className="section-title text-start"
                        data-aos="fade-up"
                    >
                        <h2>
                            Keling fikr almashish uchun
                            <br />
                            bog'lanib ko'ramiz
                        </h2>
                    </div>
                    <p
                        className="section-description text-start"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Xabar yo'llash uchun quyidagi formani to'ldiring.
                    </p>
                    <div
                        className="row mt-5"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <div className="col-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </GoogleReCaptchaProvider>
    );
};

export default Contact;
