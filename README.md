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

| Name              | Type                            | Default | Description                                                                                                      |
|-------------------|---------------------------------|---------|------------------------------------------------------------------------------------------------------------------|
| `element`         | `React.Node`                    | `div`   | Name of the element that the component should render as.                                                         |
| `pageStart`       | `number`                        | `0`     | The number of the first page to load, With the default of `0`, the first page is `1`.                            |
| `hasMore`         | `boolean`                       | `false` | Whether there are more items to be loaded. Event listeners are removed if `false`.                               |
| `loadMore`        | `loadMore(page: number): void`  | `null`  | A callback when more items are requested by the user.                                                            |
| `resetPage`       | `boolean`                       | `false` | Whether the component should reset the page start number.                                                        |
| `threshold`       | `number`                        | `250`   | The distance in pixels before the end of the items that will trigger a call to `loadMore`.                       |
| `useWindow`       | `boolean`                       | `false` | Add scroll listeners to the window, or else, the component's `parentNode`.                                       |
| `getScrollParent` | `getScrollParent(): React.Node` | `null`  | Override method to return a different scroll listener if it's not the immediate parent of InfiniteScrollLoading. |
| `useCapture`      | `boolean`                       | `false` | Proxy to the `useCapture` option of the added event listeners.                                                   |
