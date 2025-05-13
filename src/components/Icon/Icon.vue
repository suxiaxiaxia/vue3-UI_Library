<!-- Font Awesome 的 SVG 图标默认会使用 父元素的 color 作为颜色 -->
<!-- v-bind="$props",传所有 props,组件定义的 props	嵌套组件向下传递
v-bind="$attrs",传非 props 属性,class、style、id、自定义属性等 -->
<template>
  <i class="ui-icon"
  :class="{
    [`ui-icon--${type}`]:type
  }"
  :style="customStyles"
  v-bind="$attrs">
    <font-awesome-icon v-bind="faProps"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { IconProps } from "./type";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  defineOptions({
    name:'UiIcon',
    inheritAttrs:false
  })
  const { type,color, ...faProps }=defineProps<IconProps>()
  const customStyles=computed(()=>{
    return color?{color:color}:{};
  })
</script>