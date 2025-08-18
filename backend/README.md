# Blog API Backend

## Database

![erd by prisma](https://github.com/BradCodeCraft/odin-blog-api/blob/main/backend/design/odin-blog-api.png?raw=true)

## Routes

| Route                                | Method   | Purpose               |
| ------------------------------------ | -------- | --------------------- |
| `/users`                             | `POST`   | Creates a user        |
| `/users/login`                       | `POST`   | Authenticates a user  |
| `/users/comments`                    | `GET`    | Retrieves comments by |
|                                      |          | authenticated user    |
| `/users/comments`                    | `DELETE` | Deletes comments by   |
|                                      |          | authenticated user    |
| `/users/comments/:commentId`         | `GET`    | Gets comment id       |
|                                      |          | _commentId_ by        |
|                                      |          | authenticated user    |
| `/users/comments/:commentId`         | `PUT`    | Updates comment       |
|                                      |          | id _commentId_ by     |
|                                      |          | authenticated user    |
| `/users/comments/:commentId`         | `DELETE` | Deletes comment       |
|                                      |          | id _commentId_ by     |
|                                      |          | authenticated user    |
| `/posts`                             | `GET`    | Retrieves all         |
|                                      |          | available posts       |
| `/posts`                             | `POST`   | Creates a post        |
|                                      |          | if user is an         |
|                                      |          | admin                 |
| `/posts`                             | `DELETE` | Deletes all           |
|                                      |          | posts if user is an   |
|                                      |          | admin                 |
| `/posts/:postId`                     | `GET`    | Retrieves post        |
|                                      |          | id _postId_           |
| `/posts/:postId`                     | `PUT`    | Updates post          |
|                                      |          | id _postId_ if user   |
|                                      |          | is the author         |
|                                      |          | or admin              |
| `/posts/:postId`                     | `DELETE` | Deletes post          |
|                                      |          | id _postId_ if user   |
|                                      |          | is the author         |
|                                      |          | or admin              |
| `/posts/:postId/comments`            | `GET`    | Retrieves comments    |
|                                      |          | of post id            |
|                                      |          | _postId_              |
| `/posts/:postId/comments`            | `POST`   | Creates a comment     |
|                                      |          | in post id            |
|                                      |          | _postId_              |
| `/posts/:postId/comments`            | `DELETE` | Deletes a comment     |
|                                      |          | in post id            |
|                                      |          | _postId_              |
| `/posts/:postId/comments/:commentId` | `PUT`    | Updates comment id    |
|                                      |          | _commentId_ of post   |
|                                      |          | id _postId_           |
| `/posts/:postId/comments/:commentId` | `DELETE` | Deletes comment id    |
|                                      |          | _commentId_ of post   |
|                                      |          | id _postId_           |
