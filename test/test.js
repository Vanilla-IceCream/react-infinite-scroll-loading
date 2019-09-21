import React from 'react';
import { render } from '@testing-library/react';

import InfiniteScroll from '~/';

process.chdir(__dirname);

describe('react-infinite-scroll-loading', () => {
  it('should render', () => {
    const loadMore = jest.fn();

    const children = (
      <div>
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
      </div>
    );

    const { container } = render(
      <div>
        <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={false}>
          <div className="list">{children}</div>
        </InfiniteScroll>
      </div>
    );

    expect(container).toMatchSnapshot();
  });
});
