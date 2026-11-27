<script setup lang="ts">
// Story-only frame: places a component inside the 1920 x 1080 canvas at real size.
withDefaults(defineProps<{ width?: number; align?: 'top' | 'bottom' | 'center' }>(), { align: 'top' })
</script>

<template>
  <div class="frame" :class="align">
    <div class="content" :style="width ? { width: `${width}px` } : undefined"><slot /></div>
  </div>
</template>

<style scoped>
.frame {
  position: absolute;
  inset: 64px;
  display: flex;
  flex-direction: column;
}
.frame.bottom {
  inset: 64px 0 0;
  justify-content: flex-end;
}
.frame.center {
  justify-content: center;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
