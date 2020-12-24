<template>
  <tr @click="$emit('select', element)">
    <td>{{ `${element.name} (${element.maxQuantity})` }}</td>
    <td class="text-right" :class="trendClass">{{ formatPrice(element.price) }}</td>
  </tr>
</template>
<script>
import { formatPrice } from '@/helpers/formatPrice'
export default {
  name: 'ExpansionPanel',

  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    trends: 'neutral'
  }),
  computed: {
    trendClass() {
      return this.trends
    }
  },
  methods: {
    formatPrice,
    setTrends (oldValue, newValue) {
      const oldPrice = parseInt(oldValue.price, 10)
      const newPrice = parseInt(newValue.price, 10)
      if (oldPrice > newPrice) {
        this.trends = 'negative'
      } else if (oldPrice < newPrice) {
        this.trends = 'positive'
      } else {
        this.trends = 'neutral'
      }
    }
  },
  watch: {
    element(oldValue, newValue) {
      this.setTrends(oldValue, newValue)
    }
  }
};
</script>
<style scoped>
.positive {
  color: green;
}
.negative{
  color: red;
}
.neutral{
  color: gray;
}
</style>