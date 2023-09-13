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
    return blogs.find(blog => blog.likes === max).title
}

const mostBlogs = (blogs) =>
{
    const blogCount = []
    
    blogs.forEach(element => {

        const authorName = blogCount.find(blog => blog.author === element.author)

        if(authorName === undefined)
        {
            const author = {
                author: element.author,
                blogs: 1
            }

            blogCount.push(author)
        }
        else
            blogCount.find(blog => blog.author === element.author).blogs++
    });

    const max =  Math.max(...blogCount.map(blog => blog.blogs));
    return blogCount.find(blog => blog.blogs === max)

}

module.exports = {
dummy,
totalLikes,
favouriteBlog,
mostBlogs
}
