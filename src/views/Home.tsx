import { useEffect, useState } from "react"
import { useApiRequest } from "../hooks/useApiRequest"
import { TodoList, TodoListObject } from "../types/todoType"
import TextInput from "../components/TextInput"
import '../styles/General.css'
import error404 from '../assets/error404.png';
import error from '../assets/error.png';

const Home = () => {

  //const [todoList, setTodoList] = useState<todoList>([])
  const [filter, setFilter] = useState<string>('')

  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  let { 
    data: todoList,
    isLoading: loadingTodos,
    error: todosError,
    errorCode,
    setNewData: setTodoList
  } = useApiRequest<TodoList>({url: 'https://jsonplaceholder.typicode.com/todos'})

  const onFilter = (text: string) => {
    setFilter(text)
    setPageNumber(0)
  }

  const numberBetween = (num: number, from: number, to: number) => {
    return num >= from && num < to
  }

  const onCheckTodo = (item: TodoListObject) => {
    if (item.completed) {
      setTodoList(
        todoList?.map((todo: TodoListObject) =>
          todo.id === item.id ? { ...todo, completed: false } : todo
        )
      ) 
    } else {
      setTodoList(
        todoList?.map((todo: TodoListObject) =>
          todo.id === item.id ? { ...todo, completed: true } : todo
        )
      )  
    }
  }

  const onPrevPage = () => {
    setPageNumber(page => page > 0 ? page-1 : 0)
  }

  const onNextPage = () => {
    let filteredList = todoList.filter((item: TodoListObject) => item.title.includes(filter)).filter((item: TodoListObject) => showCompleted ?  true : !item.completed)
    setPageNumber(page => filteredList.length / pageSize > page + 1 ? page + 1 : page)
  }

  const onShowCompleted = () => {
    let filteredList = todoList.filter((item: TodoListObject) => item.title.includes(filter)).filter((item: TodoListObject) => !showCompleted ?  true : !item.completed)
    setShowCompleted(completed => !completed)
    if (Math.ceil(filteredList.length / pageSize) < pageNumber + 1) {
      setPageNumber(Math.ceil(filteredList.length / pageSize) - 1)
    }
  }

  return (
    <div className="appContainer">
      {
        loadingTodos ?
          <div>
            loading...
          </div>
        :
          todosError ? 
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <img
                src={errorCode === 404 ? error404 : error}
                alt="Error 404"
                width={'128px'}
                style={{marginBottom: '25px'}}
              />
              <span>
                {
                  errorCode === 404 ?
                  "No se encontraron elementos para la dirección solicitada"
                  :
                  "Se ha producido un error desconocido"
                }
              </span>
            </div>
          :
        <>
          <span style={{fontSize: '25px', color: '#16495d', fontWeight: 450}}>Lista de pendientes</span>
          <TextInput
            onChange={onFilter}
            icon={<i className="fa-solid fa-magnifying-glass"></i>}
            style={{marginBottom: '10px'}}
            placeholder={"Buscar..."}
          />

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <input type="checkbox" checked={showCompleted} style={{height: '14px', width: '14px'}} onChange={onShowCompleted}/>
            <span>Mostrar completados</span>
          </div>
          {
            todoList
            .filter((item: TodoListObject) => item.title.includes(filter))
            .filter((item: TodoListObject) => showCompleted ?  true : !item.completed)
            .filter((_: TodoListObject, index: number) => numberBetween(index, pageNumber * pageSize, (pageNumber + 1) * pageSize))
            .map((todo: TodoListObject) => (
              <div key={todo.id} className="todoItem" onClick={() => onCheckTodo(todo)}>
                <span className="todoTitle" style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.title}</span>
                {
                  todo.completed ?
                    <i className="fa-solid fa-check" style={{color: '#0E0'}}></i>
                  :
                    <i className="fa-regular fa-square"></i>
                }
              </div>
            ))
          }
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
              <i className="fa-solid fa-caret-left" onClick={onPrevPage} style={{fontSize: '20px', cursor: 'pointer', color: pageNumber > 0 ? 'black' : '#999'}}></i>
              <span>{pageNumber + 1} / {Math.ceil(todoList.filter((item: TodoListObject) => item.title.includes(filter)).filter((item: TodoListObject) => showCompleted ?  true : !item.completed).length / pageSize)}</span>
              <i className="fa-solid fa-caret-right" onClick={onNextPage} style={{fontSize: '20px', cursor: 'pointer', color: todoList.filter((item: TodoListObject) => item.title.includes(filter)).filter((item: TodoListObject) => showCompleted ?  true : !item.completed).length / pageSize > pageNumber + 1 ? 'black' : '#999'}}></i>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Home
