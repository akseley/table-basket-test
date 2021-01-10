<template>
    <v-expansion-panel>
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
            <expansion-row-element :element="item" :selected="isSelectedItem(item)" @select="$emit('select', item)"/>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
</template>
<script>
import ExpansionRowElement from "@/components/ExpansionRowElement"
import {mapGetters} from "vuex";

export default {
  name: 'ExpansionPanel',

  components: {ExpansionRowElement},

  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['selectedItems']),
  },
  methods: {
    isSelectedItem(currentItem) {
      return this.selectedItems.some(selectedItem => selectedItem.id === currentItem.id)
    }
  }
};
</script>
