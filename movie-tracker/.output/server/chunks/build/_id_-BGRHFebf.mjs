import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { ref, withAsyncContext, computed, withCtx, createTextVNode, unref, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useFavoritesStore } from './favorites-foySpqDT.mjs';
import { b as useRoute, a as useRuntimeConfig, c as useSeoMeta } from './server.mjs';
import { u as useFetch } from './fetch-tnqycJzK.mjs';
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
    const favoritesStore = useFavoritesStore();
    const expandCast = ref(false);
    const { data: movie, pending: moviePending, error: movieError } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/movie/${route.params.id}`, {
      baseURL: config.public.tmdbBaseUrl,
      params: {
        api_key: config.public.tmdbApiKey
      }
    }, "$LF9gM406FE")), __temp = await __temp, __restore(), __temp);
    const { data: credits, pending: creditsPending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/movie/${route.params.id}/credits`, {
      baseURL: config.public.tmdbBaseUrl,
      params: {
        api_key: config.public.tmdbApiKey
      }
    }, "$xsMmhP3F6v")), __temp = await __temp, __restore(), __temp);
    const { data: similar, pending: similarPending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/movie/${route.params.id}/similar`, {
      baseURL: config.public.tmdbBaseUrl,
      params: {
        api_key: config.public.tmdbApiKey,
        language: "en-US",
        page: 1
      }
    }, "$6CDZ-qTMww")), __temp = await __temp, __restore(), __temp);
    const pending = computed(() => moviePending.value || creditsPending.value || similarPending.value);
    const error = computed(() => movieError.value);
    const posterUrl = computed(() => {
      if (!movie.value?.poster_path) return "/placeholder-poster.svg";
      return `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`;
    });
    const isFavorite = computed(() => {
      if (!movie.value) return false;
      return favoritesStore.isFavorite(movie.value.id, "movie");
    });
    const formatReleaseDate = (dateString) => {
      if (!dateString) return "Unknown";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatRuntime = (minutes) => {
      if (!minutes) return "Unknown";
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };
    const formatMoney = (amount) => {
      return new Intl.NumberFormat("en-US").format(amount);
    };
    const handleActorImageError = (event) => {
      event.target.style.display = "none";
      const parent = event.target.parentElement;
      const placeholder = parent.querySelector("div");
      if (placeholder) {
        placeholder.style.display = "flex";
      }
    };
    const handleSimilarImageError = (event) => {
      event.target.style.display = "none";
      const parent = event.target.parentElement;
      const placeholder = parent.querySelector("div");
      if (placeholder) {
        placeholder.style.display = "flex";
      }
    };
    useSeoMeta({
      title: () => {
        if (!movie.value) return "Movie Details - Movie Tracker";
        const year = movie.value.release_date ? ` (${new Date(movie.value.release_date).getFullYear()})` : "";
        return `${movie.value.title}${year} - Movie Tracker`;
      },
      ogTitle: () => {
        if (!movie.value) return "Movie Details - Movie Tracker";
        const year = movie.value.release_date ? ` (${new Date(movie.value.release_date).getFullYear()})` : "";
        return `${movie.value.title}${year} - Movie Tracker`;
      },
      description: () => movie.value?.overview || "Discover movie details, cast, and ratings on Movie Tracker.",
      ogDescription: () => movie.value?.overview || "Discover movie details, cast, and ratings on Movie Tracker.",
      ogImage: () => movie.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.value.backdrop_path}` : void 0,
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (pending.value) {
        _push(`<div class="min-h-screen bg-gray-50"><div class="container mx-auto px-4 py-8"><div class="animate-pulse"><div class="flex flex-col lg:flex-row gap-8 mb-12"><div class="lg:w-1/3"><div class="aspect-[2/3] bg-gray-300 rounded-lg"></div></div><div class="lg:w-2/3 space-y-4"><div class="h-8 bg-gray-300 rounded w-3/4"></div><div class="flex gap-4"><div class="h-6 bg-gray-300 rounded w-20"></div><div class="h-6 bg-gray-300 rounded w-16"></div><div class="h-6 bg-gray-300 rounded w-24"></div></div><div class="space-y-2"><div class="h-4 bg-gray-300 rounded"></div><div class="h-4 bg-gray-300 rounded w-5/6"></div><div class="h-4 bg-gray-300 rounded w-4/6"></div></div></div></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="space-y-2"><div class="aspect-[2/3] bg-gray-300 rounded-lg"></div><div class="h-4 bg-gray-300 rounded"></div><div class="h-3 bg-gray-300 rounded w-3/4"></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (error.value) {
        _push(`<div class="min-h-screen bg-gray-50 flex items-center justify-center"><div class="text-center py-12 px-4"><div class="mb-6"><svg class="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h1 class="text-3xl font-bold text-gray-900 mb-4">Movie Not Found</h1><p class="text-lg text-gray-600 mb-8">${ssrInterpolate(error.value.message || "The movie you're looking for doesn't exist or has been removed.")}</p><div class="space-x-4"><button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"> Go Back </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Home `);
            } else {
              return [
                createTextVNode(" Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else if (unref(movie)) {
        _push(`<div class="min-h-screen bg-gray-50">`);
        if (unref(movie).backdrop_path) {
          _push(`<div class="relative h-96 lg:h-[500px] bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${unref(movie).backdrop_path})` })}"><div class="absolute inset-0 bg-black/50"></div><div class="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="container mx-auto px-4"><div class="relative -mt-32 lg:-mt-40 pb-12"><div class="flex flex-col lg:flex-row gap-8"><div class="lg:w-1/3 flex-shrink-0"><div class="relative"><img${ssrRenderAttr("src", posterUrl.value)}${ssrRenderAttr("alt", unref(movie).title)} class="w-full max-w-sm mx-auto lg:mx-0 rounded-xl shadow-2xl"><button class="${ssrRenderClass([isFavorite.value ? "bg-red-500/90 text-white hover:bg-red-600/90" : "bg-black/50 text-white hover:bg-black/70", "absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"])}"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">`);
        if (isFavorite.value) {
          _push(`<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>`);
        } else {
          _push(`<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" stroke="currentColor" stroke-width="2" fill="none"></path>`);
        }
        _push(`</svg></button></div></div><div class="lg:w-2/3 bg-white rounded-xl shadow-xl p-8"><div class="mb-6"><h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">${ssrInterpolate(unref(movie).title)}</h1>`);
        if (unref(movie).tagline) {
          _push(`<p class="text-xl text-gray-600 italic">${ssrInterpolate(unref(movie).tagline)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-wrap items-center gap-6 mb-6"><div class="flex items-center gap-2"><svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg><span class="text-xl font-semibold text-gray-900">${ssrInterpolate(unref(movie).vote_average?.toFixed(1) || "N/A")}</span><span class="text-gray-500">/10</span></div><div class="flex items-center gap-2 text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="font-medium">${ssrInterpolate(formatReleaseDate(unref(movie).release_date))}</span></div>`);
        if (unref(movie).runtime) {
          _push(`<div class="flex items-center gap-2 text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-medium">${ssrInterpolate(formatRuntime(unref(movie).runtime))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(movie).genres?.length) {
          _push(`<div class="mb-6"><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(movie).genres, (genre) => {
            _push(`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">${ssrInterpolate(genre.name)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(movie).overview) {
          _push(`<div class="mb-8"><h2 class="text-2xl font-bold text-gray-900 mb-3">Overview</h2><p class="text-gray-700 leading-relaxed text-lg">${ssrInterpolate(unref(movie).overview)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">`);
        if (unref(movie).budget && unref(movie).budget > 0) {
          _push(`<div class="flex justify-between py-2 border-b border-gray-200"><span class="font-semibold text-gray-600">Budget:</span><span class="text-gray-900">$${ssrInterpolate(formatMoney(unref(movie).budget))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(movie).revenue && unref(movie).revenue > 0) {
          _push(`<div class="flex justify-between py-2 border-b border-gray-200"><span class="font-semibold text-gray-600">Revenue:</span><span class="text-gray-900">$${ssrInterpolate(formatMoney(unref(movie).revenue))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(movie).original_language) {
          _push(`<div class="flex justify-between py-2 border-b border-gray-200"><span class="font-semibold text-gray-600">Language:</span><span class="text-gray-900">${ssrInterpolate(unref(movie).original_language.toUpperCase())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(movie).status) {
          _push(`<div class="flex justify-between py-2 border-b border-gray-200"><span class="font-semibold text-gray-600">Status:</span><span class="text-gray-900">${ssrInterpolate(unref(movie).status)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
        if (unref(credits)?.cast?.length) {
          _push(`<div class="pb-12"><div class="bg-white rounded-xl shadow-xl p-8"><h2 class="text-3xl font-bold text-gray-900 mb-8">Cast</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
          ssrRenderList(unref(credits).cast.slice(0, 12), (actor) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: actor.id,
              to: `/person/${actor.id}`,
              class: "text-center group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="relative mb-3"${_scopeId}>`);
                  if (actor.profile_path) {
                    _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w185${actor.profile_path}`)}${ssrRenderAttr("alt", actor.name)} class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
                  }
                  _push2(`</div><h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(actor.name)}</h3><p class="text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(actor.character)}</p>`);
                } else {
                  return [
                    createVNode("div", { class: "relative mb-3" }, [
                      actor.profile_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
                        alt: actor.name,
                        class: "w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow",
                        onError: handleActorImageError
                      }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-gray-400",
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
                    createVNode("h3", { class: "font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors" }, toDisplayString(actor.name), 1),
                    createVNode("p", { class: "text-gray-600 text-xs" }, toDisplayString(actor.character), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
          if (unref(credits).cast.length > 12) {
            _push(`<div class="text-center mt-8"><button class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">${ssrInterpolate(expandCast.value ? "Show Less" : `View All Cast (${unref(credits).cast.length})`)}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          if (expandCast.value && unref(credits).cast.length > 12) {
            _push(`<div class="mt-8"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
            ssrRenderList(unref(credits).cast.slice(12), (actor) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: actor.id,
                to: `/person/${actor.id}`,
                class: "text-center group"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div class="relative mb-3"${_scopeId}>`);
                    if (actor.profile_path) {
                      _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w185${actor.profile_path}`)}${ssrRenderAttr("alt", actor.name)} class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"${_scopeId}>`);
                    } else {
                      _push2(`<div class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
                    }
                    _push2(`</div><h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(actor.name)}</h3><p class="text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(actor.character)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "relative mb-3" }, [
                        actor.profile_path ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
                          alt: actor.name,
                          class: "w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow",
                          onError: handleActorImageError
                        }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-gray-400",
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
                      createVNode("h3", { class: "font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors" }, toDisplayString(actor.name), 1),
                      createVNode("p", { class: "text-gray-600 text-xs" }, toDisplayString(actor.character), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(similar)?.results?.length) {
          _push(`<div class="pb-12"><div class="bg-white rounded-xl shadow-xl p-8"><h2 class="text-3xl font-bold text-gray-900 mb-8">Similar Movies</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"><!--[-->`);
          ssrRenderList(unref(similar).results.slice(0, 6), (similarMovie) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: similarMovie.id,
              to: `/movie/${similarMovie.id}`,
              class: "group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="relative mb-3"${_scopeId}>`);
                  if (similarMovie.poster_path) {
                    _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w342${similarMovie.poster_path}`)}${ssrRenderAttr("alt", similarMovie.title)} class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"${_scopeId}></path></svg></div>`);
                  }
                  _push2(`</div><h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(similarMovie.title)}</h3>`);
                  if (similarMovie.release_date) {
                    _push2(`<p class="text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(new Date(similarMovie.release_date).getFullYear())}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "relative mb-3" }, [
                      similarMovie.poster_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `https://image.tmdb.org/t/p/w342${similarMovie.poster_path}`,
                        alt: similarMovie.title,
                        class: "w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow",
                        onError: handleSimilarImageError
                      }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-gray-400",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                          })
                        ]))
                      ]))
                    ]),
                    createVNode("h3", { class: "font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors" }, toDisplayString(similarMovie.title), 1),
                    similarMovie.release_date ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-gray-600 text-xs"
                    }, toDisplayString(new Date(similarMovie.release_date).getFullYear()), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movie/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BGRHFebf.mjs.map
