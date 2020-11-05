import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/pages/Home';
import About from '@/components/pages/About';
import Services from '@/components/pages/Services';
import Another from '@/components/pages/Another';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/services',
      name: 'Services',
      component: Services,
      children: [
        {
          path: 'another',
          name: 'Another Page',
          component: Another
        }
      ]
    }
  ]
});

export default router;
