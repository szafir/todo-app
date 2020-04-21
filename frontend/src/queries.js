import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
    mutation updateTodo($id: Int!, $done: Boolean, $title: String) {
        updateTodo(id: $id, done: $done, title: $title)
    }
`;
export const DELETE_TODO = gql`
    mutation deleteTodo($id: Int!) {
        deleteTodo(id: $id)
    }
`;
export const CREATE_TODO = gql`
    mutation createTodo($title: String!) {
        createTodo(title: $title)
    }
`;

export const TODOS = gql`
    query getTodos($page: Int) {
        todos(page: $page) {
            data {
                id
                done
                title
                createdAt
            }
            count
        }
    }
`;
