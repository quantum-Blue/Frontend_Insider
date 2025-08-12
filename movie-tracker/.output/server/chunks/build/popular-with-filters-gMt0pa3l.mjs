import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { u as useFiltersStore, _ as __nuxt_component_1, a as _sfc_main$1 } from './ActiveFilters-CFFEaZ_2.mjs';
import { _ as __nuxt_component_1$1 } from './PosterCard-DjNKAHYT.mjs';
import { ref, computed, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as useSeoMeta, b as useRoute, d as useRouter, a as useRuntimeConfig } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './favorites-foySpqDT.mjs';
import 'vue-router';

const category = "tv-popular";
const _sfc_main = {
  __name: "popular-with-filters",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Popular TV Shows - Movie Tracker",
      ogTitle: "Popular TV Shows - Movie Tracker",
      description: "Discover the most popular TV shows right now. Browse trending titles and find your next favorite series.",
      ogDescription: "Discover the most popular TV shows right now. Browse trending titles and find your next favorite series."
    });
    const filtersStore = useFiltersStore();
    const config = useRuntimeConfig();
    useRoute();
    const router = useRouter();
    const tvShows = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalResults = ref(0);
    computed(() => filtersStore.getFilters(category));
    const hasActiveFilters = computed(() => filtersStore.hasActiveFilters(category));
    const hasMorePages = computed(() => currentPage.value < totalPages.value);
    const fetchTvShows = async (page = 1, append = false) => {
      loading.value = true;
      error.value = null;
      try {
        const params = filtersStore.buildApiParams(category, config.public.tmdbApiKey);
        const endpoint = hasActiveFilters.value ? "/discover/tv" : "/tv/popular";
        const response = await $fetch(`${config.public.tmdbBaseUrl}${endpoint}`, {
          params: {
            ...params,
            page
          }
        });
        if (append) {
          tvShows.value = [...tvShows.value, ...response.results];
        } else {
          tvShows.value = response.results;
        }
        currentPage.value = response.page;
        totalPages.value = response.total_pages;
        totalResults.value = response.total_results;
        const query = filtersStore.buildUrlQuery(category);
        if (Object.keys(query).length > 0) {
          await router.replace({ query });
        } else {
          await router.replace({ query: {} });
        }
      } catch (err) {
        console.error("Error fetching TV shows:", err);
        error.value = "Failed to load TV shows. Please try again.";
      } finally {
        loading.value = false;
      }
    };
    const handleFiltersChanged = () => {
      currentPage.value = 1;
      fetchTvShows();
    };
    watch(
      () => filtersStore.getFilters(category),
      (newFilters) => {
        if (newFilters) {
          fetchTvShows();
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_FilterSidebar = __nuxt_component_1;
      const _component_ActiveFilters = _sfc_main$1;
      const _component_PosterCard = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><nav class="mb-6"><ol class="flex items-center space-x-2 text-sm text-gray-500"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>/</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv",
        class: "hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`TV Shows`);
          } else {
            return [
              createTextVNode("TV Shows")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>/</li><li class="text-gray-900 font-medium">Popular</li></ol></nav><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900">Popular TV Shows</h1><p class="text-gray-600 mt-2"> Most popular TV shows trending right now </p></div><div class="flex gap-8">`);
      _push(ssrRenderComponent(_component_FilterSidebar, { category }, null, _parent));
      _push(`<div class="flex-1">`);
      _push(ssrRenderComponent(_component_ActiveFilters, {
        category,
        class: "mb-6",
        onFiltersChanged: handleFiltersChanged
      }, null, _parent));
      if (loading.value && tvShows.value.length === 0) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(20, (n) => {
          _push(`<div class="animate-pulse"><div class="aspect-[2/3] bg-gray-300 rounded-lg mb-4"></div><div class="h-4 bg-gray-300 rounded mb-2"></div><div class="h-3 bg-gray-300 rounded w-2/3"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (error.value) {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading TV Shows</h3><p class="text-gray-500 mb-4">${ssrInterpolate(error.value)}</p><button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"> Try Again </button></div>`);
      } else if (tvShows.value.length > 0) {
        _push(`<div class="space-y-8"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(tvShows.value, (tvShow) => {
          _push(ssrRenderComponent(_component_PosterCard, {
            key: tvShow.id,
            item: tvShow,
            type: "tv"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (hasMorePages.value) {
          _push(`<div class="text-center"><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
          if (loading.value) {
            _push(`<span>Loading...</span>`);
          } else {
            _push(`<span>Load More</span>`);
          }
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center text-sm text-gray-500"> Showing ${ssrInterpolate(tvShows.value.length)} of ${ssrInterpolate(totalResults.value.toLocaleString())} results </div></div>`);
      } else {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.911-5.676-2.384C6.306 12.5 6.286 12.381 6.272 12.264A8 8 0 1112 4a7.963 7.963 0 014.834 1.646"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No TV Shows Found</h3><p class="text-gray-500 mb-4">Try adjusting your filters to see more results.</p><button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"> Clear Filters </button></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/popular-with-filters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=popular-with-filters-gMt0pa3l.mjs.map
