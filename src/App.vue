<template>
  <v-app>
    <v-app-bar app>
      <v-text-field
          v-model="currentCourse"
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
        <v-layout v-if="!loading">
            <v-expansion-panels :value="panels" multiple>
                <expansion-panel
                    v-for="group in goods"
                    :key="group.id"
                    :group="group"
                    @select="toggleItem"
                />
            </v-expansion-panels>
          <div v-if="showBasket" class="basket">
            <basket @remove="toggleItem"/>
          </div>

        </v-layout>
        <v-layout v-else justify-center>
          <v-progress-circular indeterminate />
        </v-layout>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Basket from '@/components/Basket'
import ExpansionPanel from '@/components/ExpansionPanel'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {Basket, ExpansionPanel},

  data: () => ({
    showBasket: false,
    panels: [],
    intervalId: null,
    loading: false
  }),
  async mounted() {
    this.loading = true

    if (!this.goods.length) {
      await this.getGoods()
    }

    this.intervalId = setInterval(() => {
      this.currentCourse = this.getRandomInt(20, 80)
    }, 15000)

    this.panels = this.goods.map((_, index) => index)

    this.loading = false
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  computed: {
    ...mapGetters(['goods','selectedItems', 'counterSelectedItems', 'course']),
    currentCourse: {
      get() {
        return this.course
      },
      set(newValue) {
        this.$store.commit('changeCourse', newValue)
      }
    }
  },
  methods: {
    ...mapMutations(['toggleItem', 'changeCourse']),
    ...mapActions(['getGoods']),

    toggleItem(item) {
      this.$store.commit('toggleItem', item)
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min
    }
  },
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
