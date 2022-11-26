import { connection } from "../../config/db"

export default async function handler(req, res) {

  const [rows] = await connection.query('SELECT NOW()')
  res.status(200).json(rows[0]['NOW()'])
}
