import userEvent from '@testing-library/user-event';
import { Button } from '.';

const { render, screen, fireEvent } = require('@testing-library/react');

describe('<Button />', () => {
  it('should render the button with the text "Load More Posts"', () => {
    render(<Button />);

    expect.assertions(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toHaveAttribute('class', 'button');
    expect(button).toBeInTheDocument();
  });
  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disable is True', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    const { container } = render(<Button onClick={fn} disabled={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});