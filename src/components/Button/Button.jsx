import PropTypes from 'prop-types';
import { Btn } from './Button.styled';
const Button = (props) => {
  const { onClick, disabled } = props;
  return (
    <Btn type="button" disabled={disabled} onClick={onClick}>
      loadMore
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
