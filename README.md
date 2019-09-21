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
const InfiniteScroll = require('react-infinite-scroll-loading');

// for es modules
import InfiniteScroll from 'react-infinite-scroll-loading';
```

## Getting Started

see https://github.com/CassetteRocks/react-infinite-scroller

Reset `pageStart` number

```js
import InfiniteScroll from 'react-infinite-scroll-loading';

<InfiniteScroll
  pageStart={0}
  loadMore={loadFunc}
  hasMore={true || false}
  loader={<div className="loader" key={0}>Loading...</div>}
  resetPage={true || false}
>
  {items}
</InfiniteScroll>
```

## API

### `resetPage`

Whether the component should reset the page start number.

* Type: `boolean`
* Default: `false`
