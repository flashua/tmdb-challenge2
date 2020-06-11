import {Lightning, Router} from "wpe-lightning-sdk";
import Item from "./Item";

export default class Lists extends Lightning.Component {
  static _template() {
    const timingFunction = "cubic-bezier(0.20, 1.00, 0.80, 1.00)";

    return {
      alpha: 0.0001,
      Label: {
        mount: 0,
        text: { text: "", fontFace: "SemiBold", fontSize: 36 },
        y: 100,
        transitions: {
          y: { duration: 1, timingFunction }
        }
      },
      Movies: {
        mount: 0,
        x: 110,
        y: 350,
        transitions: {
          y: { duration: 1, timingFunction },
          x: { duration: 0.25, timingFunction }
        }
      },
      transitions: {
        alpha: { duration: 1, timingFunction }
      }
    };
  }

  _init() {
    this.patch({
      smooth: { alpha: 1 },
      Movies: { smooth: { y: 250 } },
      Label: { smooth: { y: -25 } }
    });

    this._index = 0;
    this._itemPadding = this.tag("Movies").x;
    this._itemWidth = 220;
    this._firstVisibleIndex = 0;
    this._lastVisibleIndex = this.visibleSize - 1;
  }

  _handleLeft() {
    this.setIndex(this._index - 1);
    this.setVisibleIndex(this._index);
    this.updateScroll();
  }

  _handleRight() {
    this.setIndex(this._index + 1);
    this.setVisibleIndex(this._index);
    this.updateScroll();
  }

  setVisibleIndex(index) {
    switch (true) {
      case index < this._firstVisibleIndex:
        this._firstVisibleIndex = index;
        this._lastVisibleIndex = index + this.visibleSize - 1;
        break;
      case index > this._lastVisibleIndex:
        this._firstVisibleIndex = index - this.visibleSize + 1;
        this._lastVisibleIndex = index;
        break;
      default:
        break;
    }
  }

  setIndex(index) {
    switch (true) {
      case index < this.firstIndex:
        this._index = this.lastIndex;
        break;
      case index > this.lastIndex:
        this._index = this.firstIndex;
        break;
      default:
        this._index = index;
        break;
    }
  }

  updateScroll() {
    this.tag("Movies").setSmooth(
      "x",
      this._itemPadding - this._firstVisibleIndex * this.itemWidth
    );
  }

  set label(text) {
    this.tag("Label").text.text = text;
  }

  set movies(items) {
    this.items = items.map((item, idx) => {
      return {
        type: Item,
        data: item,
        x: item.posterWidth * idx + (idx ? idx * this._itemPadding : 0),
      };
    });
  }

  get items() {
    return this.tag("Movies").children;
  }

  set items(items) {
    this.tag("Movies").children = items;
  }

  get size() {
    return this.items.length;
  }

  get lastIndex() {
    return this.size === 0 ? this.firstIndex : this.size - 1;
  }

  get firstIndex() {
    return 0;
  }

  get activeItem() {
    return this.items[this._index];
  }

  get itemWidth() {
    return this._itemWidth + this._itemPadding;
  }

  get visibleSize() {
    return Math.floor((window.innerWidth - 2 * 110) / this.itemWidth);
  }

  _getFocused() {
    return this.activeItem;
  }

  _handleUp() {
    Router.focusWidget("Menu");
  }
}
