const dateRange = (start, end) => {
    let dateArray = new Array()
    let currentDate = new Date(start)
    while(currentDate <= new Date(end)){
        dateArray.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
}

module.exports = dateRange