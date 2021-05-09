import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputVal(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, i) {
      state.list.splice(i, 1)
    },
    checkoutDone(state, params) {
      state.list[params.i].done = params.done
    },
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json')
        .then(({ data }) => context.commit('initList', data))

      /*  const { data } = await axios.get('http://localhost:8082/list.json')
       console.log(data)
       context.commit('initList', data) */
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(item => item.done === false).length
    },
    showDiffList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(item => item.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  },
  modules: {
  }
})
