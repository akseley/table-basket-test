import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const COURSE = 80

export default new Vuex.Store({
    state: {
        goods: [],
        selectedItems: [],
        counterSelectedItems: 0,
        course: COURSE
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
})
