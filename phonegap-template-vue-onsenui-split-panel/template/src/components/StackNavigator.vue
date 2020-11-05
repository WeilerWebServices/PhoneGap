<template>
  <v-ons-navigator
    @toggleMenu="toggleMenu"
    swipeable
    :options="options"
    :page-stack="pageStack"
    :pop-page="goBack"
    @push-page="pageStack.push($event)"
  ></v-ons-navigator>
</template>

<script>
  export default {
    created () {
      /* Bail out of we are in a situation without a route */
      if (!this.$route) return;
      /* Define how routes should be mapped to the page stack.
       * This assumes all the routes contain VOnsPage components
       * and are provided in the 'default' view.
       * For nested named routes or routes that for some reason
       * should not be mapped in VOnsNavigator, filter them out here.
       */
      const mapRouteStack = route => route.matched.map(m => m.components.default);
      /* Set initial pageStack depending on current
       * route instead of always pushing 'Home' page
       */
      this.pageStack = mapRouteStack(this.$route);
      /* On route change, reset the pageStack to the next route */
      this.$router.beforeEach((to, from, next) => {
        this.pageStack = mapRouteStack(to);
        next();
      });
    },
    data () {
      return {
        pageStack: []
      };
    },
    computed: {
      options () {
        return this.$store.state.navigator.options;
      }
    },
    methods: {
      /* Override default pop behavior and delegate it to the router */
      goBack () {
        // Go to the parent route component
        this.$router.push({ name: this.$route.matched[this.$route.matched.length - 2].name });
        // this.$router.go(-1); // Could work but might be misleading in some situations
      },
      toggleMenu () {
        this.$store.commit('splitter/toggle');
      }
    }
  };
</script>

