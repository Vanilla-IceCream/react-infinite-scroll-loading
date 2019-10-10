import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScrollLoading extends Component {
  static propTypes = {
    children: PropTypes.node,
    ref: PropTypes.func,

    element: PropTypes.node,
    pageStart: PropTypes.number,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    resetPage: PropTypes.bool,
    threshold: PropTypes.number,
    useWindow: PropTypes.bool,
    getScrollParent: PropTypes.func,
    useCapture: PropTypes.bool,

    // Deprecated
    initialLoad: PropTypes.bool,
    isReverse: PropTypes.bool,
    loader: PropTypes.node,
  };

  static defaultProps = {
    children: undefined,
    ref: null,

    element: 'div',
    pageStart: 0,
    hasMore: false,
    loadMore: null,
    resetPage: false,
    threshold: 250,
    useWindow: true,
    getScrollParent: null,
    useCapture: false,

    // Deprecated
    initialLoad: false,
    isReverse: false,
    loader: null,
  };

  scrollComponent = null;

  pageLoaded = null;

  componentDidMount() {
    const { pageStart } = this.props;
    this.pageLoaded = pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    const { isReverse, resetPage, pageStart } = this.props;

    if (isReverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop = parentElement.scrollHeight
        - this.beforeScrollHeight
        + this.beforeScrollTop;
      this.loadMore = false;
    }
    this.attachScrollListener();

    if (resetPage) {
      this.pageLoaded = pageStart;
      this.scrollToTop();
    }
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  scrollToTop() {
    const { useWindow } = this.props;
    const parentElement = this.getParentElement(this.scrollComponent);

    if (useWindow) {
      window.scrollTo(0, 0);
    } else {
      parentElement.scrollTop = 0;
    }
  }

  detachScrollListener() {
    const { useWindow, useCapture } = this.props;

    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = this.getParentElement(this.scrollComponent);
    }

    scrollEl.removeEventListener('scroll', this.scrolListener, useCapture);
    scrollEl.removeEventListener('resize', this.scrollListener, useCapture);
  }

  getParentElement(el) {
    const { getScrollParent } = this.props;
    const scrollParent = getScrollParent && getScrollParent();
    if (scrollParent !== null) return scrollParent;
    return el && el.parentNode;
  }

  attachScrollListener() {
    const { hasMore, useWindow, useCapture, initialLoad } = this.props;
    const parentElement = this.getParentElement(this.scrollComponent);

    if (!hasMore || !parentElement) return;

    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = parentElement;
    }

    scrollEl.addEventListener('scroll', this.scrollListener, useCapture);
    scrollEl.addEventListener('resize', this.scrollListener, useCapture);

    if (initialLoad) {
      this.scrollListener();
    }
  }

  scrollListener = () => {
    const { useWindow, isReverse, threshold, hasMore, loadMore } = this.props;
    const el = this.scrollComponent;
    const scrollEl = window;
    const parentNode = this.getParentElement(el);

    let offset;
    if (useWindow) {
      const doc = document.documentElement || document.body.parentNode || document.body;
      const scrollTop = scrollEl.pageYOffset !== undefined
        ? scrollEl.pageYOffset
        : doc.scrollTop;
      if (isReverse) {
        offset = scrollTop;
      } else {
        offset = this.calculateOffset(el, scrollTop);
      }
    } else if (isReverse) {
      offset = parentNode.scrollTop;
    } else {
      offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
    }

    // Here we make sure the element is visible as well as checking the offset
    if (offset < threshold && (el && el.offsetParent !== null)) {
      this.detachScrollListener();
      this.beforeScrollHeight = parentNode.scrollHeight;
      this.beforeScrollTop = parentNode.scrollTop;
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (hasMore && typeof loadMore === 'function') {
        loadMore((this.pageLoaded += 1));
        this.loadMore = true;
      }
    }
  };

  calculateOffset(el, scrollTop) {
    if (!el) return 0;

    return (
      this.calculateTopPosition(el)
      + (el.offsetHeight - scrollTop - window.innerHeight)
    );
  }

  calculateTopPosition(el) {
    if (!el) return 0;
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    const {
      children,
      element,
      hasMore,
      initialLoad,
      isReverse,
      loader,
      loadMore,
      pageStart,
      ref,
      threshold,
      useCapture,
      useWindow,
      getScrollParent,
      resetPage,
      ...props
    } = this.props;

    props.ref = (node) => {
      this.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    const childrenArray = [children];
    if (hasMore) {
      if (loader) {
        isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
      } else if (this.defaultLoader) {
        isReverse
          ? childrenArray.unshift(this.defaultLoader)
          : childrenArray.push(this.defaultLoader);
      }
    }
    return React.createElement(element, props, childrenArray);
  }
}
