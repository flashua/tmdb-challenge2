import { Lightning, Router, Utils } from "wpe-lightning-sdk";
import provider from "./lib/data-provider";
import routes from "./lib/routes";
import { init as initApi, getVodMenu } from "./lib/api";
import { Menu } from "./components";

export default class App extends Lightning.Component {
  static getFonts() {
    const families = [
      "Black",
      "Bold",
      "ExtraLight",
      "Light",
      "Regular",
      "SemiBold"
    ];

    return families.map(family => ({
      family,
      url: Utils.asset(`fonts/SourceSansPro-${family}.ttf`)
    }));
  }

  // when App instance is initialized we call the routes
  // this will setup all pages and attach them to there route
  _setup() {
    initApi(this.stage);
    Router.startRouter({
      appInstance: this,
      provider,
      routes
    });
    getVodMenu().then(menu => (this.widgets.getByRef("Menu").items = menu));
  }

  static _template() {
    return {
      Pages: {
        forceZIndexContext: true,
        w: 1920
      },
      Widgets: {
        Menu: {
          type: Menu
        }
      }
    };
  }

  static _states() {
    return [
      class Widgets extends this {
        $enter(args, widget) {
          this._widget = widget;
          this._refocus();
        }

        _getFocused() {
          return this._widget;
        }
      }
    ];
  }

  // tell page router where to store the pages
  get pages() {
    return this.tag("Pages");
  }

  get widgets() {
    return this.tag("Widgets");
  }

  _getFocused() {
    return Router.getActivePage();
  }
}
