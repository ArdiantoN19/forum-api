const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const GetDetailThreadUseCase = require("../GetDetailThreadUseCase");

describe("GetDetailThreadUseCase", () => {
  it("should orchestrating the get detail thread action correctly", async () => {
    // Arrange
    const useCasePayload = "thread-123";
    const thread = {
      id: "thread-123",
      title: "Thread title test",
      body: "Thread body test",
      date: "2021-08-08T07:19:09.775Z",
      username: "ardi",
    };

    const comments = [
      {
        id: "comment-123",
        username: "johndoe",
        date: "2021-08-08T07:22:33.555Z",
        content: "sebuah comment",
        is_delete: false,
      },
    ];

    const replies = [
      {
        id: "reply-123",
        content: "content reply comment",
        date: "2021-08-08T07:59:48.766Z",
        username: "ardi",
        comment_id: "comment-123",
        is_delete: false,
      },
    ];

    const expectedReplies = replies.map((reply) => {
      return {
        id: reply.id,
        content: reply.content,
        date: reply.date,
        username: reply.username,
      };
    });

    const expectedComments = comments.map((comment) => {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.content,
        replies: expectedReplies,
      };
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getDetailThreadByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({
          id: "thread-123",
          title: "Thread title test",
          body: "Thread body test",
          date: "2021-08-08T07:19:09.775Z",
          username: "ardi",
        })
      );

    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: "comment-123",
            username: "johndoe",
            date: "2021-08-08T07:22:33.555Z",
            content: "sebuah comment",
            is_delete: false,
          },
        ])
      );
    mockThreadRepository.getRepliesCommentByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: "reply-123",
            content: "content reply comment",
            date: "2021-08-08T07:59:48.766Z",
            username: "ardi",
            comment_id: "comment-123",
            is_delete: false,
          },
        ])
      );

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const detailThread = await getDetailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(detailThread).toEqual({
      ...thread,
      comments: expectedComments,
    });
    expect(mockThreadRepository.getDetailThreadByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockThreadRepository.getRepliesCommentByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockThreadRepository.getDetailThreadByThreadId).toBeCalledTimes(1);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledTimes(1);
    expect(mockThreadRepository.getRepliesCommentByThreadId).toBeCalledTimes(1);
  });

  it("should return deleted comment correctly", async () => {
    // Arrange
    const useCasePayload = "thread-123";
    const thread = {
      id: "thread-123",
      title: "Thread title test",
      body: "Thread body test",
      date: "2021-08-08T07:19:09.775Z",
      username: "ardi",
    };

    const comments = [
      {
        id: "comment-123",
        username: "johndoe",
        date: "2021-08-08T07:22:33.555Z",
        content: "**komentar telah dihapus**",
        is_delete: true,
      },
    ];

    const replies = [
      {
        id: "reply-123",
        date: "2021-08-08T07:59:48.766Z",
        username: "ardi",
        comment_id: "comment-123",
        content: "**balasan telah dihapus**",
        is_delete: true,
      },
    ];

    const expectedReplies = replies.map(
      ({ comment_id, is_delete, ...otherProperties }) => otherProperties
    );
    const expectedComments = comments.map(
      ({ is_delete, ...otherProperties }) => ({
        ...otherProperties,
        replies: expectedReplies,
      })
    );

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getDetailThreadByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({
          id: "thread-123",
          title: "Thread title test",
          body: "Thread body test",
          date: "2021-08-08T07:19:09.775Z",
          username: "ardi",
        })
      );

    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: "comment-123",
            username: "johndoe",
            date: "2021-08-08T07:22:33.555Z",
            content: "**komentar telah dihapus**",
            is_delete: true,
          },
        ])
      );
    mockThreadRepository.getRepliesCommentByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: "reply-123",
            comment_id: "comment-123",
            date: "2021-08-08T07:59:48.766Z",
            username: "ardi",
            content: "**balasan telah dihapus**",
            is_delete: true,
          },
        ])
      );

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const detailThread = await getDetailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(detailThread).toEqual({
      ...thread,
      comments: expectedComments,
    });
    expect(mockThreadRepository.getDetailThreadByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockThreadRepository.getRepliesCommentByThreadId).toBeCalledWith(
      useCasePayload
    );
    expect(mockThreadRepository.getDetailThreadByThreadId).toBeCalledTimes(1);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledTimes(1);
    expect(mockThreadRepository.getRepliesCommentByThreadId).toBeCalledTimes(1);
  });
});
