<template>
  <button class="btn" id="exportBtn" title="Export to CSV" @click="exportToCsv()"><font-awesome-icon icon="'fa-solid fa-file-export" /></button>
</template>

<script setup>
import { inject } from 'vue'

const exportToCsv = inject('exportToCsv')
</script>
