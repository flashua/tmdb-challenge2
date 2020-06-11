import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component {
  static _template() {
    const timingFunction = "cubic-bezier(0.20, 1.00, 0.80, 1.00)";

    return {
      alpha: 0.75,
      scale: 1,
      Image: {
        mount: 0.5
      },
      Title: {
        text: { fontFace: "Regular", fontSize: 24 },
        alpha: 0.75,
        mount: 0.5,
        color: 0xffffffff
      },
      transitions: {
        alpha: { duration: 0.25, timingFunction },
        scale: { duration: 0.25, timingFunction }
      }
    };
  }

  _focus() {
    this.setSmooth("scale", 1.25);
    this.setSmooth("alpha", 1);
  }

  _unfocus() {
    this.setSmooth("scale", 1);
    this.setSmooth("alpha", 0.75);
  }

  set data({ title, posterUrl, posterWidth, posterHeight }) {
    this.patch({
      Image: {
        src: posterUrl
      },
      Title: {
        y: posterHeight / 2 + 50,
        text: {
          text: title
        }
      }
    });
  }
}
