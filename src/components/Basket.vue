<template>
  <v-card>
    <v-card-title>
      Корзина
    </v-card-title>
    <v-card-text>
      <v-data-table
          :items="selectedItems"
          item-key="id"
          hide-default-header
          hide-default-footer
      >
        <template slot='item' slot-scope="{item}">
          <tr>
            <td>
              {{item.name}}
            </td>
            <td>
              <v-text-field
                  v-model="item.quantity"
                  type="number"
              />
            </td>
            <td>
              {{ convertPriceToRub(item.price)}}
            </td>
            <td>
              <v-btn @click="$emit('remove', item)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div>total: {{total}}</div>
    </v-card-text>
  </v-card>
</template>
<script>
import { formatPrice } from '@/helpers/formatPrice'
import {mapGetters} from "vuex";
import {convertToRub} from "@/helpers/convertToRub";
export default {
  name: 'Basket',

  computed: {
    ...mapGetters(['selectedItems', "course"]),
    total() {
      const total = this.selectedItems.reduce((sum, item) => sum + Number(convertToRub(item.price, this.course ) * item.quantity), 0).toFixed(2)
      return this.formatPrice(total)
    },
  },
  methods: {
    formatPrice,
    convertPriceToRub(price) {
      const convertedPrice = convertToRub(price, this.course)
      return formatPrice(convertedPrice)
    },
  },
};
</script>