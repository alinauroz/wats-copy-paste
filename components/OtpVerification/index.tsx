import React from 'react';
import '../../styles/verification.css';
import Input from '../Elements/Input';
import Header from '../Header/Header';
import Button from '../Elements/Button';

const index = () => {
  return (
    <div className="container-verification">
      <Header />
      <div className="verification">
        <div className="heading">Otp Verification!</div>
        <div>
          <Input placeholder="Enter your OTP code" type="email" />
        </div>
        <p className="send-again">
          <a href="#">Send again!</a>
        </p>
        <div className="verification-btn">
          <Button text="Click Here To Verify" />
        </div>
      </div>
    </div>
  );
};

export default index;
