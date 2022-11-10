import React from 'react'
import SingleTodo from './SingleTodo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos
        .map((todo) => (
          <SingleTodo
            key={todo._id}
            todo={todo}
            onClickComplete={onClickComplete}
            onClickDelete={onClickDelete}
          />
        ))
        .reduce((acc, cur) => [...acc, <hr key={cur.text} />, cur], [])}
    </>
  )
}

export default TodoList
