import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('<Blog />', () => {
           
    
    const user = {
        username: "Example username"
    }

    const blog = {
    title: 'Example Title',
    author: 'Example author',
    likes: 4,
    user: user

    }

    const like = jest.fn()
    const deleteBlog = jest.fn()
    
    let container 
    beforeEach(() => {

       container = render(<Blog blog={blog} user ={user} like={like} deleteBlog = {deleteBlog}/>).container

    })


    test('renders title', () => {
        

        const title = container.querySelector('.title')
        expect(title).toHaveTextContent(
        'Example Title'
        )

        const details = container.querySelector('.details')
        expect(details).toHaveStyle('display: none')

    })

    test('show likes', async() => {
        
        const user = userEvent.setup()
        const button = screen.getByText('Show details')
        await user.click(button)

        const numLikes = await screen.findByText('4')
        expect(numLikes).toBeDefined()
    })

    
    test('likes is cliked twice', async() => {
        
        const user = userEvent.setup()
        const detailsButton = screen.getByText('Show details')
        await user.click(detailsButton)

        const likesButton = screen.getByText('Like')
        await user.click(likesButton)
        await user.click(likesButton)

        expect(like.mock.calls).toHaveLength(2)

    })

    
    test('Blog is created', async() => {

        const createBlog = jest.fn()
        
        render(<BlogForm createBlog={createBlog} />)

        const user = userEvent.setup()
        const inputs = screen.getAllByRole('textbox')
        await user.type(inputs[0], 'Blog Title')
        await user.type(inputs[1], 'Blog Author')
        await user.type(inputs[2], 'Blog URL')

        const submitButton = screen.getByText('Create')
        await user.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
        expect(createBlog.mock.calls[0][0].author).toBe('Blog Author')
        expect(createBlog.mock.calls[0][0].url).toBe('Blog URL')

    })



})
