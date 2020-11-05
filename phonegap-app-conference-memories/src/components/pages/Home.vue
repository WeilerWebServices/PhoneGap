<template>
  <f7-page navbar-fixed pull-to-refresh @ptr:refresh="onRefresh">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>Conference Memories</f7-nav-center>
    </f7-navbar>
    <f7-fab-speed-dial>
      <f7-fab-actions>
        <f7-fab-action close-speed-dial @click="onCamera">
          <i class="fa fa-camera"></i>
        </f7-fab-action>
        <f7-fab-action close-speed-dial @click="onPicture">
          <i class="fa fa-picture-o"></i>
        </f7-fab-action>
      </f7-fab-actions>
      <f7-fab>
        <f7-icon icon="icon-plus"></f7-icon>
        <f7-icon icon="icon-close"></f7-icon>
      </f7-fab>
    </f7-fab-speed-dial>
    <picture-list/>
  </f7-page>

</template>

<script>
  /* global pictureStore loginTextStore:true Camera CSDKUserAuth CSDKSendToDesktop CSDKImageEditor */
  import PictureList from '../widget/PictureList';

  export default {
    name: 'Home',
    data() {
      return {
        title: 'Conference Memories',
        loginText: window.loginTextStore,
      };
    },
    components: {
      'picture-list': PictureList,
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
      onCamera() {
        console.log('camera clicked');
        this.takePicture(Camera.PictureSourceType.CAMERA);
      },
      onPicture() {
        console.log('picture clicked');
        this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
      },
      takePicture(cameraSource) {
        CSDKUserAuth.login((user) => {
          console.log('login success');
          loginTextStore = 'Logout';
          localStorage.setItem('user', JSON.stringify(user));

          navigator.camera.getPicture((picUri) => {
            console.log(picUri);
            CSDKImageEditor.edit((newUri) => {
              this.processPicture(newUri);
            }, (message) => {
              console.log(`Failed edit because: ${message}`);
            }, picUri, {});
          }, (message) => {
            console.log(`Failed because: ${message}`);
          }, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: cameraSource,
          });
        }, () => {
          console.log('ack');
        });
      },
      processPicture(picUri) {
        const user = JSON.parse(localStorage.getItem('user'));
        pictureStore.unshift({
          date: Date.now(),
          image: picUri,
          photographer: user.displayName,
        });
        localStorage.setItem('pictures', JSON.stringify(pictureStore));
      },
      onRefresh(event, done) {
        setTimeout(() => {
          console.log('close in 2 seconds');
          done();
        }, 2000);
      },
    },
  };
</script>
