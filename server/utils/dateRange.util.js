const dateRange = (start, end) => {
    let dateArray = new Array()
    let currentDate = start
    while(currentDate <= end){
        dateArray.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
}

module.exports = dateRange