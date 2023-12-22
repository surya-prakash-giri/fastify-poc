const tableName = 'user';

const getAllUsers = `SELECT * FROM "${tableName}"`;
const getSingleUser = `SELECT * FROM "${tableName}" WHERE id=$1`;
const insertUser = `INSERT INTO "${tableName}" (name, email, age, gender) VALUES($1, $2, $3, $4);`;
const deleteUser = `DELETE FROM "${tableName}" WHERE id=$1;`
const updateUserQry = `UPDATE "${tableName}" SET $1 WHERE id=$2;`

export {getAllUsers, getSingleUser, insertUser, deleteUser, updateUserQry}