import { Request, Response } from "express";
import LivrosRepository from "../repositories/livrosRepository";
import TLivrosProps from "../tipos";

export default class LivroController {
  async create(req: Request, res: Response) {
    const { titulo, autor_id } = req.body;

    if (!titulo && !autor_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatorios!" });
    }

    try {
      const livrosRepository = new LivrosRepository();

      const newLivro: TLivrosProps = {
        titulo,
        autor_id,
      };

      const { rows: livroCriado } = await livrosRepository.create(newLivro);

      const livroRetornado = livroCriado[0];

      const retornoDoLivro = {
        id: livroRetornado.id,
        titulo: livroRetornado.titulo,
        autor_id: livroRetornado.autor_id,
      };

      return res.status(201).json(retornoDoLivro);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({
        message: erro.message,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const livrosRepository = new LivrosRepository();

      const livros = await livrosRepository.find();

      return res.json(livros);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({
        message: erro.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const { titulo } = req.body;
    const { id } = req.params;

    if (!titulo) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatorios!" });
    }

    if (!id) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    try {
      const livrosRepository = new LivrosRepository();

      const { rows: update } = await livrosRepository.update(
        titulo,
        Number(id)
      );
      if (update.length === 0) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }
      const updateRows = update[0];

      const updateRetornado = {
        id: updateRows.id,
        titulo: updateRows.titulo,
        autor_id: updateRows.autor_id,
      };

      return res.status(200).json(updateRetornado);
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({
        message: erro.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    try {
      const livrosRepository = new LivrosRepository();

      await livrosRepository.delete(Number(id));

      return res.status(204).send();
    } catch (error) {
      const erro = error as Error;
      return res.status(400).json({
        message: erro.message,
      });
    }
  }
}
