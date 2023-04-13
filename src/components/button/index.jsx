
import './styles.css';

export const Button = ({ onClick, disabled }) => {
  return (
    <div >
      < button className='button'
        onClick={onClick}
        disabled={disabled}>
        Load More Posts
      </button >
    </div>
  );
}