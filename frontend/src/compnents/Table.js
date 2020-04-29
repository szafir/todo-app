import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Footer from "./Footer";
import Row from "./Row";

export default ({ items = [], newMode, setNewMode, count = 0, onPage }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {newMode && (
                        <Row
                            row={{ done: false, id: -1 }}
                            onPage={onPage}
                            setNewMode={setNewMode}
                        />
                    )}
                    {items.map((row) => (
                        <Row
                            row={row}
                            onPage={onPage}
                            key={`${row.id}-${row.title}`}
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
