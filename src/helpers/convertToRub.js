export const convertToRub = (price, course) => {
    return (price * course).toFixed(2)
}