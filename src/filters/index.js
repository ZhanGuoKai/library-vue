import Vue from 'vue';

const filterFiles = require.context('./', false, /^(?!\.\/index\.js$).+\.js$/);
filterFiles.keys().forEach(path => {
  const filterFile = filterFiles(path);
  Vue.filter(filterFile.name, filterFile.default);
});
