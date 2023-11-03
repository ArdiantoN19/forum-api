const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const ReplyRepository = require("../../Domains/replies/ReplyRepository");
const AddedReply = require("../../Domains/replies/entities/AddedReply");

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addCommentReply({ threadId, commentId, content, owner }) {
    const id = `reply-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: "INSERT INTO comment_replies VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, content, owner",
      values: [id, content, owner, threadId, commentId, date],
    };

    const result = await this._pool.query(query);
    return new AddedReply(result.rows[0]);
  }

  async verifyAvailableCommentReply(replyId) {
    const query = {
      text: "SELECT * FROM comment_replies WHERE id = $1",
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("reply tidak ditemukan");
    }
  }

  async verifyOwnerCommentReply(replyId, owner) {
    const query = {
      text: "SELECT * FROM comment_replies WHERE id = $1 AND owner = $2",
      values: [replyId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("Anda tidak berhak mengakses resorce ini");
    }
  }

  async deleteCommentReplyByReplyId(replyId) {
    const query = {
      text: "UPDATE comment_replies SET is_delete = TRUE WHERE id = $1",
      values: [replyId],
    };

    await this._pool.query(query);
  }
}

module.exports = ReplyRepositoryPostgres;
