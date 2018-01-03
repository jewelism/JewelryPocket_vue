export const BTCBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://chain.api.btc.com/v3/address/${addr}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data != null) {
          resolve(responseJson.data.balance)
        } else {
          resolve('조회 불가')
        }
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error)
      });
  })
}

export const ETHBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${addr}`)
      .then((response) => response.json())
      .then((responseJson) => {
        resolve((parseInt(responseJson.result) / 1000000000000000000).toFixed(15));
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error);
      });
  })
}

export const ETCBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://etcchain.com/api/v1/getAddressBalance?address=${addr}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.balance != null || responseJson.balance != undefined) {
          resolve(responseJson.balance)
        } else {
          resolve('조회 불가')
        }
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error)
      });
  })
}

export const XRPBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://data.ripple.com/v2/accounts/${addr}/balances`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson != null) {
          if (responseJson.result == 'success')
            resolve(responseJson.balances[0].value)
          else
            resolve('조회 불가') //주소오류

        } else {
          resolve('조회 불가') //api오류
        }
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error)
      })
  })
}

export const LTCBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://ltc.blockr.io/api/v1/address/balance/${addr}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 'success') {
          resolve(responseJson.data.balance)
        } else {
          resolve('조회 불가')
        }
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error)
      })
  })
}

export const DASHBalance = (addr) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.blockcypher.com/v1/dash/main/addrs/${addr}/balance`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.balance != null) {
          resolve(responseJson.balance)
        } else {
          resolve('조회 불가')
        }
      })
      .catch((error) => {
        resolve('조회 불가')
        console.error(error)
      })
  })
}