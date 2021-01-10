import data from '@/data/data.json'
import names from '@/data/names.json'

const DEFAULT_QUANTITY = 1

function formatGoods(data) {
    const tempData = data?.['Value']?.['Goods'] ?? []
    return groupedArray(tempData).map(({id, items}) => {
        return {
            id,
            title: getGroupName(id),
            items: translateGroupItems(id, items)
        }
    })
}

function translateGroupItems(groupId, array) {
    return array.map(item => {
        const price = Math.random() * item.C
        const itemId = item.T
        const maxQuantity = item.P
        return {
            id: item.T,
            name: getItemName(groupId, itemId),
            price,
            maxQuantity:maxQuantity,
            quantity: DEFAULT_QUANTITY
        }
    })
}

function getItemName(groupId, itemId) {
    return names[groupId]?.B[itemId]?.N ?? 'Неопознаный енот'
}

function groupedArray(array) {
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
}
function getGroupName(id) {
  return names[id].G
}

export default {
    async getGoods({ commit }) {
        return new Promise((resolve) => {
            const formattedData = formatGoods(data)
            commit('setGoods', formattedData)
            setTimeout(() => {
                resolve()
            }, 1000)

        })

    },
}