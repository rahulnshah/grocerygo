- GET `/api/lists` to get all lists.
- POST `/api/lists` to create a new list.
- GET `/api/lists/[id]` to get a specific list by ID.
- PUT `/api/lists/[id]` to update a specific list by ID.
- DELETE `/api/lists/[id]` to delete a specific list by ID.
- Get All Favorite Lists: `app/api/favorites/route.ts`
- Add a Favorite List:` app/api/favorites/[listId]/route.ts`
- Get Favorite Lists by List ID: `app/api/favorites/list/[listId]/route.ts`
- Remove a Favorite List: `app/api/favorites/[id]/route.ts`

#### HTTP Verbs
- GET should return a list of objects
- POST should return newly inserted object
- DELETE should return nothing or a true or false
- UPDATE should return newly updated object