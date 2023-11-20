<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { useToast } from 'vue-toastification'

import { ref, computed } from 'vue'

const toast = useToast()

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

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  })

  toast.success('Transaction added')
}

// Generate Unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000)
}

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

  toast.success('Transaction deleted')
}
</script>
