export const getPriceInfo = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api.coinmarketcap.com/v1/ticker/?limit=6")
      .then((response) => response.json()).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
        console.error(error);
      })
  })
}