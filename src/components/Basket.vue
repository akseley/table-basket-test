<template>
  <v-card>
    <v-card-title>
      Корзина
    </v-card-title>
    <v-card-text>
      <v-data-table
          :items="items"
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
              {{ formatPrice(item.price)}}
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
export default {
  name: 'Basket',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    total() {
      const total = this.items.reduce((sum, item) => sum + Number(item.price * item.quantity), 0).toFixed(2)
      return this.formatPrice(total)
    },
  },
  methods: {
    formatPrice
  },
};
</script>