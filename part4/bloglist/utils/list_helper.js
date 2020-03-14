const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    var sum = 0
    blogs.forEach(element => {
        sum = sum + element['likes']
    });
    return sum
}

module.exports = {
    dummy,
    totalLikes
}