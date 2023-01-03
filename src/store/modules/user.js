import { getToken, setToken, removeToken } from '@/utils/auth';
import authApi from '@/api/auth';
import router from '@/router';
import { Message } from 'element-ui';

const { register, login, logout, getInfo } = authApi;

const state = {
  token: getToken(),
  username: '',
  email: '',
  role: -1
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_ROLE(state, role) {
    state.role = role;
  },
  SET_USER(state, { token, username, email, role }) {
    state.token = token;
    state.username = username;
    state.email = email;
    state.role = role;
  }
};

const actions = {
  async Register({ commit }, userInfo) {
    const response = await register(userInfo);
    if (response.success) {
      setToken(response.data.token);
      commit('SET_USER', response.data);
      return response.data;
    } else {
      throw response.msg;
    }
  },

  async Login({ commit }, userInfo) {
    const response = await login(userInfo);
    if (response.success) {
      setToken(response.data.token);
      commit('SET_USER', response.data);
      return response.data;
    } else {
      throw response.msg;
    }
  },

  async Logout({ commit }) {
    try {
      await logout();
    } catch (error) {}
    removeToken();
    commit('SET_TOKEN', '');
    commit('SET_USERNAME', '');
    commit('SET_EMAIL', '');
    commit('SET_ROLE', -1);
    Message.success('登出成功');
    router.replace('/');
  },

  async LocalLogout({ commit }) {
    removeToken();
    commit('SET_TOKEN', '');
    commit('SET_USERNAME', '');
    commit('SET_EMAIL', '');
    commit('SET_ROLE', -1);
    router.replace('/');
  },

  async GetInfo({ commit }) {
    try {
      const response = await getInfo();
      if (response.success) {
        commit('SET_USERNAME', response.data.username);
        commit('SET_EMAIL', response.data.email);
        commit('SET_ROLE', response.data.role);
      } else {
        Message.error('获取用户信息失败');
      }
    } catch (error) {}
  }
};

export default { state, mutations, actions };
