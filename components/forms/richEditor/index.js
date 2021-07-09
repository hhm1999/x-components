import richEditor from './richEditor';

export default {
  install: (Vue) => {
    Vue.component(richEditor.name, richEditor);
  },
};
