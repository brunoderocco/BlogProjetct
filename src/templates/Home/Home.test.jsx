import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Home } from '.';
import { wait } from '@testing-library/user-event/dist/utils';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "title 1",
          "body": "body 1",
          "url": "img 1"
        },
        {
          "userId": 2,
          "id": 2,
          "title": "title 2",
          "body": "body 2",
          "url": "img 2"
        },
        {
          "userId": 3,
          "id": 3,
          "title": "title 3",
          "body": "body 3",
          "url": "img 3"
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

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();

  });
});