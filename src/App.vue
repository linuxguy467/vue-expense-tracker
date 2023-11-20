<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { ref, computed } from 'vue'

const transactions = ref([
  { id: 1, text: 'Paycheck', amount: 221.99 },
  { id: 2, text: 'Sell Car', amount: 114.67 },
  { id: 3, text: 'Stereo set', amount: -604 },
  { id: 4, text: 'Book', amount: 16 },
])

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, { amount }) => {
    return acc + amount
  }, 0)
})

// Get income
const income = computed(() => {
  return transactions.value
    .filter(({ amount }) => amount > 0)
    .reduce((acc, { amount }) => {
      return acc + amount
    }, 0)
})

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter(({ amount }) => amount < 0)
    .reduce((acc, { amount }) => {
      return acc + amount
    }, 0)
})
</script>
