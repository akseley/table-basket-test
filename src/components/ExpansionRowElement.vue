<template>
  <tr @click="$emit('select', element)">
    <td>{{ `${element.name} (${element.maxQuantity})` }}</td>
    <td class="text-right" :class="trendClass">{{ convertPriceToRub(element.price) }}</td>
    <td class="text-right" width="175">
      <v-btn width="100%">
        <v-icon>{{ btnIcon }}</v-icon>
        {{ btnText }}
      </v-btn>
    </td>
  </tr>
</template>
<script>
import { formatPrice } from '@/helpers/formatPrice'
import { convertToRub } from '@/helpers/convertToRub'
import {mapGetters} from "vuex";

export default {
  name: 'ExpansionPanel',

  props: {
    element: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    trends: 'neutral'
  }),
  computed: {
    ...mapGetters(['course']),
    trendClass() {
      return this.trends
    },
    btnIcon() {
      if (this.selected) {
        return 'mdi-minus'
      }
      return 'mdi-plus'
    },
    btnText() {
      if (this.selected) {
        return 'убрать'
      }
      return 'добавить'
    }
  },
  methods: {
    formatPrice,
    convertPriceToRub(price) {
      const convertedPrice = convertToRub(price, this.course)
      return formatPrice(convertedPrice)
    },
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