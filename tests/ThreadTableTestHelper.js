/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "Thread title test",
    body = "Thread body test",
    owner = "user-123",
    date = "2023-10-26T15:34:43.671Z",
  }) {
    const query = {
      text: "INSERT INTO threads VALUES ($1, $2, $3, $4, $5)",
      values: [id, title, body, date, owner],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};

module.exports = ThreadTableTestHelper;
