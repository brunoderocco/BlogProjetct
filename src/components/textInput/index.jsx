import './styles.css'

export const TextInput = ({ searchFor, handleChange }) => {
  return (
    <div >
      <input
        className='input'
        onChange={handleChange}
        value={searchFor}
        type="search"
        placeholder='type your search' />
    </div>
  );
}