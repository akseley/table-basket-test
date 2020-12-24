<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-text-field
          v-model="course"
          type="number"
          label="Текущий курс"
          dense
      />
      <v-spacer/>
      <v-btn @click="showBasket = !showBasket">
        <v-icon>mdi-basket</v-icon>
        <v-badge
            v-if="counterSelectedItems"
            bottom
            color="green"
            :content="counterSelectedItems"
        />
      </v-btn>

  </v-app-bar>
    <v-main>
      <v-container>
        <v-layout>
            <v-expansion-panels :value="panels" multiple>
              <v-expansion-panel
                  v-for="group in formattedData"
                  :key="group.id"
              >
                <v-expansion-panel-header>
                  {{ group.title }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                      :items="group.items"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                  >
                    <template slot='item' slot-scope="{item}">
                      <tr @click="selectItem(item)">
                        <td>{{ `${item.name} (${item.maxQuantity})` }}</td>
                        <td class="text-right">{{ formatPrice(item.price) }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          <div v-if="showBasket" class="basket">
            <basket :items="selectedItems" @remove="selectItem"/>
          </div>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import data from '@/data/data.json'
import names from '@/data/names.json'
import Basket from '@/components/Basket'

const COURSE = 80

export default {
  name: 'App',

  components: {Basket},

  data: () => ({
    course: COURSE,
    data: data,
    names: names,
    showBasket: false,
    panels: [0,1,2,3,4,5,6,7],
    formattedData: [],
    selectedItems: [],
  }),
  mounted() {
    this.formatData()
  },
  computed: {
    counterSelectedItems() {
      return this.selectedItems.length
    },
    openedPanels() {
      return this.formattedData.length
    }
  },
  methods: {
    convertToRub(price) {
      return (price * this.course).toFixed(2)
    },
    formatPrice(convertedPrice){
      const price = convertedPrice.toLocaleString('ru-RU')
      return `${price}р.`
    },
    formatData() {
      const data = this.data?.['Value']?.['Goods'] ?? []
      this.formattedData = this.groupedArray(data).map(group => {
        return {
          id: group.id,
          title: this.getGroupName(group.id),
          items: this.translateGroupItems(group.id, group.items)
        }
      })
    },
    groupedArray(array) {
      let result = {}

      array.forEach(element => {
        const { G } = element
        const key = `${G}`

        if (result[key]) {
          result[key].items.push(element)
        } else {
          result[key] = {
            id: key,
            items: [
              {
                ...element,
              },
            ]
          }
        }
      })
      return Object.values(result)
    },
    getGroupName(id) {
      return this.names[id].G
    },
    translateGroupItems(groupId, array) {
      return array.map(item => {
        return {
          id: item.T,
          name: this.getItemName(groupId, item.T),
          price: this.convertToRub(item.C),
          usdPrice: item.C,
          maxQuantity: item.P,
          quantity: 1
        }
      })
    },
    getItemName(groupId, itemId) {
      return this.names[groupId].B[itemId].N
    },
    selectItem(item) {
      if (this.selectedItems.some(selectedItem => selectedItem.id === item.id)) {
        this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem.id !== item.id)
      } else {
        this.selectedItems.push(item)
      }
    },
    updatePrice() {
      this.selectedItems = this.selectedItems.map(selectedItem => {
        return {
          ...selectedItem,
          price: this.convertToRub(selectedItem.usdPrice)
        }
      })
    }
  },
  watch: {
    course() {
      this.formatData()
      this.updatePrice()
    }
  }
};
</script>
<style scoped>
.basket {
  position: absolute;
  width: 50%;
  min-height: 30%;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
