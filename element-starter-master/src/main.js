import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import "echarts/lib/component/title";
import VCharts from 'v-charts'
import Dashboard from './components/Dashboard'
import RequestData from './components/RequestData'
import ServiceData from './components/ServiceData'
import LinkQuery from './components/LinkQuery'


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VCharts);
const routes = [
    {path: '', component: Dashboard},
    {path: '/dashboard', component: Dashboard},
    {path: '/linkQuery', component: LinkQuery},
    {path: '/serviceData', component: ServiceData},
    {path: '/requestData', component: RequestData}
];
const router = new VueRouter({
    mode: 'history',  //h5模式
    routes // (缩写) 相当于 routes: routes
});
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
