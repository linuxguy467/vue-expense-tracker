<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" id="text" v-model="text" placeholder="Enter text..." @blur="sanitizeInput" />
    </div>
    <div class="form-control">
      <label for="amount">
        Amount <br />
        (negative - expense, positive - income)
      </label>
      <input type="number" step="0.01" v-model="amount" id="amount" placeholder="Enter amount..." @blur="sanitizeInput" />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import DOMPurify from 'dompurify'

const text = ref('')
const amount = ref(0.0)

const emit = defineEmits(['transactionSubmitted'])

const toast = useToast()

const sanitizeInput = (event) => {
  text.value = DOMPurify.sanitize(event.target.value)
}

const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error('Both fields must be filled')
    return
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
  }

  emit('transactionSubmitted', transactionData)

  text.value = ''
  amount.value = ''
}
</script>
