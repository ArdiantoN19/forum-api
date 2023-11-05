class GetDetailThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(useCasePayload) {
    const threadId = useCasePayload;
    const thread = await this._threadRepository.getDetailThreadByThreadId(
      threadId
    );
    let comments = await this._commentRepository.getCommentsByThreadId(
      threadId
    );
    const replies = await this._replyRepository.getRepliesCommentByThreadId(
      threadId
    );

    const repliesComment = (replies, commentId) => {
      let results = [...replies];
      results = results.filter((reply) => reply.comment_id === commentId);
      results = results.map((reply) => {
        return {
          id: reply.id,
          content: reply.is_delete
            ? "**balasan telah dihapus**"
            : reply.content,
          date: reply.date,
          username: reply.username,
        };
      });
      return results;
    };

    comments = comments.map((comment) => {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        replies: repliesComment(replies, comment.id),
        content: comment.is_delete
          ? "**komentar telah dihapus**"
          : comment.content,
      };
    });

    return { ...thread, comments };
  }
}

module.exports = GetDetailThreadUseCase;
