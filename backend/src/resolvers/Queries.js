exports.module = {
    todos: async (_, args, { pool }) => {
        const countSql = `SELECT count(*) as count FROM todos`;
        const countData = await pool.then((par) => par.query(countSql));
        const { count } = countData[0];

        const { onPage, page } = args;
        const sql = `SELECT * FROM todos order by createdAt desc limit ?,?`;
        const data = await pool.then((par) => par.query(sql, [onPage * page, onPage]));
        
        return {
            data: [...data],
            count,
        };
    },
    todo: async (_, args, { pool }) => {s
        const { id } = args;
        let sql = `SELECT * FROM todos where id=?`;
        const res = await pool
            .then((par) => par.query(sql, id))
            .then((results) => results[0]);

        return res;
    },
};
