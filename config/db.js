import { createPool } from "mysql2/promise";

const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'gestorventas'
})

export { connection };