<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses />
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

const total = computed(() => {
  return parseFloat(
    transactions.value.reduce((acc, { amount }) => {
      return acc + amount
    }, 0)
  ).toFixed(2)
})
</script>
