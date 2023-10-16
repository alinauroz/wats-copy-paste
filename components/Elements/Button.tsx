import '../../styles/elements.css';

interface Props {
  text: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ text, style, type }: Props) => {
  return (
    <button className="btn" style={style} type={type}>
      {text}
    </button>
  );
};

export default Button;
