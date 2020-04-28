import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";

export default ({ count, itemsAmount }) => {
    return (
        <TableFooter>
            <TableRow>
                <TableCell align="right" colSpan={6}>
                    {itemsAmount} / {count}
                </TableCell>
            </TableRow>
        </TableFooter>
    );
};
