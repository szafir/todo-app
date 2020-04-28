import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
    mutation updateTodo($id: Int!, $done: Boolean, $title: String) {
        updateTodo(id: $id, done: $done, title: $title) {
            id
            done
            title
        }
    }
`;
export const DELETE_TODO = gql`
    mutation deleteTodo($id: Int!) {
        deleteTodo(id: $id)
    }
`;
export const CREATE_TODO = gql`
    mutation createTodo($title: String!) {
        createTodo(title: $title) {
            id
            done
            title
            createdAt
        }
    }
`;

export const TODOS = gql`
    query getTodos($first: Int, $skip: Int, $filter: String) {
        todos(first: $first, skip: $skip, filter: $filter) {
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
