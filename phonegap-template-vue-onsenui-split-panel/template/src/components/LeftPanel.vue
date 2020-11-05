<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="content">
      <v-ons-list-title>Menu</v-ons-list-title>
      <v-ons-list v-for="link in panelLinks" :key="link.id">
        <v-ons-list-item modifier="chevron" tappable @click="goTo(link.path)">
          {{ link.title }}
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>

</template>

<script>
  export default {
    name: 'menu',
    data () {
      return {
        panelLinks: {
          home: {
            id: 'home',
            title: 'Home',
            path: '/'
          },
          about: {
            id: 'about',
            title: 'About',
            path: '/about'
          },
          services: {
            id: 'services',
            title: 'Services',
            path: '/services'
          }
        }
      };
    },
    methods: {
      goTo (page) {
        this.$store.commit('splitter/toggle');
        // set the animation to 'none'
        this.$store.commit('navigator/options', {
          animation: 'none',
          // Resets default animation options
          callback: () => this.$store.commit('navigator/options', {})
        });
        this.$router.push(page);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ons-list-item {
    cursor: pointer;
  }
</style>
