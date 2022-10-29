export default {
  path: '/admin',
  name: 'admin',
  // redirect: '/mine',
  component: () => import('@/views/admin'),
  // children: [
  //   {
  //     path: 'info',
  //     name: 'mine-info',
  //     component: () => import('@/views/mine/info'),
  //     meta: { title: '个人资料' }
  //   }
  // ]
};
