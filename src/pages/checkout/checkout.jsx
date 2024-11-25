import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import './checkout.css';

const StepIndicator = ({ currentStep }) => {
  const steps = ['Contact', 'Shipping', 'Payment', 'Review'];
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="step-indicator-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
          >
            <div className="step-circle">
              {index + 1 <= currentStep ? (
                <span className="step-number">{index + 1}</span>
              ) : (
                <span className="step-number">{index + 1}</span>
              )}
            </div>
            <span className="step-label">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Checkout = () => {
  const { getTotalCartAmount, checkout } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const SHIPPING_COSTS = {
    standard: { price: 5.99, label: 'Standard (3-5 business days)' },
    express: { price: 12.99, label: 'Express (1-2 business days)' },
    overnight: { price: 24.99, label: 'Overnight' }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    email: '',
    phone: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    shippingSpeed: 'standard'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Format input values (keeping existing formatValue function)
  const formatValue = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'city':
      case 'state':
      case 'country':
        return value.replace(/[^a-zA-Z\s]/g, '');
      case 'zip':
        return value.replace(/\D/g, '').slice(0, 5);
      case 'cardNumber':
        const numbers = value.replace(/\D/g, '');
        const groups = numbers.match(/.{1,4}/g) || [];
        return groups.join(' ').substr(0, 19);
      case 'expirationDate':
        const expNumbers = value.replace(/\D/g, '');
        if (expNumbers.length >= 2) {
          return expNumbers.substr(0, 2) + (expNumbers.length > 2 ? '/' + expNumbers.substr(2, 2) : '');
        }
        return expNumbers;
      case 'cvv':
        return value.replace(/\D/g, '').substr(0, 3);
      case 'phone':
        const phoneNum = value.replace(/\D/g, '').substr(0, 10);
        return phoneNum;
      default:
        return value;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatValue(name, value);
    setFormData({ ...formData, [name]: formattedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Contact
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.phone.trim().match(/^\d{10}$/)) newErrors.phone = 'Please enter a valid 10-digit phone number';
        break;

      case 2: // Shipping Information
        if (!formData.street.trim()) newErrors.street = 'Street is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim().match(/^\d{5}$/)) newErrors.zip = 'Please enter a valid 5-digit Zip Code';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        break;
      
      case 3: // Payment Information
        if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        if (!formData.expirationDate.match(/^\d{2}\/\d{2}$/)) newErrors.expirationDate = 'Please enter date in MM/YY format';
        if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = 'Please enter a valid 3-digit CVV';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // If on the review step, submit the form
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const handleSubmit = (e) => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
      checkout();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderContactStep = () => (
    <div className="form-section">
      <h2>Shipping Information</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
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
          placeholder="1234567890"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="form-section">
      <h2>Shipping Information</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder="4400 University Dr"
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Fairfax"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="VA"
          />
          {errors.state && <span className="error">{errors.state}</span>}
          </div>
          </div>
          <div className="form-row">
        </div>
          <div className="form-row">
        <div className="form-group">
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="22030"
          />
          {errors.zip && <span className="error">{errors.zip}</span>}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="USA"
        />
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="shippingSpeed">Shipping Speed:</label>
        <select
          id="shippingSpeed"
          name="shippingSpeed"
          value={formData.shippingSpeed}
          onChange={handleInputChange}
        >
          {Object.entries(SHIPPING_COSTS).map(([value, { label, price }]) => (
            <option key={value} value={value}>
              {label} - ${price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
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
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
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
            placeholder="123"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="form-section">
      <h2>Order Review</h2>
      <div className="review-details">
        <h3>Shipping Information</h3>
        <p>{formData.firstName} {formData.lastName}</p>
        <p>{formData.street}</p>
        <p>{formData.city}, {formData.state} {formData.zip}</p>
        <p>{formData.country}</p>
        <p>{formData.email}</p>
        <p>{formData.phone}</p>
        <p>Shipping Method: {SHIPPING_COSTS[formData.shippingSpeed].label}</p>
        
        <h3>Payment Information</h3>
        <p>Card ending in: {formData.cardNumber.slice(-4)}</p>
        <p>Expires: {formData.expirationDate}</p>
      </div>
      
      <div className="order-total">
        <div className="order-summary">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${getTotalCartAmount().toFixed(2)}</span>
          </div>
          <div className="shipping-cost">
            <span>Shipping:</span>
            <span>${SHIPPING_COSTS[formData.shippingSpeed].price.toFixed(2)}</span>
          </div>
          <h2>Order Total: ${(getTotalCartAmount() + SHIPPING_COSTS[formData.shippingSpeed].price).toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );

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
      <StepIndicator currentStep={currentStep} />
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderContactStep()}
        {currentStep === 2 && renderShippingStep()}
        {currentStep === 3 && renderPaymentStep()}
        {currentStep === 4 && renderReviewStep()}
        
        <div className="button-container">
          {currentStep > 1 && (
            <button type="button" className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" className="next-button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="button" className="complete-purchase" onClick={handleNext}>
              Complete Purchase
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;