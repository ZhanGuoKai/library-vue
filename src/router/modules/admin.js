export default {
  path: '/admin',
  name: 'admin',
  redirect: '/admin/search',
  component: () => import('@/views/admin'),
  children: [
    {
      path: 'search',
      name: 'admin-search',
      component: () => import('@/views/admin/search'),
      meta: { title: '搜索图书', admin: true }
    },
    {
      path: 'borrower',
      name: 'admin-borrower',
      component: () => import('@/views/admin/borrower'),
      meta: { title: '查询借阅者', admin: true }
    },
  ]
};
