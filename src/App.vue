<!-- App.vue -->

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Button from './components/Button/Button.vue';
  import type { ButtonInstance } from './components/Button/type.ts';

  import CollapseItem from './components/Collapse/CollapseItem.vue';
  import Collapse from './components/Collapse/Collapse.vue';

  import Icon from './components/Icon/Icon.vue';

  const buttonRef=ref<ButtonInstance|null>(null);
  //可以直接写 ref<HTMLButtonElement|null>，在只暴露了一个DOM元素的情况没问题。
  //但封装成 ButtonInstance 接口有一些更大的优势，尤其是当组件变复杂时。
  onMounted(()=>{
    //先挂载才能得到dom，但是直接得到buttonRef.value.ref会报错，
    //buttonRef.value可能为null，所以需要判断是否为空
    if(buttonRef.value){
      console.log(buttonRef.value.ref);
    }
    setTimeout(()=>{
      size.value='2xl'
    },2000)
  })
  const size=ref<any>('3x')

  const openedValue=ref(['a']);
</script>

<template>
    <!-- 通过Vue的props机制传到了Button.vue中，
    然后通过defineProps<ButtonProps>()读取并使用它们，
    同时TypeScript校验这些值是否合法并提升开发体验。 -->
    <!-- 传plain不传plain="true"是因为会把"true"判断成一个字符串
    应该传:plain="true"，plain是简写 -->
    <!-- 同样是 ref，绑定的是原生标签 → 获取 DOM，
    绑定的是组件 → 获取子组件暴露的实例或 DOM。 -->
    <Button ref="buttonRef">default</Button>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="danger">Danger</Button>
    <Button type="warning">Warning</Button>
    <Button type="info">Info</Button>
    <br><br>
    <Button plain>Plain</Button>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="danger" plain>Danger</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="info" plain>Info</Button>
    <br><br>
    <Button round>round</Button>
    <Button circle>circle</Button>
    <Button disabled>disabled</Button>
    <br><br>
    <Button loading>Loading</Button>
    <Button icon="fa-thumbs-up" color="#ffffff"></Button>
    <br><br>

    <!-- v-model双向同步activeNames -->
    <Collapse v-model="openedValue">
      <CollapseItem name="a" title="baaaaa">
        <div>content a</div>
      </CollapseItem>
      <CollapseItem name="b" title="bbbbbb">
        <div>content b</div>
      </CollapseItem>
      <CollapseItem name="c" title="ccccc" disabled></CollapseItem>

    </Collapse>

    <Icon icon="fa-solid fa-user-secret" :size="size" bounce type="danger" color="#fff222"></Icon>
</template>


<style scoped>

</style>
