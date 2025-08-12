import { _ as __nuxt_component_0 } from './nuxt-link-CE5i-Arg.mjs';
import { computed, mergeProps, withCtx, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useFavoritesStore } from './favorites-foySpqDT.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$1 = {
  __name: "Rating",
  __ssrInlineRender: true,
  props: {
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    showStars: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const formattedRating = computed(() => {
      return props.rating ? props.rating.toFixed(1) : "0.0";
    });
    const filledStars = computed(() => {
      return Math.round(props.rating / 2);
    });
    const ratingColor = computed(() => {
      if (props.rating >= 7) return "text-green-600";
      if (props.rating >= 5) return "text-yellow-600";
      return "text-red-600";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><div class="flex items-center"><!--[-->`);
      ssrRenderList(5, (star) => {
        _push(`<svg class="${ssrRenderClass([star <= filledStars.value ? "text-yellow-400" : "text-gray-300", "w-4 h-4"])}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
      });
      _push(`<!--]--></div><span class="${ssrRenderClass([ratingColor.value, "text-sm font-medium"])}">${ssrInterpolate(formattedRating.value)}</span></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Rating.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/placeholder-poster.svg");
const _sfc_main = {
  __name: "PosterCard",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["movie", "tv"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const favoritesStore = useFavoritesStore();
    const isFavorite = computed(() => {
      return favoritesStore.isFavorite(props.item.id, props.type);
    });
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).getFullYear();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Rating = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105" }, _attrs))} data-v-5b523ee3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.type === "movie" ? `/movie/${__props.item.id}` : `/tv/${__props.item.id}`,
        class: "block relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-[2/3] overflow-hidden bg-gray-200" data-v-5b523ee3${_scopeId}>`);
            if (__props.item.poster_path) {
              _push2(`<img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${__props.item.poster_path}`)}${ssrRenderAttr("alt", __props.item.title || __props.item.name)} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" data-v-5b523ee3${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full bg-gray-300 flex items-center justify-center" data-v-5b523ee3${_scopeId}><img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", __props.item.title || __props.item.name)} class="w-full h-full object-cover" data-v-5b523ee3${_scopeId}></div>`);
            }
            _push2(`<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-5b523ee3${_scopeId}><div class="absolute bottom-4 left-4 right-4" data-v-5b523ee3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Rating, {
              rating: __props.item.vote_average,
              class: "mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-white text-sm line-clamp-3" data-v-5b523ee3${_scopeId}>${ssrInterpolate(__props.item.overview)}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative aspect-[2/3] overflow-hidden bg-gray-200" }, [
                __props.item.poster_path ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: `https://image.tmdb.org/t/p/w500${__props.item.poster_path}`,
                  alt: __props.item.title || __props.item.name,
                  class: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110",
                  loading: "lazy"
                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "w-full h-full bg-gray-300 flex items-center justify-center"
                }, [
                  createVNode("img", {
                    src: _imports_0,
                    alt: __props.item.title || __props.item.name,
                    class: "w-full h-full object-cover"
                  }, null, 8, ["alt"])
                ])),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [
                  createVNode("div", { class: "absolute bottom-4 left-4 right-4" }, [
                    createVNode(_component_Rating, {
                      rating: __props.item.vote_average,
                      class: "mb-2"
                    }, null, 8, ["rating"]),
                    createVNode("p", { class: "text-white text-sm line-clamp-3" }, toDisplayString(__props.item.overview), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="${ssrRenderClass([{ "text-red-500": isFavorite.value, "text-white": !isFavorite.value }, "absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"])}" data-v-5b523ee3><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-5b523ee3>`);
      if (isFavorite.value) {
        _push(`<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" data-v-5b523ee3></path>`);
      } else {
        _push(`<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" stroke="currentColor" stroke-width="2" fill="none" data-v-5b523ee3></path>`);
      }
      _push(`</svg></button><div class="p-4" data-v-5b523ee3><h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors" data-v-5b523ee3>${ssrInterpolate(__props.item.title || __props.item.name)}</h3><div class="flex items-center justify-between text-sm text-gray-600" data-v-5b523ee3><span data-v-5b523ee3>${ssrInterpolate(formatDate(__props.item.release_date || __props.item.first_air_date))}</span><span class="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium" data-v-5b523ee3>${ssrInterpolate(__props.type.toUpperCase())}</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PosterCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5b523ee3"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=PosterCard-DjNKAHYT.mjs.map
