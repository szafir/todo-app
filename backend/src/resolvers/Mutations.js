exports.module = {
    createTodo: async (_, args, { pool }) => {
        const { title } = args;
        const stmt = `INSERT INTO todos(title) VALUES(?)`;
        const data = await pool.then((conn) => conn.query(stmt, title));
        return data.affectedRows === 1;
    },
    updateTodo: async (_, args, { pool }) => {
        const { id } = args;

        let sql = `SELECT * FROM todos where id=?`;
        const item = await pool
            .then((par) => par.query(sql, id))
            .then((results) => results[0]);

        if (!item) {
            return false;
        }

        const { done = item.done, title = item.title } = args;

        const stmt = `UPDATE todos SET title=?, done=? where id=?`;
        const data = await pool.then((conn) =>
            conn.query(stmt, [title, done, id])
        );
        return data.affectedRows === 1;
    },
    deleteTodo: async (_, args, { pool }) => {
        const { id } = args;
        let sql = `DELETE FROM todos where id=?`;

        const data = await pool.then((par) => par.query(sql, id));

        if (!data) {
            return false;
        }
        return data.affectedRows === 1;
    },
};
