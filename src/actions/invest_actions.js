export const getInvestList = () => {
  return new Promise((resolve, reject) => {
    try {
      let investList = localStorage.getItem('invest')
      if (!investList) {
        investList = []
      } else {
        investList = JSON.parse(investList)
      }
      resolve(investList)
    } catch (error) {
      resolve(false)
      console.error(error)
    }
  })
}

export const addToInvestList = (investObj) => {
  return new Promise(async(resolve, reject) => {
    try {
      let investList = await getInvestList()
      let index
      if (investList.length == 0) {
        index = 0
      } else {
        index = investList[investList.length - 1].index + 1
      }
      investObj.index = index //set index
      investList.push(investObj)
        // console.log(investList)
      localStorage.setItem('invest', JSON.stringify(investList))
      resolve(true)
    } catch (error) {
      resolve(false)
      console.error(error)
    }
  })
}