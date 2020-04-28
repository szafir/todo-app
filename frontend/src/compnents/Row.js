import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { TODOS, DELETE_TODO } from "../queries";

const useStyles = makeStyles({
    itemDone: {
        textDecoration: "line-through",
    },
    itemLabel: {
        minWidth: 100,

        height: 20,
    },
});

export default ({
    row,
    editModeId,
    editModeText,
    handleDone,
    handleEditMode,
    handleEditModeTextChange,
    handleEditModeTextKeyDown,
    handleEditModeTextBlur,
    onPage,
}) => {
    const classes = useStyles();
    const [deleteTodo] = useMutation(DELETE_TODO);

    const handleDelete = (id) => {
        deleteTodo({
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
    };

    return (
        <TableRow>
            <TableCell scope="row" width="15">
                <Checkbox
                    defaultChecked={row.done}
                    color="primary"
                    onClick={() => handleDone(row.id, row.done)}
                />
            </TableCell>
            <TableCell
                scope="row"
                onClick={() => handleEditMode(row.id, row.title)}
            >
                {editModeId === row.id && (
                    <TextField
                        autoFocus
                        id="outlined-basic"
                        value={editModeText}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        onChange={handleEditModeTextChange}
                        onKeyDown={handleEditModeTextKeyDown}
                        onBlur={handleEditModeTextBlur}
                    />
                )}
                {editModeId !== row.id && (
                    <label
                        className={`${classes.itemLabel} ${
                            row.done ? classes.itemDone : ""
                        }`}
                    >
                        {row.title} {row.id}
                    </label>
                )}
            </TableCell>

            <TableCell align="right" width="90">
                {row.id !== -1 && (
                    <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => handleDelete(row.id)}
                        role="button"
                    >
                        Delete
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
