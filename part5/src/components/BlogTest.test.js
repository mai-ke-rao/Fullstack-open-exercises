import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog.js'
import userEvent from '@testing-library/user-event'
import CreateNew from './CreateNew'
import Toggable from './Toggable.js'



test('Renders a blog', () => {
const blog = { title: "idemo",
author: "dalje",
url: "gadfasdgfasdfasdre",
likes: 31}
render(<Blog blog={blog}/>)
const element = screen.getByText("idemo dalje", { exact: false })
expect(element).toBeDefined()
}
)

test('Url and number of likes shown', async()=>{
    const blog = { title: "idemo",
author: "dalje",
url: "gadfasdgfasdfasdre",
likes: 31,
users:[{
    username: "pegas",
    name: "takovski"
}]}
render(<Blog blog={blog}/>)
const user = userEvent.setup()
const button = screen.getByText('view')
await user.click(button)
const element = screen.getByText('gadfasdgfasdfasdre', { exact: false })
const element2 = screen.getByText('likes', { exact: false })
expect(element && element2).toBeDefined()
})

test("Blog form calls event handler with right details when blog is created", async()=>{
    const mockHandler = jest.fn()
    
    render(<Toggable buttonLabel="Create new"></Toggable>)
    render(<CreateNew handleCreate={mockHandler}/>)
    
    const user = userEvent.setup()
    const button = screen.getByText('Create new')
    await user.click(button)
    const button2 = screen.getByText('Create')
    await user.click(button2)
     expect(mockHandler.mock.calls[0][0].author && mockHandler.mock.calls[0][0].title
       && mockHandler.mock.calls[0][0].url).toBeDefined()
})


test('Like button operational',async () => {
    const blog = { title: "idemo",
author: "dalje",
url: "gadfasdgfasdfasdre",
likes: 31,
users:[{
    username: "pegas",
    name: "takovski"
}]
}

const mockHandler = jest.fn()

render(<Blog blog={blog} addLike={mockHandler}/>)
const user = userEvent.setup()
const button = screen.getByText('view')
await user.click(button)


const button2 = screen.getByText('like')
await user.click(button2)
await user.click(button2)
expect(mockHandler.mock.calls).toHaveLength(2)
})

