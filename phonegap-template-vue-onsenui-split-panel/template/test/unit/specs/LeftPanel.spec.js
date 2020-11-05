import Vue from 'vue';
import LeftPanel from '@/components/LeftPanel';

describe('LeftPanel.vue', () => {
  const Constructor = Vue.extend(LeftPanel);
  const vm = new Constructor().$mount();

  it('should contain some list items', () => {
    expect(vm.$el.querySelector('ons-list-item').textContent.trim())
      .to.equal('Home');
  });
});
