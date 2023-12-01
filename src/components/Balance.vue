<template>
  <section class="balance-container">
    <div>
      <h4>Your Balance</h4>
      <h1 id="balance">${{ total.toFixed(2) }}</h1>
    </div>
    <ExportCsv />
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import ExportCsv from './ExportCsv.vue'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
})
</script>
