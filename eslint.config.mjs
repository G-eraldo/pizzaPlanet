// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // "off" désactive complètement la règle : vous faites comme vous voulez (même ligne ou nouvelle ligne)
    "vue/first-attribute-linebreak": "off",
  },
});
