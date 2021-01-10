export default {
    toggleItem(state, selectedItem) {
        if (state.selectedItems.some(item => item.id === selectedItem.id)) {
            state.selectedItems = state.selectedItems.filter(item => item.id !== selectedItem.id)
        } else {
            state.selectedItems.push(selectedItem)
        }
    },
    changeCourse(state, changedCourse) {
        state.course = changedCourse
    },
    setGoods(state, goods) {
        state.goods = goods
    },
}