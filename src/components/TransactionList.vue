<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
      {{ transaction.text }} <span>${{ transaction.amount }}</span
      ><button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        { id: 1, text: 'Paycheck', amount: 221.99 },
        { id: 2, text: 'Sell Car', amount: 114.67 },
        { id: 3, text: 'Stereo set', amount: -604 },
        { id: 4, text: 'Book', amount: -16 },
      ],
    }
  },
}
</script>
