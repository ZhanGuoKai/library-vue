export default {
  path: '/user',
  name: 'user',
  // redirect: '/mine',
  component: () => import('@/views/user'),
  // children: [
  //   {
  //     path: 'info',
  //     name: 'mine-info',
  //     component: () => import('@/views/mine/info'),
  //     meta: { title: '个人资料' }
  //   }
  // ]
};
