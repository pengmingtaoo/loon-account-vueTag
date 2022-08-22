import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path:'/',
        redirect:'/money'  // 重定向
    },
    {
        path:'/money',
        component:Money,
    },
    {
        path:'/labels',
        component: Labels,
    },
    {
        path:'/statistics',
        component:Statistics,
    },
    {
        path:'*',
        component:NotFound,
    }

];

const router = new VueRouter({
  routes
});

export default router;
