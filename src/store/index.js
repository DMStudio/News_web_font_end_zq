import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)
const state={
    addt:'11',
    addc:'',
    addi:'',
    addp:''
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})