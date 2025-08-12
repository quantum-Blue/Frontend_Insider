import { ref, computed, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_1 } from './PosterCard-DjNKAHYT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { c as useSeoMeta, b as useRoute, d as useRouter, a as useRuntimeConfig } from './server.mjs';
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
import './favorites-foySpqDT.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';

const _sfc_main$1 = {
  __name: "SearchInput",
  __ssrInlineRender: true,
  emits: ["search", "clear"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const searchQuery = ref("");
    const clearSearch = () => {
      searchQuery.value = "";
      emit("clear");
    };
    __expose({
      searchQuery,
      clearSearch
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative max-w-md mx-auto" }, _attrs))}><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search movies and TV shows..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>`);
      if (searchQuery.value) {
        _push(`<button class="absolute inset-y-0 right-0 pr-3 flex items-center"><svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(!searchQuery.value.trim()) ? " disabled" : ""} class="mt-3 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"> Search </button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Search - Movie Tracker",
      ogTitle: "Search - Movie Tracker",
      description: "Search for your favorite movies and TV shows. Find detailed information, ratings, and more.",
      ogDescription: "Search for your favorite movies and TV shows. Find detailed information, ratings, and more."
    });
    const config = useRuntimeConfig();
    useRoute();
    const router = useRouter();
    const searchResults = ref([]);
    const loading = ref(false);
    const loadingMore = ref(false);
    const error = ref(null);
    const hasSearched = ref(false);
    const lastQuery = ref("");
    const activeFilter = ref("all");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalResults = ref(0);
    const searchInput = ref(null);
    const movieResults = computed(
      () => searchResults.value.filter((item) => item.media_type === "movie")
    );
    const tvResults = computed(
      () => searchResults.value.filter((item) => item.media_type === "tv")
    );
    const personResults = computed(
      () => searchResults.value.filter((item) => item.media_type === "person")
    );
    const filteredResults = computed(() => {
      switch (activeFilter.value) {
        case "movie":
          return movieResults.value;
        case "tv":
          return tvResults.value;
        case "person":
          return personResults.value;
        default:
          return searchResults.value;
      }
    });
    const paginatedResults = computed(() => {
      return filteredResults.value;
    });
    const hasMore = computed(() => currentPage.value < totalPages.value);
    const handleSearch = async (query, page = 1, append = false) => {
      if (!query?.trim()) return;
      if (page === 1) {
        loading.value = true;
        hasSearched.value = true;
        lastQuery.value = query;
        await router.push({
          path: "/search",
          query: { q: query }
        });
      } else {
        loadingMore.value = true;
      }
      error.value = null;
      try {
        const response = await $fetch(`${config.public.tmdbBaseUrl}/search/multi`, {
          params: {
            api_key: config.public.tmdbApiKey,
            language: "en-US",
            query,
            page
          }
        });
        const results = response.results?.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv" || item.media_type === "person"
        ) || [];
        if (append) {
          searchResults.value = [...searchResults.value, ...results];
        } else {
          searchResults.value = results;
        }
        currentPage.value = response.page || 1;
        totalPages.value = response.total_pages || 1;
        totalResults.value = response.total_results || 0;
      } catch (err) {
        error.value = "Failed to search. Please try again.";
        console.error("Error searching:", err);
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    };
    const clearResults = () => {
      searchResults.value = [];
      hasSearched.value = false;
      lastQuery.value = "";
      activeFilter.value = "all";
      currentPage.value = 1;
      router.push({ path: "/search" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchInput = _sfc_main$1;
      const _component_PosterCard = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4"> Search </h1><p class="text-gray-600 max-w-2xl mx-auto"> Find your favorite movies and TV shows. Search by title, actor, director, or genre. </p></div><div class="max-w-2xl mx-auto mb-8">`);
      _push(ssrRenderComponent(_component_SearchInput, {
        ref_key: "searchInput",
        ref: searchInput,
        onSearch: handleSearch,
        onClear: clearResults
      }, null, _parent));
      _push(`</div>`);
      if (searchResults.value.length > 0) {
        _push(`<div class="flex justify-center mb-6"><div class="bg-gray-100 rounded-lg p-1"><button class="${ssrRenderClass([
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilter.value === "all" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-800"
        ])}"> All (${ssrInterpolate(searchResults.value.length)}) </button><button class="${ssrRenderClass([
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilter.value === "movie" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-800"
        ])}"> Movies (${ssrInterpolate(movieResults.value.length)}) </button><button class="${ssrRenderClass([
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilter.value === "tv" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-800"
        ])}"> TV Shows (${ssrInterpolate(tvResults.value.length)}) </button><button class="${ssrRenderClass([
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilter.value === "person" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-800"
        ])}"> People (${ssrInterpolate(personResults.value.length)}) </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-4 text-gray-600">Searching...</p></div>`);
      } else if (error.value) {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">Search Error</h3><p class="text-gray-500 mb-4">${ssrInterpolate(error.value)}</p><button class="btn-primary"> Try Again </button></div>`);
      } else if (!hasSearched.value) {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3><p class="text-gray-500">Enter a movie or TV show title to begin exploring.</p></div>`);
      } else if (searchResults.value.length === 0) {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.911-5.676-2.384C6.306 12.5 6.286 12.381 6.272 12.264A8 8 0 1112 4a7.963 7.963 0 014.834 1.646"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No Results Found</h3><p class="text-gray-500 mb-4">Sorry, we couldn&#39;t find any results for &quot;${ssrInterpolate(lastQuery.value)}&quot;</p><p class="text-sm text-gray-400">Try searching with different keywords or check your spelling.</p></div>`);
      } else {
        _push(`<div class="space-y-8"><div class="text-center"><p class="text-gray-600"> Found ${ssrInterpolate(filteredResults.value.length)} result${ssrInterpolate(filteredResults.value.length !== 1 ? "s" : "")} `);
        if (lastQuery.value) {
          _push(`<span>for &quot;${ssrInterpolate(lastQuery.value)}&quot;</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">`);
        if (activeFilter.value !== "person") {
          _push(`<!--[-->`);
          ssrRenderList(paginatedResults.value, (item) => {
            _push(ssrRenderComponent(_component_PosterCard, {
              key: `${item.media_type || "movie"}-${item.id}`,
              item,
              type: item.media_type || "movie"
            }, null, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(paginatedResults.value, (person) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: `person-${person.id}`,
              to: `/person/${person.id}`,
              class: "group cursor-pointer block"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300"${_scopeId}>`);
                  if (person.profile_path) {
                    _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${person.profile_path}`)}${ssrRenderAttr("alt", person.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-full h-full bg-gray-300 flex items-center justify-center"${_scopeId}><svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
                  }
                  _push2(`</div><h3 class="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(person.name)}</h3>`);
                  if (person.known_for_department) {
                    _push2(`<p class="text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(person.known_for_department)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (person.known_for && person.known_for.length > 0) {
                    _push2(`<div class="mt-1"${_scopeId}><p class="text-xs text-gray-500"${_scopeId}> Known for: ${ssrInterpolate(person.known_for.slice(0, 2).map((item) => item.title || item.name).join(", "))}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300" }, [
                      person.profile_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `https://image.tmdb.org/t/p/w500${person.profile_path}`,
                        alt: person.name,
                        class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full h-full bg-gray-300 flex items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-16 h-16 text-gray-400",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                            "clip-rule": "evenodd"
                          })
                        ]))
                      ]))
                    ]),
                    createVNode("h3", { class: "font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors" }, toDisplayString(person.name), 1),
                    person.known_for_department ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-gray-600 text-xs"
                    }, toDisplayString(person.known_for_department), 1)) : createCommentVNode("", true),
                    person.known_for && person.known_for.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-1"
                    }, [
                      createVNode("p", { class: "text-xs text-gray-500" }, " Known for: " + toDisplayString(person.known_for.slice(0, 2).map((item) => item.title || item.name).join(", ")), 1)
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
        if (hasMore.value) {
          _push(`<div class="text-center"><button${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} class="btn-secondary">`);
          if (loadingMore.value) {
            _push(`<span>Loading...</span>`);
          } else {
            _push(`<span>Load More</span>`);
          }
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center text-sm text-gray-500"> Showing ${ssrInterpolate(paginatedResults.value.length)} of ${ssrInterpolate(totalResults.value)} results </div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-CS5NrFMt.mjs.map
