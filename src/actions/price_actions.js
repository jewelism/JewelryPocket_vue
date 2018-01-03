export const getCoinmarketcap6API = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=6')
      .then((response) => response.json()).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        resolve(false)
        console.error(error);
      })
  })
}

export const convertAPI = () => {
  return new Promise((resolve, reject) => {
    fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,ETC,XRP,LTC,DASH,BCH&tsyms=BTC,KRW,BTC,USD')
      .then((response) => response.json())
      .then((responseJson) => {
        let resultArr = []
        resultArr.push(responseJson.RAW.BTC.KRW.PRICE)
        resultArr.push(responseJson.RAW.ETH.KRW.PRICE)
        resultArr.push(responseJson.RAW.ETC.KRW.PRICE)
        resultArr.push(responseJson.RAW.XRP.KRW.PRICE)
        resultArr.push(responseJson.RAW.LTC.KRW.PRICE)
        resultArr.push(responseJson.RAW.DASH.KRW.PRICE)
        resultArr.push(responseJson.RAW.BCH.KRW.PRICE)
        resolve(resultArr)
      })
      .catch((error) => {
        resolve(false)
        console.error(error)
      })
  })
}