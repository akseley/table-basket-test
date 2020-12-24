export const formatPrice = (price) => {
    const formatedPrice = price.toLocaleString('ru-RU')
    return `${formatedPrice}р.`
}