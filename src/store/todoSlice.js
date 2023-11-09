import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos', 
    
    async function (_,{rejectWithValue}) {

    
try {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

    if (!response.ok){
        
        throw new Error('server error')
    
    }
    const data = await response.json()
    return data;
    
} catch (error) {return rejectWithValue(error.message)
    
}




}

)

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async function (id,{rejectWithValue,dispatch}) {

    
    try {
    
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
            method:'DELETE',
        });
    
        if (!response.ok){
            
            throw new Error('server DELETE error')
        
        }
       
        dispatch(removeTodo({id}))
        // const data = await response.json()
        // return data;
        
    } catch (error) {return rejectWithValue(error.message)
        
    }
    
    
    
    
    }
    
    )

const setError=(state,action)=>{
    state.status='rejected';
    state.error=action.payload
}


const todoSlice = createSlice({
    name:'todos',
    initialState:{
        todos:[],
        status:null,
        error:null,
    },
    reducers:{

        addTodo(state, action){
           if (action.payload!='')
            state.todos.push({
                id:new Date().toISOString(),
                text:action.payload.texts,
                completed: false,

            })
        },
        
        removeTodo(state, action){
            state.todos= state.todos.filter(todo=>todo.id!==action.payload.id)
        },
        toggleCompleted(state, action){
const toggledTodo = state.todos. find(todo=>todo.id===action.payload.id);
toggledTodo.completed=!toggledTodo.completed
        }
       
    },
    extraReducers:{
[fetchTodos.pending]:(state,action)=>{state.status='loading'; state.error=null;}, //pending загрузка
[fetchTodos.fulfilled]:(state,action)=>{state.status='resolved';state.todos=action.payload }, //fulfilled получены данные
[fetchTodos.rejected]:setError, //rejected ошибка
[deleteTodo.rejected]:setError, //rejected ошибка
    } ,

})

        

export const{addTodo,removeTodo,toggleCompleted}=todoSlice.actions

export default todoSlice.reducer;