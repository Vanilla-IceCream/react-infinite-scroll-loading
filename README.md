# React Infinite Scroll Loading

Infinite scroll component for React.

## Installation and Usage

### CJS or ESM

```bash
$ npm i react-infinite-scroll-loading -S
# or
$ yarn add react-infinite-scroll-loading
```

### UMD

```bash
```

## Getting Started

see https://github.com/CassetteRocks/react-infinite-scroller

Reset `pageStart`

```js
import InfiniteScroll from 'react-infinite-scroll-loading';

<InfiniteScroll
  pageStart={0}
  loadMore={loadFunc}
  hasMore={true || false}
  loader={<div className="loader" key={0}>Loading...</div>}
  resetPage={true || false}
>
  {items} // <-- This is the content you want to load
</InfiniteScroll>
```

## API
