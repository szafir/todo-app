import { TODOS } from "../queries";

export const fetchMoreLogic = ({ onPage, data }) => ({
    variables: {
        first: onPage,
        skip: data.todos.data.length,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        const newResult = {
            todos: {
                count: fetchMoreResult.todos.count,
                data: [
                    ...prevResult.todos.data,
                    ...fetchMoreResult.todos.data,
                ],
            },
        };

        return newResult;
    },
});

export const deleteTodoLogic = ({ id, onPage }) => ({
    variables: {
        id,
    },
    update: (cache, response) => {
        if (!response.data.deleteTodo) {
            return;
        }

        const { todos } = cache.readQuery({
            query: TODOS,
            variables: {
                first: onPage,
            },
        });

        cache.writeQuery({
            query: TODOS,
            data: {
                todos: {
                    count: todos.count - 1,
                    data: todos.data.filter((item) => item.id !== id),
                },
            },
            variables: {
                first: onPage,
            },
        });
    },
});

export const createTodoLogic = ({ title, onPage }) => ({
    variables: {
        title,
    },
    update: (cache, result) => {
        const { todos } = cache.readQuery({
            query: TODOS,
            variables: {
                first: onPage,
            },
        });

        cache.writeQuery({
            query: TODOS,
            data: {
                todos: {
                    count: todos.count + 1,
                    data: [result.data.createTodo, ...todos.data],
                },
            },
            variables: {
                first: onPage,
            },
        });
    },
});
