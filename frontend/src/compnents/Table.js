import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useMutation } from "@apollo/react-hooks";
import { TODOS, UPDATE_TODO, CREATE_TODO } from "../queries";
import Footer from "./Footer";
import Row from "./Row";

export default ({ items, newMode, setNewMode, count, onPage }) => {
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
        });
    };

    const handleEditMode = (id, text) => {
        if (editModeId === id) {
            return;
        }
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
            setNewMode(false);
        } else {
            updateTodo({
                variables: {
                    id: editModeId,
                    title: editModeText,
                },
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
            <Table>
                <TableBody>
                    {newMode && (
                        <Row
                            row={{ done: false, id: -1 }}
                            onPage={onPage}
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
                            onPage={onPage}
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
                        <TableRow key="no-items">
                            <TableCell colSpan={6}>No items</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <Footer count={count} itemsAmount={items.length} />
            </Table>
        </TableContainer>
    );
};
