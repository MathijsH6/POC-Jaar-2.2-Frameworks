MongoDB Design decisions

Collections:
- users
- projects
- tasks

Relationships:
- Project references User via ownerId (ObjectId)
- Task references Project via projectId (ObjectId)

Embedding vs Referencing:
- Tasks stored in their own collection (referencing) because tasks may grow in number and are often queried/updated independently.
- If a project always has a small, bounded number of tasks and tasks are only read together with project, consider embedding tasks array in Project document.

Indexes:
- users: email (unique)
- projects: ownerId
- tasks: projectId

Sample query patterns:
- Get project with tasks: find project by _id and then find tasks with projectId
- List projects for user: find projects by ownerId

Migration notes:
- Start with referencing; if you notice tasks are always read with project and are small, migrate to embedding for read performance.