import { Lightning, Router } from "wpe-lightning-sdk";
import Item from "./MenuItem";

export default class Menu extends Lightning.Component {
  static _template() {
    const timingFunction = "cubic-bezier(0.20, 1.00, 0.80, 1.00)";

    return {
      Items: {
        alpha: 0,
        x: 50,
        y: 220,
        mount: 0,

        transitions: {
          alpha: { duration: 1, timingFunction },
          x: { duration: 1, timingFunction }
        }
      },
    };
  }

  _init() {
    this._index = 0;
    this._labelWidth = 150;
    this._itemPadding = 10;
  }

  _active() {
    this.patch({Items:{ smooth: { alpha: 1, x: 150 } }});
  }

  _handleLeft() {
    this.setIndex(this._index - 1);
  }

  _handleRight() {
    this.setIndex(this._index + 1);
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

  set items(items) {
    this.tag("Items").children = items.map((item, idx) => {
      return {
        type: Item,
        label: item.label,
        x: this._labelWidth * idx + (idx ? idx * this._itemPadding : 0),
        active: idx === 0
      };
    });
  }

  get items() {
    return this.tag("Items").children;
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

  _getFocused() {
    return this.activeItem;
  }

  _handleDown() {
    Router.restoreFocus();
  }
}
