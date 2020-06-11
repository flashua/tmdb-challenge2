import {Router} from "wpe-lightning-sdk";

/**
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 */

import { Main, Splash } from '../pages';

export default () =>{
    Router.root('splash', Splash);
    Router.route('movies', Main);
    Router.start();
}
