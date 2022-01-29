<template>
  <div class="menu-button" :class="{ isOpen }" @click="toggle">
    <div class="icon">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    toggle: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.menu-button {
  background: #525297;
  cursor: pointer;
  display: inline-block;
  padding: 13px;
  position: relative;
  z-index: 1000;
  border-radius: 50%;
}

.icon {
  position: relative;
  height: 22px;
  width: 22px;
}

.icon > div {
  background: #b9b9d1;
  height: 2px;
  top: 0;
  transform: translate(0, 3px);
  position: absolute;
  left: 0;
  width: 100%;
  transform-origin: center;
}
.icon > div:first-child {
  transform: translate(0, 10px)
}
.icon > div:last-child {
  transform: translate(0, 17px)
}

.isOpen .icon > div {
  transform: translate(0, 10px);
  transform: translate(0, 10px) rotate(45deg);
}
.isOpen .icon > div:first-child {
  opacity: 0;
}
.isOpen .icon > div:last-child {
  transform: translate(0, 10px) rotate(-45deg)
}
</style>
