import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import './checkout.css';

export const Checkout = () => {
  const { getTotalCartAmount, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    shippingSpeed: 'standard'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Invalid card number';
    if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) newErrors.expirationDate = 'Invalid expiration date';
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      checkout(); // Only call checkout here, after form submission
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="checkout-confirmation">
        <h2>Thank you for your purchase!</h2>
        <p>Your order has been confirmed. You will be redirected to the home page shortly.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>
        <div className="form-section">
          <h2>Payment Details</h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              maxLength="5"
            />
            {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              maxLength="3"
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
        </div>
        <div className="form-section">
          <h2>Shipping</h2>
          <div className="form-group">
            <label htmlFor="shippingSpeed">Shipping Speed:</label>
            <select
              id="shippingSpeed"
              name="shippingSpeed"
              value={formData.shippingSpeed}
              onChange={handleInputChange}
            >
              <option value="standard">Standard (3-5 business days)</option>
              <option value="express">Express (1-2 business days)</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>
        </div>
        <div className="order-total">
          <h2>Order Total: ${getTotalCartAmount()}</h2>
        </div>
        <div className="button-container">
          <button type="submit" className="complete-purchase">Complete Purchase</button>
        </div>
      </form>
    </div>
  );
};