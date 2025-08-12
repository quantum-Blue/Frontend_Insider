import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { b as useRoute, a as useRuntimeConfig, u as useHead } from './server.mjs';
import { a as useLazyFetch } from './fetch-tnqycJzK.mjs';
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
import 'vue-router';
import '@vue/shared';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const personId = route.params.id;
    const showFullBio = ref(false);
    const activeTab = ref("all");
    const displayCount = ref(12);
    const { data: person, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(
      `https://api.themoviedb.org/3/person/${personId}`,
      {
        params: {
          api_key: config.public.tmdbApiKey,
          language: "en-US"
        },
        key: `person-${personId}`
      },
      "$Qs_VrfQv-6"
    )), __temp = await __temp, __restore(), __temp);
    const { data: credits, pending: creditsPending } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits`,
      {
        params: {
          api_key: config.public.tmdbApiKey,
          language: "en-US"
        },
        key: `person-credits-${personId}`
      },
      "$eqSsf9yE0h"
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: computed(() => person.value ? `${person.value.name} - Movie Tracker` : "Person - Movie Tracker"),
      meta: [
        {
          name: "description",
          content: computed(
            () => person.value ? `Learn about ${person.value.name}${person.value.known_for_department ? `, ${person.value.known_for_department}` : ""}. ${person.value.biography ? person.value.biography.substring(0, 160) + "..." : ""}` : "Person details and filmography"
          )
        }
      ]
    });
    const filteredCredits = computed(() => {
      if (!credits.value) return [];
      let allCredits = [];
      if (activeTab.value === "all") {
        allCredits = [
          ...credits.value.cast || [],
          ...credits.value.crew || []
        ];
      } else if (activeTab.value === "acting") {
        allCredits = credits.value.cast || [];
      } else if (activeTab.value === "crew") {
        allCredits = credits.value.crew || [];
      }
      return allCredits.filter((credit) => credit.poster_path).sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "1900-01-01");
        const dateB = new Date(b.release_date || b.first_air_date || "1900-01-01");
        return dateB - dateA;
      });
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const getAge = () => {
      if (!person.value?.birthday) return null;
      const endDate = person.value.deathday ? new Date(person.value.deathday) : /* @__PURE__ */ new Date();
      const birthDate = new Date(person.value.birthday);
      let age = endDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = endDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && endDate.getDate() < birthDate.getDate()) {
        age--;
      }
      return age;
    };
    const getYear = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).getFullYear();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="min-h-screen flex items-center justify-center"><div class="text-center"><div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div><p class="mt-4 text-gray-600">Loading person details...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="min-h-screen flex items-center justify-center"><div class="text-center"><svg class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Error loading person</h3><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(error).message)}</p><button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"> Try Again </button></div></div>`);
      } else if (unref(person)) {
        _push(`<div><div class="relative bg-gray-900">`);
        if (unref(person).profile_path) {
          _push(`<div class="absolute inset-0 opacity-20"><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w1280${unref(person).profile_path}`)}${ssrRenderAttr("alt", unref(person).name)} class="w-full h-full object-cover object-top"><div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="lg:grid lg:grid-cols-3 lg:gap-8"><div class="lg:col-span-1"><div class="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden mx-auto max-w-sm">`);
        if (unref(person).profile_path) {
          _push(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${unref(person).profile_path}`)}${ssrRenderAttr("alt", unref(person).name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center"><svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></div>`);
        }
        _push(`</div></div><div class="mt-8 lg:mt-0 lg:col-span-2"><h1 class="text-4xl font-bold text-white mb-4">${ssrInterpolate(unref(person).name)}</h1><div class="space-y-4">`);
        if (unref(person).known_for_department) {
          _push(`<div class="flex items-center space-x-2"><span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">${ssrInterpolate(unref(person).known_for_department)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">`);
        if (unref(person).birthday) {
          _push(`<div><h3 class="text-sm font-medium text-gray-400">Born</h3><p class="mt-1">${ssrInterpolate(formatDate(unref(person).birthday))} `);
          if (unref(person).place_of_birth) {
            _push(`<span>(${ssrInterpolate(unref(person).place_of_birth)})</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(person).deathday) {
          _push(`<div><h3 class="text-sm font-medium text-gray-400">Died</h3><p class="mt-1">${ssrInterpolate(formatDate(unref(person).deathday))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (getAge()) {
          _push(`<div><h3 class="text-sm font-medium text-gray-400">Age</h3><p class="mt-1">${ssrInterpolate(getAge())} years old</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(person).popularity) {
          _push(`<div><h3 class="text-sm font-medium text-gray-400">Popularity</h3><p class="mt-1">${ssrInterpolate(Math.round(unref(person).popularity))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(person).biography) {
          _push(`<div class="mt-6"><h3 class="text-lg font-medium text-white mb-3">Biography</h3><div class="text-gray-300 leading-relaxed">`);
          if (!showFullBio.value && unref(person).biography.length > 600) {
            _push(`<p>${ssrInterpolate(unref(person).biography.substring(0, 600))}... <button class="text-yellow-400 hover:text-yellow-300 ml-2"> Read more </button></p>`);
          } else {
            _push(`<p>${ssrInterpolate(unref(person).biography)}</p>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h2 class="text-2xl font-bold text-gray-900 mb-8">Known For</h2><div class="mb-6"><nav class="flex space-x-8"><button class="${ssrRenderClass([
          "py-2 px-1 border-b-2 font-medium text-sm",
          activeTab.value === "all" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        ])}"> All (${ssrInterpolate(unref(credits)?.cast?.length + unref(credits)?.crew?.length || 0)}) </button><button class="${ssrRenderClass([
          "py-2 px-1 border-b-2 font-medium text-sm",
          activeTab.value === "acting" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        ])}"> Acting (${ssrInterpolate(unref(credits)?.cast?.length || 0)}) </button>`);
        if (unref(credits)?.crew?.length > 0) {
          _push(`<button class="${ssrRenderClass([
            "py-2 px-1 border-b-2 font-medium text-sm",
            activeTab.value === "crew" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          ])}"> Crew (${ssrInterpolate(unref(credits)?.crew?.length || 0)}) </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</nav></div>`);
        if (unref(creditsPending)) {
          _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-2 text-gray-600">Loading filmography...</p></div>`);
        } else if (filteredCredits.value.length > 0) {
          _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
          ssrRenderList(filteredCredits.value.slice(0, displayCount.value), (credit) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: `${credit.id}-${credit.credit_id}`,
              to: credit.media_type === "tv" ? `/tv/${credit.id}` : `/movie/${credit.id}`,
              class: "group cursor-pointer block"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300"${_scopeId}>`);
                  if (credit.poster_path) {
                    _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${credit.poster_path}`)}${ssrRenderAttr("alt", credit.title || credit.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-full h-full bg-gray-300 flex items-center justify-center"${_scopeId}><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8"${_scopeId}></path></svg></div>`);
                  }
                  _push2(`</div><h3 class="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1"${_scopeId}>${ssrInterpolate(credit.title || credit.name)}</h3><p class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(getYear(credit.release_date || credit.first_air_date))}</p>`);
                  if (credit.character || credit.job) {
                    _push2(`<p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(credit.character || credit.job)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300" }, [
                      credit.poster_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `https://image.tmdb.org/t/p/w500${credit.poster_path}`,
                        alt: credit.title || credit.name,
                        class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full h-full bg-gray-300 flex items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-12 h-12 text-gray-400",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8"
                          })
                        ]))
                      ]))
                    ]),
                    createVNode("h3", { class: "font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1" }, toDisplayString(credit.title || credit.name), 1),
                    createVNode("p", { class: "text-xs text-gray-600" }, toDisplayString(getYear(credit.release_date || credit.first_air_date)), 1),
                    credit.character || credit.job ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-gray-500"
                    }, toDisplayString(credit.character || credit.job), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filteredCredits.value.length > displayCount.value) {
          _push(`<div class="text-center mt-8"><button class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"> Show More </button></div>`);
        } else if (!unref(creditsPending)) {
          _push(`<div class="text-center py-8"><p class="text-gray-500">No filmography available.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/person/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DR5ozLuL.mjs.map
