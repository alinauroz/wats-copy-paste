import React from 'react';
import '../../styles/emailVerification.css';
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
          <Input placeholder="Enter your otp code here" type="email" />
        </div>
        <div className="verification-btn">
          {/* <p>
            <a href="#">Send OTP</a>
          </p> */}
          <Button text="Click Here To Verify" />
        </div>
      </div>
    </div>
  );
};

export default index;
