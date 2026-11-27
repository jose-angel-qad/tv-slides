<script setup lang="ts">
import T4Table from '../../templates/T4Table.vue'
import MediaFrame from '../../components/content/MediaFrame.vue'
import type { CompanyUpdateData } from './types'

// Question: what is the company sharing today?
// The image or PDF page fills the content area at its own aspect ratio (no large empty margins
// from a fixed box, audit). The brand stays in the footer; this screen may carry more of it (BRAND-03).
defineProps<{ data: CompanyUpdateData }>()
</script>

<template>
  <T4Table>
    <MediaFrame :src="data.src" :alt="data.alt" :title="data.title" :page="data.page" />
  </T4Table>
</template>
