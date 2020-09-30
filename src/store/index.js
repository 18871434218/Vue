import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg: "HelloMAGG"
    },

    mutations: {},

    actions: {}
});


const state = ({
    userName: 'dong',
});

const getters = {
    fullName(state) {
        return state.userName + '大王';
    }
};

const mutations = {
    SET_username() {}
};
