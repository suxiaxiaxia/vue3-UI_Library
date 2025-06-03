<template>
  <Button ref="buttonRef">default</Button>
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="danger">Danger</Button>
  <Button type="warning">Warning</Button>
  <Button type="info">Info</Button>
  <br>
  <Button plain>Plain</Button>
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="danger" plain>Danger</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="info" plain>Info</Button>
  <br>
  <Button round>round</Button>
  <Button circle>circle</Button>
  <Button disabled>disabled</Button>
  <br>
  <Button loading>Loading</Button>
  <Button icon="fa-thumbs-up" color="#ffffff"></Button>
  <br>
</template>

<script setup>
  import Button from '../../../src/components/Button/Button.vue';
</script>