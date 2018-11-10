import Vue from 'vue'
import App from './App.vue'
//element-ui轮播
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/02.gif')
})


import "./statics/site/css/style.css"
Vue.config.productionTip = false
import router from './router'
import store from './store'
import './filters'
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
