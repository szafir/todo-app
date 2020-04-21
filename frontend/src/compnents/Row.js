import React, { useEffect } from "react";
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
});

export default ({
    row,
    page,
    editModeId,
    editModeText,
    handleDone,
    handleEditMode,
    handleEditModeTextChange,
    handleEditModeTextKeyDown,
    handleEditModeTextBlur,
}) => {
    const classes = useStyles();
    const [deleteTodo] = useMutation(DELETE_TODO);

    const handleDelete = (id) => {
        deleteTodo({
            variables: {
                id,
            },
            refetchQueries: [{ query: TODOS, variables: { page } }],
        });
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row" width="15">
                <Checkbox
                    defaultChecked={row.done}
                    color="primary"
                    onClick={() => handleDone(row.id, row.done)}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {editModeId === row.id && (
                    <TextField
                        autoFocus
                        id="outlined-basic"
                        value={editModeText}
                        variant="outlined"
                        size="small"
                        onChange={handleEditModeTextChange}
                        onKeyDown={handleEditModeTextKeyDown}
                        onBlur={handleEditModeTextBlur}
                    />
                )}
                <label
                    className={row.done ? classes.itemDone : null}
                    onClick={() => handleEditMode(row.id, row.title)}
                >
                    {editModeId !== row.id && row.title}
                </label>
            </TableCell>

            <TableCell align="right" width="90">
                {row.id !== -1 && (
                    <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
