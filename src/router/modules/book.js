export default {
  path: '/book/:isbn',
  name: 'book',
  component: () => import('@/views/book'),
};