<!-- Collapse.vue -->
<!-- 逻辑：
 事件触发@click → handleClick()
 通知父组件更新状态collapseContext?.handleItemClick(props.name)
 更新 activeNames 状态activeNames.value.push(name)
 Vue 响应式系统检测到 activeNames 变化，自动重新执行这个 computed，更新 isActive
 模板部分使用了 v-show="isActive"-->

<!-- 一旦依赖的数据发生变化，Vue就会在下一轮DOM更新前重新计算
然后批量更新依赖这个数据的所有 DOM 节点 -->

<!-- 手风琴模式下activeNames始终只有一个。
 当我点击a，先判断是否被禁止展开，如果没有被禁止展开，
 触发父组件的函数handleClick，父组件得到a。
 在这个函数，判断现在是否是手风琴模式，
 如果是，假如一开始已经展开的是b，activeNames里的值要更新成a，
 如果一开始就是a，说明现在是关闭，activeNames清空。 -->
<template>
  <div class="ui-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref ,provide, warn, watch} from 'vue';
  import type { NameType,CollapseProps,CollapseEmits } from './type';
  import { collapseContextKey } from './type';
  defineOptions({
    name:'UiCollapse'
  })

  const props=defineProps<CollapseProps>();
  const emits=defineEmits<CollapseEmits>();

  //记录当前哪些折叠项是展开的
  const activeNames=ref<NameType[]>(props.modelValue);//响应式数组存放name,是NameType数组类型
  
  watch(()=>props.modelValue,()=>{
    activeNames.value=props.modelValue;
  })
  if(props.accordion&&activeNames.value.length>1){
    console.warn(' should only one');    
  }
  
  //子组件中触发点击事件之后，发射给父组件处理
  const handleItemClick=(item:NameType)=>{
    if(props.accordion){
      activeNames.value=[activeNames.value[0]===item?'':item];
    }else{
      //判断在数组中是否存在这个item
      const index=activeNames.value.indexOf(item);
      if(index>-1){
        //如果存在，删除
        activeNames.value.splice(index,1);
      }else{
        //如果不存在，添加
        activeNames.value.push(item);
      }
    }
    
    emits('update:modelValue',activeNames.value);
    emits('change',activeNames.value);
  }
  provide(collapseContextKey,{
    activeNames,
    handleItemClick
  })


</script>

<style>

</style>