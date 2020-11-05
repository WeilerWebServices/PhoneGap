<template>
  <v-ons-page>
    <v-ons-toolbar class="another-toolbar">
      <div class="left">
        <v-ons-back-button>Services</v-ons-back-button>
      </div>
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>
    <div class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'another',
    data () {
      return {
        title: 'Another'
      };
    },
    methods: {
      toggleMenu () {
        this.$store.commit('splitter/toggle');
      }
    }
  };
</script>

<style scoped>
  /* hide the menu button when menu auto-expanded */
  @media (min-width: 960px) {
    .left ons-toolbar-button {
      display: none;
    }
  }
  p {
    padding: 16px;
  }
</style>


