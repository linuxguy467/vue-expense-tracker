<template>
  <Header />
  <main class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </main>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { useToast } from 'vue-toastification'

import { ref, computed, onMounted, provide } from 'vue'
import { saveAs } from 'file-saver'
import { Parser } from '@json2csv/plainjs'

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

const toast = useToast()

const transactions = ref([])

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

  saveTransactionsToLocalStorage()

  toast.success('Transaction added')
}

// Generate Unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000)
}

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

  saveTransactionsToLocalStorage()

  toast.success('Transaction deleted')
}

// Save to localstorage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

// Export To CSV
const exportToCsv = () => {
  const trans = transactions.value.map(({ text, amount }) => {
    return {
      Text: text,
      Amount: amount,
    }
  })

  const totalIncome = { 'Total Income': +income.value.toFixed(2) }
  const totalExpense = { 'Total Expenses': +expenses.value.toFixed(2) }
  const balanceData = { Balance: +total.value.toFixed(2) }

  const transactionData = [...trans, totalIncome, totalExpense, balanceData]

  const transactionsParser = new Parser()
  const transactionCsv = transactionsParser.parse(transactionData)

  const csvBlob = new Blob([transactionCsv], { type: 'text/csv;charset=utf-8;' })
  saveAs(csvBlob, 'transactions.csv')
}

provide('exportToCsv', exportToCsv)
</script>
