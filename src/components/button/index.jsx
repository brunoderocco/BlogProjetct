import P from 'prop-types';
import './styles.css';

export const Button = ({ onClick, disabled }) => {
  return (
    <div>
      <button className="button" onClick={onClick} disabled={disabled}>
        Load More Posts
      </button>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  onClick: P.func.isRequired,
  disabled: P.bool,
};
