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

    const expectedReplies = [
      {
        id: "reply-123",
        content: "content reply comment",
        date: "2021-08-08T07:59:48.766Z",
        username: "ardi",
      },
    ];

    const comments = [
      {
        id: "comment-123",
        username: "johndoe",
        date: "2021-08-08T07:22:33.555Z",
        content: "sebuah comment",
        is_delete: false,
      },
    ];
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
      .mockImplementation(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(comments));
    mockThreadRepository.getRepliesCommentByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(replies));

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
