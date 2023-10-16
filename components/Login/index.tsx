import '../../styles/login.css';
import Button from '../Elements/Button';
import Header from '../Header/Header';
import Input from '../Elements/Input';

const Login = () => {
  return (
    <form action="">
      <div className="login">
        <div className="header">
          <Header />
        </div>
        <div className="login-content">
          <div className="info">
            <p className="email">Email</p>
            <p className="phone">Phone number</p>
          </div>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Enter your password" type="password" />
          <div className="tou-check">
            <input type="checkbox" className="checkbox" />
            <p className="checkbox-text">Keep me signed in</p>
          </div>
          <Button text="Login" type="submit" />
          <p className="forgot-password">Forgot Password?</p>
          <p className="account-info">
            Don&apos;t have an account?{' '}
            <span className="login-btn">Sign Up</span>
          </p>
        </div>
      </div>
      <div className="help">
        <a href="#">Help!</a>
      </div>
    </form>
  );
};

export default Login;
