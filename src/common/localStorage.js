const Key='GOODS'
const getLocalGoods=()=>{
    return JSON.parse(localStorage.getItem(Key)||'{}')
}
const getTotalCount=()=>{
    const localGoods=getLocalGoods()
    let totalCount=0
    for (var key in localGoods) {
        totalCount+=localGoods[key]
    }
    return totalCount
    
}
const addLocalGoods=goods=>{
    const localGoods=getLocalGoods()
    if(localGoods[goods.goodsId]){
        // console.log(goods)
        localGoods[goods.goodsId]+=goods.count
    }else{
        localGoods[goods.goodsId]=goods.count
    }
    localStorage.setItem(Key,JSON.stringify(localGoods))

    return getTotalCount()
}

const updateLocalGoods=goods=>{
    // console.log(goods)
    const localGoods=getLocalGoods()
    localGoods[goods.goodsId]=goods.count
    localStorage.setItem(Key,JSON.stringify(localGoods))

 return getTotalCount()
}
const deleteLocalGoods=goodId=>{
    const localGoods=getLocalGoods()
    delete localGoods[goodId]
    localStorage.setItem(Key,JSON.stringify(localGoods))
    return getTotalCount()
}
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoods
}