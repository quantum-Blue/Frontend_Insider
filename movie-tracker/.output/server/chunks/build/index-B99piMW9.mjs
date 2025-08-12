import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { _ as __nuxt_component_1 } from './PosterCard-DjNKAHYT.mjs';
import { ref, mergeProps, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { c as useSeoMeta } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './favorites-foySpqDT.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "TV Shows - Movie Tracker",
      ogTitle: "TV Shows - Movie Tracker",
      description: "Explore the best TV series, from trending shows to classic series. Find your next binge-worthy TV show.",
      ogDescription: "Explore the best TV series, from trending shows to classic series. Find your next binge-worthy TV show."
    });
    const featuredTvShows = ref([]);
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PosterCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4"> TV Shows </h1><p class="text-lg text-gray-600 max-w-3xl mx-auto"> Explore the best TV series, from trending shows to classic series. Find your next binge-worthy TV show. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv/popular",
        class: "group bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="p-3 bg-white/20 rounded-lg"${_scopeId}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"${_scopeId}></path></svg></div><span class="text-3xl font-bold opacity-20"${_scopeId}>01</span></div><h3 class="text-xl font-bold mb-2 group-hover:text-blue-100 transition-colors"${_scopeId}>Popular</h3><p class="text-blue-100 text-sm"${_scopeId}>Most popular TV shows right now</p><div class="mt-4 flex items-center text-sm"${_scopeId}><span${_scopeId}>Explore</span><svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "p-3 bg-white/20 rounded-lg" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-8 h-8",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    })
                  ]))
                ]),
                createVNode("span", { class: "text-3xl font-bold opacity-20" }, "01")
              ]),
              createVNode("h3", { class: "text-xl font-bold mb-2 group-hover:text-blue-100 transition-colors" }, "Popular"),
              createVNode("p", { class: "text-blue-100 text-sm" }, "Most popular TV shows right now"),
              createVNode("div", { class: "mt-4 flex items-center text-sm" }, [
                createVNode("span", null, "Explore"),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv/now-playing",
        class: "group bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="p-3 bg-white/20 rounded-lg"${_scopeId}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><span class="text-3xl font-bold opacity-20"${_scopeId}>02</span></div><h3 class="text-xl font-bold mb-2 group-hover:text-green-100 transition-colors"${_scopeId}>Now Playing</h3><p class="text-green-100 text-sm"${_scopeId}>TV shows airing today</p><div class="mt-4 flex items-center text-sm"${_scopeId}><span${_scopeId}>Explore</span><svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "p-3 bg-white/20 rounded-lg" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-8 h-8",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ]))
                ]),
                createVNode("span", { class: "text-3xl font-bold opacity-20" }, "02")
              ]),
              createVNode("h3", { class: "text-xl font-bold mb-2 group-hover:text-green-100 transition-colors" }, "Now Playing"),
              createVNode("p", { class: "text-green-100 text-sm" }, "TV shows airing today"),
              createVNode("div", { class: "mt-4 flex items-center text-sm" }, [
                createVNode("span", null, "Explore"),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv/upcoming",
        class: "group bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="p-3 bg-white/20 rounded-lg"${_scopeId}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div><span class="text-3xl font-bold opacity-20"${_scopeId}>03</span></div><h3 class="text-xl font-bold mb-2 group-hover:text-purple-100 transition-colors"${_scopeId}>Upcoming</h3><p class="text-purple-100 text-sm"${_scopeId}>Shows that aired in the past 7 days</p><div class="mt-4 flex items-center text-sm"${_scopeId}><span${_scopeId}>Explore</span><svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "p-3 bg-white/20 rounded-lg" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-8 h-8",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ]))
                ]),
                createVNode("span", { class: "text-3xl font-bold opacity-20" }, "03")
              ]),
              createVNode("h3", { class: "text-xl font-bold mb-2 group-hover:text-purple-100 transition-colors" }, "Upcoming"),
              createVNode("p", { class: "text-purple-100 text-sm" }, "Shows that aired in the past 7 days"),
              createVNode("div", { class: "mt-4 flex items-center text-sm" }, [
                createVNode("span", null, "Explore"),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv/top-rated",
        class: "group bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="p-3 bg-white/20 rounded-lg"${_scopeId}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"${_scopeId}></path></svg></div><span class="text-3xl font-bold opacity-20"${_scopeId}>04</span></div><h3 class="text-xl font-bold mb-2 group-hover:text-orange-100 transition-colors"${_scopeId}>Top Rated</h3><p class="text-orange-100 text-sm"${_scopeId}>Highest rated TV shows of all time</p><div class="mt-4 flex items-center text-sm"${_scopeId}><span${_scopeId}>Explore</span><svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "p-3 bg-white/20 rounded-lg" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-8 h-8",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    })
                  ]))
                ]),
                createVNode("span", { class: "text-3xl font-bold opacity-20" }, "04")
              ]),
              createVNode("h3", { class: "text-xl font-bold mb-2 group-hover:text-orange-100 transition-colors" }, "Top Rated"),
              createVNode("p", { class: "text-orange-100 text-sm" }, "Highest rated TV shows of all time"),
              createVNode("div", { class: "mt-4 flex items-center text-sm" }, [
                createVNode("span", null, "Explore"),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-gray-50 rounded-2xl p-8"><div class="flex items-center justify-between mb-8"><div><h2 class="text-2xl font-bold text-gray-900 mb-2">Featured TV Shows</h2><p class="text-gray-600">Check out some popular TV shows</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tv/popular",
        class: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All `);
          } else {
            return [
              createTextVNode(" View All ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="animate-pulse"><div class="bg-gray-300 rounded-lg aspect-[2/3] mb-3"></div><div class="h-4 bg-gray-300 rounded mb-2"></div><div class="h-3 bg-gray-300 rounded w-2/3"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (featuredTvShows.value.length > 0) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
        ssrRenderList(featuredTvShows.value.slice(0, 6), (show) => {
          _push(ssrRenderComponent(_component_PosterCard, {
            key: show.id,
            item: show,
            type: "tv"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">Unable to load TV shows</h3><p class="text-gray-500 mb-4">Please try again later.</p><button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"> Retry </button></div>`);
      }
      _push(`</div><div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg"><svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div><div class="ml-4"><p class="text-2xl font-bold text-gray-900">150K+</p><p class="text-gray-600">TV Shows Available</p></div></div></div><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg"><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-4"><p class="text-2xl font-bold text-gray-900">Daily</p><p class="text-gray-600">Updates</p></div></div></div><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg"><svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></div><div class="ml-4"><p class="text-2xl font-bold text-gray-900">HD Quality</p><p class="text-gray-600">Information</p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B99piMW9.mjs.map
