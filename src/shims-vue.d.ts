declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'mockjs';

declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
  const zh_CN: any
  export default zh_CN
};
