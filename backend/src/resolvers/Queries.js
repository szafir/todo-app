exports.module = {
    todos: async (_, args, { pool }) => {
        let sql = `SELECT * FROM todos`;
        const data = await pool.then((par) => par.query(sql));

        const { done } = args;
        let result = [...data];
 
        if (done !== undefined) {
            result = result.filter((item) => item.done == done);
        }
        const count = result.length;

        const { onPage, page } = args;
        result = result.splice(onPage * (page - 1), onPage);
        return {
            data: result,
            count,
        };
    },
    todo: async (_, args, { pool }) => {
        const { id } = args;
        let sql = `SELECT * FROM todos where id=?`;
        const res = await pool
            .then((par) => par.query(sql, id))
            .then((results) => results[0]);

        return res;
    },
};
