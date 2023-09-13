const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) =>
{
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
}

const favouriteBlog = (blogs) =>
{
    const max =  Math.max(...blogs.map(blog => blog.likes));
    return blogs.find(blog => blog.likes == max).title
}

module.exports = {
dummy,
totalLikes,
favouriteBlog
}
