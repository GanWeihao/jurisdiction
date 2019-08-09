import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUserId: '',
        loginmenu:[]
    },
    mutations: {
        user(state, id) {
            state.loginUserId = id;
        },
        menu(state, list) {
            state.loginmenu = list;
        }

    },
    actions: {
        login(context, args) {
            context.commit("user", args)
        },
        usermenu(context, args2) {
            context.commit("menu", args2)
        }
    }
})
