export interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children?: string;
}

function Button (props: ButtonProps) {
  const {disabled, onClick, children} = props;

  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
