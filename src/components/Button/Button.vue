<!-- Button.vue -->
<!-- 可优化：图标颜色可修改 -->
<template>
  <button
  ref="_ref"
  class="ui-button"
  :class="{
    [`ui-button--${type}`]:type,
    [`ui-button--${size}`]:size,
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading':loading
  }"
  :disabled="disabled||loading"
  :type="nativeType"
  :autofocus="autofocus"
  >
    <Icon icon="fa-spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>

</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { ButtonProps } from './type';
  import Icon from '../Icon/Icon.vue';
  
  defineOptions({
    name:'UiButton'//给组件树命名
  })

  //使用泛型<ButtonProps>，指定了所有 props 的类型
  //withDefaults() 来设置 props 的默认值
  withDefaults(defineProps<ButtonProps>(),{
    //size:'small',
    nativeType:'button'
  })

  //使用了 <script setup> 的组件是默认私有的：
  //一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，
  //除非子组件在其中通过 defineExpose 宏显式暴露
  //如果App.vue中想拿到Button.vue里的模板引用ref需要把它暴露
  const _ref=ref<HTMLButtonElement>()
  defineExpose({
    ref:_ref
  })
</script>

<style>
  

</style>