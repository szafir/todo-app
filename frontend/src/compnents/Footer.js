import React from "react";
import { useHistory } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import queryString from "query-string";

export default ({ count, page, rowsPerPage }) => {
    const history = useHistory();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const setPage = (page) => {
        const params = queryString.parse(history.location.search);
        params.page = page;
        history.push({
            search: "?" + queryString.stringify(params),
        });
    };
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "rows per page",
                        },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};
