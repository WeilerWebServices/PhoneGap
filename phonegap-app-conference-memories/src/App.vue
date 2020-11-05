<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar />

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view">
        <f7-pages>
          <f7-page navbar-fixed>
            <f7-navbar title="Menu"></f7-navbar>
            <f7-list>
              <f7-list-item @click="login" :title="loginText"></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Pages -->
        <f7-pages>
          <!-- pages from the routes will go here...replacing `home-page` -->
          <home-page />
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  /* global loginTextStore:true CSDKUserAuth */
  import Home from './components/pages/Home';

  export default {
    name: 'App',
    components: {
      'home-page': Home,
    },
    data() {
      return {
        loginText: window.loginTextStore,
      };
    },
    computed: {
      isiOS() {
        return window.isiOS;
      },
    },
    methods: {
      login(evt) {
        console.log(evt);
        console.log('login clicked');
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
          CSDKUserAuth.login((user) => {
            console.log('login success');
            console.log(user);
            loginTextStore = 'Logout';
            localStorage.setItem('user', JSON.stringify(user));
          }, () => {
            console.log('login failed');
          });
        } else {
          CSDKUserAuth.logout((user) => {
            console.log('logout success');
            console.log(user);
            loginTextStore = 'Login';
            localStorage.removeItem('user');
          }, () => {
            console.log('logout failed');
          });
        }
      },
    },
  };
</script>
