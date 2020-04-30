import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { useQuery } from "@apollo/react-hooks";
import Table from "../compnents/Table";
import { TODOS } from "../queries";
import { fetchMoreLogic } from "../logic/TodoLogic";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    containerRoot: {
    },
    tableHeader: {
        justifyContent: "flex-end",
        display: "flex",
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

const onPage = 5;

export default function Home() {
    const classes = useStyles();
    const [cursor, setCursor] = useState(0);

    const { data, fetchMore } = useQuery(TODOS, {
        variables: {
            first: onPage,
        },
    });

    const [newMode, setNewMode] = useState(false);
    const handleNewMode = () => {
        setNewMode(true);
    };

    useEffect(() => {
        if (cursor > 0) {
            fetchMore(fetchMoreLogic({
                onPage, data,
            }));
        }
    }, [cursor]);

    const handleLoadMore = () => {
        setCursor(cursor + 1);
    };

    const showLoadMore = data
        && data.todos
        && data.todos.count
        && data.todos.count !== data.todos.data.length;

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">TODO application</Typography>
                </Toolbar>
            </AppBar>
            <Container
                component="main"
                maxWidth="md"
                classes={{
                    root: classes.containerRoot,
                }}
            >
                <div className={classes.tableHeader}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewMode}
                    >
                        Create TODO
                    </Button>
                </div>

                <Table
                    items={data && data.todos && data.todos.data}
                    newMode={newMode}
                    setNewMode={setNewMode}
                    onPage={onPage}
                    count={data && data.todos && data.todos.count}
                />
                {showLoadMore && (
                    <div className={classes.tableHeader}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLoadMore}
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </Container>
        </>
    );
}
