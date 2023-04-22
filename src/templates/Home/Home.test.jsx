import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved, act } from "@testing-library/react";
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "title 1",
          "body": "body 1",
          "url": "img 1",
        },
        {
          "userId": 2,
          "id": 2,
          "title": "title 2",
          "body": "body 2",
          "url": "img 2",
        },
        {
          "userId": 3,
          "id": 3,
          "title": "title 3",
          "body": "body 3",
          "url": "img 3",
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found! =/');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /Load More Posts/i });
    expect(button).toBeInTheDocument();

  });
  it('should search for posts using input text', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found! =/');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'title 1');
    });

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.clear(search);
    });

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'test 123');
    });

    expect(screen.getByText('No posts found! =/')).toBeInTheDocument();

  });
  it('should load more posts on click', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found! =/');

    expect.assertions(4);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load More Posts/i });

    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();
    act(() => {
      userEvent.click(button);
    });

    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(button).toBeDisabled();

  });
});