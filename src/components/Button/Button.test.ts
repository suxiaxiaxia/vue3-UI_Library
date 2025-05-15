import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  //测试基础功能：对应的class被添加，文本被添加，click事件可以触发
  test('basic button', () => {
    //把Button挂载到wrapper上模拟浏览器真实组件
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        plain: true
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html());
    //获取class
    expect(wrapper.classes()).toContain('is-plain');
    //找到button标签，获取元素内部的「纯文本内容」，不包含任何 HTML 标签。
    //get里可以写任何 合法的 CSS 选择器
    expect(wrapper.get('button').text()).toBe('button');
    //events
    wrapper.get('button').trigger('click');//假设触发了click
    console.log(wrapper.emitted());//打印所有触发事件
    expect(wrapper.emitted()).toHaveProperty('click');
  })
  //测试disabled功能：存在原生disabled属性，click无法被触发
  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    //获取组件根节点（即 Button.vue 最外层元素）上的 HTML 属性。
    //返回的是字符串，如果存在就返回属性值
    console.log(wrapper.html());
    console.log(wrapper.attributes());//{ class: 'ui-button is-disabled', disabled: '', type: 'button' }
    console.log(wrapper.attributes('disabled'));//空字符串
    expect(wrapper.attributes('disabled')).toBeDefined();//不管是什么只要值不是 undefined
    //这是通过 原生 DOM 的方式读取 button 元素的 disabled 属性
    console.log(wrapper.find('button').element);
    console.log(wrapper.find('button').element.disabled);//true
    expect(wrapper.find('button').element.disabled).toBeDefined();
    wrapper.get('button').trigger('click');
    console.log(wrapper.emitted());//{}
    expect(wrapper.emitted()).not.toHaveProperty('click');//disabled没有点击事件
  })
  //测试Icon组件：第三方库可以被导入，图标可以被引入
  test('Icon.vue', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      //引入第三方库的时候的模拟测试
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html());
    const iconElement = wrapper.findComponent(FontAwesomeIcon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes('icon')).toBe('arrow-up');
  })
  //测试loading状态：存在disabled
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      //引入第三方库的时候的模拟测试
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html());
    console.log(wrapper.attributes('disabled'));
    expect(wrapper.attributes('disabled')).toBeDefined();
  })
})
