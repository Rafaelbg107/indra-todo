import { useState } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { TodoList, TodoListObject } from "../types/todoType"
import TextInput from "../components/TextInput"

const Home = () => {

  //const [todoList, setTodoList] = useState<todoList>([])
  const [filter, setFilter] = useState<string>('')

  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(0)

  let { data: todoList, isLoading: loadingTodos, error: todosError, setNewData: setTodoList } = useApiRequest<TodoList>({url: 'https://jsonplaceholder.typicode.com/todos/'})

  const onFilter = (text: string) => {
    setFilter(text)
    setPageNumber(0)
  }

  const numberBetween = (num: number, from: number, to: number) => {
    return num >= from && num < to
  }

  const onCheckTodo = (item: TodoListObject) => {
    setTodoList(
      todoList?.map((todo: TodoListObject) =>
        todo.id === item.id ? { ...todo, completed: true } : todo
      )
    )  
  }

  const onUncheckTodo = (item: TodoListObject) => {
    setTodoList(
      todoList?.map((todo: TodoListObject) =>
        todo.id === item.id ? { ...todo, completed: false } : todo
      )
    )  
  }

  const onPrevPage = () => {
    setPageNumber(page => page > 0 ? page-1 : 0)
  }

  const onNextPage = () => {
    const filteredList = todoList.filter((item: TodoListObject) => item.title.includes(filter))
    setPageNumber(page => filteredList.length / pageSize > page + 1 ? page + 1 : page)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'flex-start', width: '100%', minHeight: '100%', overflow: 'hidden'}}>
      {
        loadingTodos ?
          <div>
            loading...
          </div>
        :
        <>
          <TextInput
            onChange={onFilter}
            icon={<i className="fa-solid fa-magnifying-glass"></i>}
          />
          {
            todoList
            .filter((item: TodoListObject) => item.title.includes(filter))
            .filter((_: TodoListObject, index: number) => numberBetween(index, pageNumber * pageSize, (pageNumber + 1) * pageSize))
            .map((todo: TodoListObject) => (
              <div key={todo.id} style={{border: '1px solid #999', borderRadius: 8, padding: '10px 10px', gap: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>{todo.title}</span>
                {
                  todo.completed ?
                    <i className="fa-solid fa-check" style={{color: '#0E0', cursor: 'pointer'}} onClick={() => onUncheckTodo(todo)}></i>
                  :
                    <i className="fa-regular fa-square" style={{cursor: 'pointer'}} onClick={() => onCheckTodo(todo)}></i>
                }
              </div>
            ))
          }
          <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
            <i className="fa-solid fa-caret-left" onClick={onPrevPage} style={{fontSize: '20px', cursor: 'pointer', color: pageNumber > 0 ? 'black' : '#999'}}></i>
            <span>{pageNumber + 1}</span>
            <i className="fa-solid fa-caret-right" onClick={onNextPage} style={{fontSize: '20px', cursor: 'pointer', color: todoList.filter((item: TodoListObject) => item.title.includes(filter)).length / pageSize > pageNumber + 1 ? 'black' : '#999'}}></i>
          </div>
        </>
      }
    </div>
  )
}

export default Home
