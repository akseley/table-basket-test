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
                <expansion-panel
                    v-for="group in formattedData"
                    :key="group.id"
                    :group="group"
                    @select="selectItem"
                />
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
import ExpansionPanel from '@/components/ExpansionPanel'

const COURSE = 80
const DEFAULT_QUANTITY = 1

export default {
  name: 'App',

  components: {Basket, ExpansionPanel},

  data: () => ({
    course: COURSE,
    data: data,
    names: names,
    showBasket: false,
    panels: [],
    formattedData: [],
    selectedItems: [],
    intervalId: null,
  }),
  mounted() {
    this.fetchData()

    this.intervalId = setInterval(() => {
      this.course = this.getRandomInt(20, 80)
      this.fetchData()
    }, 15000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  computed: {
    counterSelectedItems() {
      return this.selectedItems.length
    },
  },
  methods: {
    convertToRub(price) {
      return (price * this.course).toFixed(2)
    },
    async fetchData() {
      try {
        await this.formatData()
      } catch (e) {
        console.log(e)
      }
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
      this.panels = this.formattedData.map((_, index) => index)
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
        const usdPrice = Math.random() * item.C
        const itemId = item.T
        const maxQuantity = item.P
        return {
          id: item.T,
          name: this.getItemName(groupId, itemId),
          price: this.convertToRub(usdPrice),
          usdPrice: usdPrice,
          maxQuantity:maxQuantity,
          quantity: DEFAULT_QUANTITY
        }
      })
    },
    getItemName(groupId, itemId) {
      return this.names[groupId]?.B[itemId]?.N ?? 'Неопознаный енот'
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
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min
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
