const todoReducer = (initialState, action) => {
    switch (action.type) {
       case "Load Todos":
            return action.payload;

        case "SET_TODOS":
            return action.payload;

        case "Add Todo":
            return [...initialState, action.payload];

        case "Delete Todo":
            return initialState.filter((todo) => todo.id !== action.payload);

            case "Complete Todo":
    return initialState.map(todo =>
        todo.id === action.payload._id || todo.id === action.payload.id
            ? { ...todo, status: action.payload.status } 
            : todo
    );
                
                
        case "Update Todo":
            return initialState.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, title: action.payload.title }
                    : todo
            );

        default:
            return initialState;
    }
}

export default todoReducer