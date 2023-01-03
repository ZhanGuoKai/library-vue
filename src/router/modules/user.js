export default {
  path: '/user',
  name: 'user',
  redirect: '/user/search',
  component: () => import('@/views/user'),
  children: [
    {
      path: 'search',
      name: 'user-search',
      component: () => import('@/views/user/search'),
      meta: { title: '搜索图书' }
    },
    {
      path: 'history',
      name: 'user-history',
      component: () => import('@/views/user/history'),
      meta: { title: '借阅记录' }
    },
    {
      path: 'recommend',
      name: 'user-recommend',
      component: () => import('@/views/user/recommended'),
      meta: { title: '推荐图书' }
    },
    {
      path: 'info',
      name: 'user-info',
      component: () => import('@/views/user/info'),
      meta: { title: '个人信息' }
    }
  ]
};
