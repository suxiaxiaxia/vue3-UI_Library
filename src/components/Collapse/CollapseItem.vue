<!-- CollapseItem.vue -->

<template>
  <div 
  class="ui-collapse-item"
  :class="{
    'is-disabled':disabled
  }"
  >
    <div 
    class="ui-collapse-item__header"
    :class="{
      'is-disabled':disabled,
      'is-active':isActive
    }"
    :id="`item-header-${name}`"
    @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-left" class="header-angle"></Icon>
    </div>

    <Transition name="slide" v-on="transitionEvents">
      <div 
      class="ui-collapse-item__wrapper"
      v-show="isActive">
        <div class="ui-collapse-item__content"
        :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
  import type { CollapseItemProps } from './type';
  import { computed, inject } from 'vue';
  import { collapseContextKey } from './type';
  import Icon from '../Icon/Icon.vue';
  
  defineOptions({
    name:'UiCollapseItem'
  })
  const props=defineProps<CollapseItemProps>()
  
  const collapseContext=inject(collapseContextKey);
  //判断当前activeNames里是否有这个name，如果有说明是打开的
  
  const isActive=computed(()=>collapseContext?.activeNames.value.includes(props.name));
  const handleClick=()=>{
    if(props.disabled){return;}
    collapseContext?.handleItemClick(props.name);
  }

  //批量绑定事件，Record<键类型, 值类型>
  const transitionEvents:Record<string,(el:HTMLElement)=>void>={
    //简写形式相当于beforeEnter: function(el) { ... }
    beforeEnter(el){
      el.style.height='0px';
      el.style.overflow='hidden';
    },
    enter(el){
      el.style.height=`${el.scrollHeight}px`;
    },
    afterEnter(el){
      el.style.height='';
      el.style.overflow='';
    },
    beforeLeave(el){
      el.style.height=`${el.scrollHeight}px`;
      el.style.overflow='hidden';
    },
    leave(el){
      el.style.height='0px';
    },
    afterLeave(el){
      el.style.height='';
      el.style.overflow='';
    }
  }
</script>

<style>
 
</style>