import { _ as __nuxt_component_1 } from './PosterCard-DjNKAHYT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { ref, reactive, computed, watch, withCtx, createTextVNode, createBlock, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useFavoritesStore } from './favorites-foySpqDT.mjs';
import { c as useSeoMeta, a as useRuntimeConfig } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "TMDB Clone - The Movie Database",
      ogTitle: "TMDB Clone - The Movie Database",
      description: "Millions of movies, TV shows and people to discover. Explore now.",
      ogDescription: "Millions of movies, TV shows and people to discover. Explore now."
    });
    const config = useRuntimeConfig();
    const favoritesStore = useFavoritesStore();
    const searchQuery = ref("");
    const searchResults = ref([]);
    const trendingType = ref("movie");
    const popularMovies = ref([]);
    const popularTvShows = ref([]);
    const loading = reactive({
      search: false,
      trending: false
    });
    const favoriteMovies = computed(() => favoritesStore.favoriteMovies);
    const favoriteTvShows = computed(() => favoritesStore.favoriteTvShows);
    const totalFavorites = computed(() => favoritesStore.favorites.length);
    const currentTrending = computed(() => {
      return trendingType.value === "movie" ? popularMovies.value : popularTvShows.value;
    });
    const fetchTrendingContent = async () => {
      loading.trending = true;
      try {
        const moviesResponse = await $fetch("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: config.public.tmdbApiKey,
            language: "en-US",
            page: 1
          }
        });
        popularMovies.value = moviesResponse.results?.slice(0, 20) || [];
        const tvResponse = await $fetch("https://api.themoviedb.org/3/tv/popular", {
          params: {
            api_key: config.public.tmdbApiKey,
            language: "en-US",
            page: 1
          }
        });
        popularTvShows.value = tvResponse.results?.slice(0, 20) || [];
      } catch (error) {
        console.error("Error fetching trending content:", error);
      } finally {
        loading.trending = false;
      }
    };
    watch(trendingType, () => {
      if (currentTrending.value.length === 0) {
        fetchTrendingContent();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PosterCard = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><div class="text-center"><h1 class="text-4xl md:text-6xl font-bold mb-6"> Welcome to TMDB Clone </h1><p class="text-xl md:text-2xl mb-8 text-blue-100"> Millions of movies, TV shows and people to discover. Explore now. </p><div class="max-w-2xl mx-auto"><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search for a movie, tv show, person..." class="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 pr-16"><button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-200 font-semibold"> Search </button></div></div></div></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
      if (searchResults.value.length > 0) {
        _push(`<div class="py-8"><h2 class="text-2xl font-bold mb-6">Search Results</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(searchResults.value.slice(0, 12), (item) => {
          _push(ssrRenderComponent(_component_PosterCard, {
            key: `${item.media_type || "movie"}-${item.id}`,
            item,
            type: item.media_type || "movie"
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="text-center mt-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/search",
          class: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View All Results <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" View All Results "),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="py-12"><div class="mb-8"><h2 class="text-3xl font-bold mb-4">What&#39;s Popular</h2><div class="flex space-x-4"><button class="${ssrRenderClass([
        "px-6 py-2 rounded-full font-semibold transition-all",
        trendingType.value === "movie" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      ])}"> Movies </button><button class="${ssrRenderClass([
        "px-6 py-2 rounded-full font-semibold transition-all",
        trendingType.value === "tv" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      ])}"> TV Shows </button></div></div>`);
      if (loading.trending) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-4 text-gray-600">Loading trending content...</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(currentTrending.value, (item) => {
          _push(ssrRenderComponent(_component_PosterCard, {
            key: item.id,
            item,
            type: trendingType.value
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="text-center mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: trendingType.value === "movie" ? "/movies/popular" : "/tv/popular",
        class: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View More ${ssrInterpolate(trendingType.value === "movie" ? "Movies" : "TV Shows")} <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" View More " + toDisplayString(trendingType.value === "movie" ? "Movies" : "TV Shows") + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 ml-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 5l7 7-7 7"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl mb-12"><div class="text-center px-8"><h2 class="text-3xl font-bold mb-8">Your Collection</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="bg-white rounded-xl p-6 shadow-lg"><div class="text-4xl font-bold text-blue-600 mb-2">${ssrInterpolate(favoriteMovies.value.length)}</div><div class="text-gray-600 font-medium">Favorite Movies</div></div><div class="bg-white rounded-xl p-6 shadow-lg"><div class="text-4xl font-bold text-purple-600 mb-2">${ssrInterpolate(favoriteTvShows.value.length)}</div><div class="text-gray-600 font-medium">Favorite TV Shows</div></div><div class="bg-white rounded-xl p-6 shadow-lg"><div class="text-4xl font-bold text-green-600 mb-2">${ssrInterpolate(totalFavorites.value)}</div><div class="text-gray-600 font-medium">Total Favorites</div></div></div><div class="mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favorites",
        class: "inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View My Favorites <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" View My Favorites "),
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 ml-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 5l7 7-7 7"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BFLxstI9.mjs.map
