import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {addLocalGoods,getTotalCount,updateLocalGoods,
  deleteLocalGoods} from '../common/localStorage.js'
const store = new Vuex.Store({
    state: {
      buyCount: 0
    },
    getters: {
        getBuyCount: state => {
          return state.buyCount===0? getTotalCount():state.buyCount
        }
      },
    mutations: {
        /**
         * state 就是上面的state，固定的
         * goods 载荷 参数 约定 goods = {goodsId:90,count:5}
         */
      addGoods (state,goods) {
        // 变更状态
        // state.buyCount+=goods.count
        state.buyCount=addLocalGoods(goods)
      },
      updateGoods(state,goods){
        state.buyCount=updateLocalGoods(goods)
      },
      deleteGoods(state,goodsId){
        state.buyCount=deleteLocalGoods(goodsId)
      }

    }
  })

  export default store