import { Lightning, Utils } from "wpe-lightning-sdk";

export default class Logo extends Lightning.Component {
  static _template() {
    const timingFunction = "cubic-bezier(0.20, 1.00, 0.80, 1.00)";

    return {
      Image: {
        src: Utils.asset("images/logo.png"),
        mount: 0,
        x: 50,
        y: 120,
        alpha: 0.0001,
        transitions: {
          alpha: { duration: 1, timingFunction },
          x: { duration: 1, timingFunction }
        }
      }
    };
  }

  _init() {
    this.tag("Image").on("txLoaded", () => {
      this.patch({
        Image: { smooth: { alpha: 1, x: 120 } }
      });
    });
  }
}
