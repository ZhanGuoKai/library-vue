import { getToken, setToken, removeToken } from '@/utils/auth';
import authApi from '@/api/auth';

const { register, login, logout } = authApi;

const state = {
  token: getToken(),
  username: ''
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  }
};

const actions = {
  async Register({ commit }, userInfo) {
    const response = await register(userInfo);
    if (response.data.token) {
      const token = response.data.token;
      setToken(token);
      commit('SET_TOKEN', token);
      return response.data;
    } else {
      throw new Error(response.msg);
    }
  },

  async Login({ commit }, userInfo) {
    const response = await login(userInfo);
    if (response.data.token) {
      const token = response.data.token;
      setToken(token);
      commit('SET_TOKEN', token);
      return response.data;
    } else {
      throw new Error(response.msg);
    }
  },

  async Logout({ commit }) {
    try {
      await logout();
    } catch (error) {}
    removeToken();
    commit('SET_TOKEN', '');
  },

  async LocalLogout({ commit }) {
    removeToken();
    commit('SET_TOKEN', '');
  }
};

export default {
  state,
  mutations,
  actions
};
