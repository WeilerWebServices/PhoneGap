import Vue from 'vue';
import Home from '@/components/pages/Home';

describe('Home.vue', () => {
  const Constructor = Vue.extend(Home);
  const vm = new Constructor().$mount();

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('ons-toolbar .center').textContent)
      .to.equal('Home');
  });
});
