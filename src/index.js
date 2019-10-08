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
    this.pageLoaded = this.props.pageStart;
    // this.options = this.eventListenerOptions();
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.props.isReverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop = parentElement.scrollHeight
        - this.beforeScrollHeight
        + this.beforeScrollTop;
      this.loadMore = false;
    }
    this.attachScrollListener();

    if (this.props.resetPage) {
      this.pageLoaded = this.props.pageStart;
      this.scrollToTop();
    }
  }

  componentWillUnmount() {
    this.detachScrollListener();
    // this.detachMousewheelListener();
  }

  scrollToTop() {
    const parentElement = this.getParentElement(this.scrollComponent);

    if (this.props.useWindow) {
      window.scrollTo(0, 0);
    } else {
      parentElement.scrollTop = 0;
    }
  }

  // isPassiveSupported = () => {
  //   let passive = false;

  //   const testOptions = {
  //     get passive() {
  //       passive = true;
  //     },
  //   };

  //   try {
  //     document.addEventListener('test', null, testOptions);
  //     document.removeEventListener('test', null, testOptions);
  //   } catch (e) {
  //     // ignore
  //   }
  //   return passive;
  // };

  // eventListenerOptions = () => {
  //   let options = this.props.useCapture;

  //   if (this.isPassiveSupported()) {
  //     options = {
  //       useCapture: this.props.useCapture,
  //       passive: true,
  //     };
  //   }
  //   return options;
  // };

  // detachMousewheelListener() {
  //   let scrollEl = window;
  //   if (this.props.useWindow === false) {
  //     scrollEl = this.scrollComponent.parentNode;
  //   }

  //   scrollEl.removeEventListener(
  //     'mousewheel',
  //     this.mousewheelListener,
  //     this.options ? this.options : this.props.useCapture,
  //   );
  // }

  detachScrollListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.getParentElement(this.scrollComponent);
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      /* this.options ? this.options : */ this.props.useCapture,
    );
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
      /* this.options ? this.options : */ this.props.useCapture,
    );
  }

  getParentElement(el) {
    const scrollParent = this.props.getScrollParent && this.props.getScrollParent();
    if (scrollParent != null) return scrollParent;
    return el && el.parentNode;
  }

  attachScrollListener() {
    const parentElement = this.getParentElement(this.scrollComponent);

    if (!this.props.hasMore || !parentElement) {
      return;
    }

    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = parentElement;
    }

    // scrollEl.addEventListener(
    //   'mousewheel',
    //   this.mousewheelListener,
    //   this.options ? this.options : this.props.useCapture,
    // );
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      /* this.options ? this.options : */ this.props.useCapture,
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      /* this.options ? this.options : */ this.props.useCapture,
    );

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  // mousewheelListener = (e) => {
  //   // Prevents Chrome hangups
  //   // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
  //   if (e.deltaY === 1 && !this.isPassiveSupported()) {
  //     e.preventDefault();
  //   }
  // };

  scrollListener = () => {
    const el = this.scrollComponent;
    const scrollEl = window;
    const parentNode = this.getParentElement(el);

    let offset;
    if (this.props.useWindow) {
      const doc = document.documentElement || document.body.parentNode || document.body;
      const scrollTop = scrollEl.pageYOffset !== undefined
        ? scrollEl.pageYOffset
        : doc.scrollTop;
      if (this.props.isReverse) {
        offset = scrollTop;
      } else {
        offset = this.calculateOffset(el, scrollTop);
      }
    } else if (this.props.isReverse) {
      offset = parentNode.scrollTop;
    } else {
      offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
    }

    // Here we make sure the element is visible as well as checking the offset
    if (
      offset < Number(this.props.threshold)
      && (el && el.offsetParent !== null)
    ) {
      this.detachScrollListener();
      this.beforeScrollHeight = parentNode.scrollHeight;
      this.beforeScrollTop = parentNode.scrollTop;
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (this.props.hasMore && typeof this.props.loadMore === 'function') {
        this.props.loadMore((this.pageLoaded += 1));
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
