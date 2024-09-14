import { pool } from "../connection";
import TLivrosProps from "../tipos";

export default class LivrosRepository {
  async findById(id: string) {
    const query = "select * from livros where id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async findByAutorId(id: string) {
    const query = "select * from autores where id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async find() {
    const query = "select * from livros ";
    const { rows } = await pool.query(query);
    return rows;
  }

  async create(props: TLivrosProps) {
    const query =
      "insert into livros(titulo, autor_id) values ($1, $2) returning *";
    return await pool.query(query, [props.titulo, props.autor_id]);
  }

  async delete(id: number) {
    const query = "delete from livros where id = $1";

    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async update(titulo: string, id: number) {
    const query = "update livros set titulo = $1 where id = $2 returning *";

    return await pool.query(query, [titulo, id]);
  }
}
