<template>
  <div>
    <f7-card v-for="pics in pictures">
      <f7-card-header>
        <div class="facebook-avatar">
          <img src="img/profile.png" width="34" height="34"></div>
        <div class="facebook-name">{{ pics.photographer }}</div>
        <div class="facebook-date">{{ timeAgo(pics.date) }}</div>
      </f7-card-header>
      <f7-card-content>
        <img :src="pics.image" width="100%"/>
      </f7-card-content>
      <f7-card-footer>
        <f7-link @click="sendToDesktop">Desktop</f7-link>
        <f7-link @click="comment">Comment</f7-link>
        <f7-link @click="share">Share</f7-link>
      </f7-card-footer>
    </f7-card>
    <div style="height: 56px">&nbsp;</div>
  </div>
</template>

<script>
  /* global loginTextStore:true pictureStore CSDKUserAuth CSDKSendToDesktop f7 Dom7 */

  export default {
    name: 'PictureList',
    data() {
      return {
        pictures: window.pictureStore,
      };
    },
    methods: {
      timeAgo(time) {
        const units = [
          { name: 'second', limit: 60, in_seconds: 1 },
          { name: 'minute', limit: 3600, in_seconds: 60 },
          { name: 'hour', limit: 86400, in_seconds: 3600 },
          { name: 'day', limit: 604800, in_seconds: 86400 },
          { name: 'week', limit: 2629743, in_seconds: 604800 },
          { name: 'month', limit: 31556926, in_seconds: 2629743 },
          { name: 'year', limit: null, in_seconds: 31556926 },
        ];
        const diff = (new Date() - new Date(time)) / 1000;
        if (diff < 5) return 'now';

        const filter = units.filter(unit => diff < unit.limit || !unit.limit);

        const newdiff = Math.floor(diff / filter[0].in_seconds);
        return `${newdiff} ${filter[0].name}${(newdiff > 1 ? 's' : '')} ago`;
      },
      sendToDesktop(evt) {
        console.log('send to desktop clicked');
        const img = this.getTargetImageSrc(evt);

        f7.showPreloader('Sending to PhotoShop');

        CSDKUserAuth.login((user) => {
          console.log('login success');
          loginTextStore = 'Logout';
          localStorage.setItem('user', JSON.stringify(user));
          CSDKSendToDesktop.send(() => {
            console.log('win');
            f7.hidePreloader();
            f7.alert('Image sent to PhotoShop', 'Success');
          }, (e) => {
            console.log(`fail: ${e}`);
            f7.hidePreloader();
            f7.alert('Unable to send image to PhotoShop', 'Failure');
          }, img, CSDKSendToDesktop.AppType.PHOTOSHOP, 'image/jpeg');
        }, () => {
          f7.hidePreloader();
          f7.alert('Unable to send image to PhotoShop', 'Failure');
        });
      },
      comment() {
        console.log('yup, I got clicked');
      },
      share(evt) {
        console.log('share link clicked:');
        const img = this.getTargetImageSrc(evt);

        window.FilePath.resolveNativePath(img, (entry) => {
          console.log(`Native URI: ${entry}`);

          const options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: 'Sharing a memory', // fi. for email
            files: [entry], // an array of filenames either locally or remotely
            url: '',
            chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
          };

          window.plugins.socialsharing.shareWithOptions(options, (result) => {
            console.log(`Share completed? ${result.completed}`); // On Android apps mostly return false even while it's true
            console.log(`Shared to app: ${result.app}`); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
          }, (msg) => {
            console.log(`Sharing failed with message: ${msg}`);
          });
        }, () => {
          console.log('could not get local file');
        });
      },
      getTargetImageSrc(evt) {
        const card = Dom7(evt.target.parentNode.parentNode);
        return Dom7(card).find('.card-content img')[0].src;
      },
    },
  };
</script>
