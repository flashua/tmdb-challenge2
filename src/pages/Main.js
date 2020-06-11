import { Lightning, Router } from "wpe-lightning-sdk";
import { Lists, Logo } from "../components";

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Lists: {
        type: Lists,
        x: 100,
        y: 500,
        zIndex: 3
      },
      Logo: {
        type: Logo
      }
    };
  }

  set movies(moviesData) {
    this.tag("Lists").label = "Popular";
    this.tag("Lists").movies = moviesData;
  }

  _getFocused() {
    return this.tag("Lists");
  }


}
