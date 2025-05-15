export default {
  // app level config options
  //lang: 'ch-ZN',
  title: 'UI-Library',
  description: '一套基于 Vue3 的轻量级 UI 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: {
      '/components/': [
        {
          text: 'Basic',
          items: [
            { text: 'Button按钮', link: '/components/button' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' }
          ]
        }
      ]
    }
  }
}