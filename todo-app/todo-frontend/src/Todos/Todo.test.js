import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SingleTodo from './SingleTodo'

describe('<SingleTodo />', () => {
  const todoDummy = {
    text: 'mal',
    done: false,
  }

  let onClickComplete
  let onClickDelete
  let container

  beforeEach(() => {
    onClickComplete = jest.fn()
    onClickDelete = jest.fn()
    container = render(
      <SingleTodo
        todo={todoDummy}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
    )
  })

  test('check createBlog form data', async () => {
    const text = container.queryByText('mal')
    const deleteButton = container.queryByText('Delete', { exact: false })
    expect(text).not.toBeNull()

    userEvent.click(deleteButton)

    expect(onClickDelete.mock.calls).toHaveLength(2)
  })
})
