import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "../compnents/Table";
import Container from "@material-ui/core/Container";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { TODOS } from "../queries";

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
    containerRoot: {},
    tableHeader: {
        justifyContent: "flex-end",
        display: "flex",
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

export default () => {
    const classes = useStyles();
    const history = useHistory();
    const { page = 0 } = queryString.parse(history.location.search);

    const { data } = useQuery(TODOS, {
        variables: { page: parseInt(page, 10) },
        fetchPolicy: "network-only",
    });

    const [newMode, setNewMode] = useState(false);
    const handleNewMode = () => {
        setNewMode(true);
    };
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
                classes={{ root: classes.containerRoot }}
            >
                <div className={classes.tableHeader}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewMode}
                    >
                        Add TODO
                    </Button>
                </div>
                <Table
                    items={(data && data.todos && data.todos.data) || []}
                    newMode={newMode}
                    setNewMode={setNewMode}
                    count={(data && data.todos && data.todos.count) || 0}
                />
            </Container>
        </>
    );
};
