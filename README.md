# React Infinite Scroll Loading

Infinite scroll component for React.

## Installation and Usage

```bash
$ npm i react-infinite-scroll-loading -S
# or
$ yarn add react-infinite-scroll-loading
```

```js
// for commonjs
const InfiniteScrollLoading = require('react-infinite-scroll-loading');

// for es modules
import InfiniteScrollLoading from 'react-infinite-scroll-loading';
```

## Getting Started

see https://github.com/CassetteRocks/react-infinite-scroller

Reset `pageStart` number

```js
import InfiniteScrollLoadingLoading from 'react-infinite-scroll-loading';

<InfiniteScrollLoading
  pageStart={0}
  loadMore={loadFunc}
  hasMore={true || false}
  loader={<div className="loader" key={0}>Loading...</div>}
  resetPage={true || false}
>
  {items}
</InfiniteScrollLoading>
```

[![Edit red-https-thrgc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/red-https-thrgc?fontsize=14)

### Window scroll events

```js
<InfiniteScrollLoading
  pageStart={1}
  hasMore={hasMore && !isLoading}
  loadMore={loadMore}
  resetPage={resetPage}
>
  {
    !!items.length
    && items.map(item => <li key={item.id}>{item.name}</li>)
  }
  {isLoading && <div>Loading...</div>}
</InfiniteScrollLoading>
```

### DOM scroll events

```js
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  height: 660px;
  overflow: auto;
`;

<Wrapper>
  <InfiniteScrollLoading
    pageStart={1}
    hasMore={hasMore && !isLoading}
    loadMore={loadMore}
    resetPage={resetPage}
    useWindow={false}
  >
    {
      !!items.length
      && items.map(item => <li key={item.id}>{item.name}</li>)
    }
    {isLoading && <div>Loading...</div>}
  </InfiniteScrollLoading>
</Wrapper>
```

### Custom parent element

```js
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  height: 660px;
  overflow: auto;
`;

const wrapperRef = useRef();

<Wrapper ref={wrapperRef}>
  <article>
    <InfiniteScrollLoading
      pageStart={1}
      hasMore={hasMore && !isLoading}
      loadMore={loadMore}
      resetPage={resetPage}
      useWindow={false}
      getScrollParent={() => wrapperRef}
    >
      {
        !!items.length
        && items.map(item => <li key={item.id}>{item.name}</li>)
      }
      {isLoading && <div>Loading...</div>}
    </InfiniteScrollLoading>
  </article>

  <aside>...</aside>
</Wrapper>
```

## API

### `resetPage`

Whether the component should reset the page start number.

* Type: `boolean`
* Default: `false`
