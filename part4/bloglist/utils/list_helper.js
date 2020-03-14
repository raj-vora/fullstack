const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    var sum = 0
    blogs.forEach(blog => {
        sum = sum + blog['likes']
    });
    return sum
}

const favouriteBlog = blogs => {
    var favourite = {},
        max = 0;
    blogs.forEach(blog => {
        if (blog['likes'] > max) {
            favourite = blog
            max = blog['likes']
        }
    })
    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}