import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@apollo/react-hooks";
import { TODOS, UPDATE_TODO, CREATE_TODO } from "../queries";
import Footer from "./Footer";
import Row from "./Row";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default ({ items, newMode, setNewMode, count }) => {
    const rowsPerPage = 5;

    const classes = useStyles();
    const history = useHistory();
    let { page = 0 } = queryString.parse(history.location.search);
    page = parseInt(page, 10);

    const [updateTodo] = useMutation(UPDATE_TODO);
    const [createTodo] = useMutation(CREATE_TODO);
    const [editModeId, setEditModeId] = useState(0);
    const [editModeText, setEditModeText] = useState("");

    const handleDone = (id, done) => {
        updateTodo({
            variables: {
                id,
                done: !done,
            },
            refetchQueries: [{ query: TODOS, variables: { page } }],
        });
    };

    const handleEditMode = (id, text) => {
        setEditModeId(id);
        setEditModeText(text);
    };
    const handleEditModeTextChange = (event) => {
        setEditModeText(event.target.value);
    };
    const handleEditModeTextKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleEditModeTextBlur();
        }
    };
    const handleEditModeTextBlur = () => {
        if (editModeId === -1) {
            createTodo({
                variables: {
                    title: editModeText,
                },
                refetchQueries: [{ query: TODOS, variables: { page } }],
            });
            setNewMode(false);
        } else {
            updateTodo({
                variables: {
                    id: editModeId,
                    title: editModeText,
                },
                refetchQueries: [{ query: TODOS, variables: { page } }],
            });
        }
        setEditModeId(0);
        setEditModeText("");
    };

    useEffect(() => {
        setEditModeId(-1);
    }, [newMode]);
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableBody>
                    {newMode && (
                        <Row
                            row={{ done: false, id: -1 }}
                            page={page}
                            editModeId={editModeId}
                            editModeText={editModeText}
                            handleDone={handleDone}
                            handleEditMode={handleEditMode}
                            handleEditModeTextChange={handleEditModeTextChange}
                            handleEditModeTextKeyDown={
                                handleEditModeTextKeyDown
                            }
                            handleEditModeTextBlur={handleEditModeTextBlur}
                        />
                    )}
                    {items.map((row) => (
                        <Row
                            row={row}
                            page={page}
                            key={`${row.id}-${row.title}`}
                            editModeId={editModeId}
                            editModeText={editModeText}
                            handleDone={handleDone}
                            handleEditMode={handleEditMode}
                            handleEditModeTextChange={handleEditModeTextChange}
                            handleEditModeTextKeyDown={
                                handleEditModeTextKeyDown
                            }
                            handleEditModeTextBlur={handleEditModeTextBlur}
                        />
                    ))}

                    {count === 0 && !newMode && (
                        <TableRow>
                            <TableCell colSpan={6}>No items</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                {count > rowsPerPage && (
                    <Footer
                        count={count}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                )}
            </Table>
        </TableContainer>
    );
};
