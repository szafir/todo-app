import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO, UPDATE_TODO, CREATE_TODO } from "../queries";

import { createTodoLogic, deleteTodoLogic } from "../logic/TodoLogic";
import { NoSsr } from "@material-ui/core";

const useStyles = makeStyles({
    itemDone: {
        textDecoration: "line-through",
    },
    itemLabel: {
        minWidth: 100,

        height: 20,
    },
});

export default ({ row, setNewMode = () => {}, onPage }) => {
    const classes = useStyles();
    const [isEditMode, setIsEditMode] = useState(row.id === -1);
    const [textField, setTextField] = useState(row.title || "");

    const [deleteTodo] = useMutation(DELETE_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [createTodo] = useMutation(CREATE_TODO);

    const handleDone = () => {
        updateTodo({
            variables: {
                id: row.id,
                done: !row.done,
            },
        });
    };
    const handleDelete = () => {
        deleteTodo(deleteTodoLogic({ id: row.id, onPage }));
    };

    const handleEditModeTextChange = (event) => {
        setTextField(event.target.value);
    };

    const handleEditModeTextKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleEditModeTextBlur();
        }
    };

    const handleEditModeTextBlur = () => {
        setIsEditMode(false);
        if (row.id === -1) {
            createTodo(createTodoLogic({ title: textField, onPage }));
            setNewMode(false);
        } else {
            updateTodo({
                variables: {
                    id: row.id,
                    title: textField,
                },
            });
        }
    };
    const handleEditMode = () => {
        setIsEditMode(true);
    };
    return (
        <TableRow>
            <TableCell scope="row" width="15">
                <NoSsr>
                    <Checkbox
                        defaultChecked={row.done}
                        color="primary"
                        onClick={handleDone}
                    />
                </NoSsr>
            </TableCell>
            <TableCell scope="row" onClick={handleEditMode}>
                {isEditMode && (
                    <TextField
                        autoFocus
                        value={textField}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        onChange={handleEditModeTextChange}
                        onKeyDown={handleEditModeTextKeyDown}
                        onBlur={handleEditModeTextBlur}
                    />
                )}
                {!isEditMode && (
                    <label
                        className={`${classes.itemLabel} ${
                            row.done ? classes.itemDone : ""
                        }`}
                    >
                        {textField}
                    </label>
                )}
            </TableCell>

            <TableCell align="right" width="90">
                {row.id !== -1 && (
                    <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleDelete}
                        role="button"
                    >
                        Delete
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
