const todos = async (_, args, { pool }) => {
    const countSql = `SELECT count(*) as count FROM todos`;
    const countData = await pool.then((par) => par.query(countSql));
    const { count } = countData[0];

    const { first, skip } = args;
    const sql = `SELECT * FROM todos order by createdAt desc, id desc limit ?,?`;
    const data = await pool.then((par) =>
        par.query(sql, [skip, first])
    );
    return {
        data: [...data],
        count,
    };
};
const todo = async (_, args, { pool }) => {
    const { id } = args;
    let sql = `SELECT * FROM todos where id=?`;
    const res = await pool
        .then((par) => par.query(sql, id))
        .then((results) => results[0]);
    return res;
};
export default {
    todo,
    todos,
};
