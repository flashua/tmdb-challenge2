import { Router } from "wpe-lightning-sdk";
import { getMovies, getImgUrl, getVodMenu } from "./api";

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
 */
export default () => {
  Router.boot(async () => {
    Router.navigate("splash");
  });

  Router.before(
    "movies",
    async ({ page }) => {
      const { results } = await getMovies();
      page.movies = results.map(item => ({
        ...item,
        posterUrl: getImgUrl(item.poster_path),
        posterWidth: 220,
        posterHeight: 330
      }));

      page.menu = await getVodMenu();
    },
    500
  );
};
