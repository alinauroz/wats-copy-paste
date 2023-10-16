import React from 'react';
import '../../styles/otpVerification.css';
import Input from '../Elements/Input';
import Header from '../Header/Header';
import Button from '../Elements/Button';

const index = () => {
  return (
    <div className="container-verification">
      <Header />
      <div className="verification">
        <div className="heading">Email Verification!</div>
        <div>
          <Input placeholder="Enter your email" type="email" />
        </div>
        <div className="verification-btn">
          <p>
            <a href="#">Send OTP</a>
          </p>
          <Button text="Verify" />
        </div>
      </div>
    </div>
  );
};

export default index;
