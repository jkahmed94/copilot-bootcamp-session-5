# Patterns Discovered# Patterns Discovered



Purpose: Catalog of reusable implementation & debugging strategies. Each pattern should be concise, actionable, and test-informed.Purpose: Living catalog of reusable implementation and debugging patterns extracted from real sessions. Each pattern should have clear problem framing and concise solution guidance.



## Pattern Template## Pattern Template

``````

### Pattern: <Name>### Pattern: <Name>

**Context**: <Where it applies>**Context**: <Where this arises – component rendering, API init, test setup>

**Problem**: <Recurring issue or inefficiency>**Problem**: <Symptom or recurring issue>

**Solution**: <Core approach>**Solution**: <Core actionable fix or approach>

**Example**:**Example**:

```javascript```javascript

// minimal illustrative snippet// minimal illustrative snippet

``````

**Related Files**: <Key impacted files>**Related Files**: <key files or modules>

**Notes**: <Edge cases / variations>**Notes**: <edge cases, variations>

``````



------



### Pattern: Collection Initialization### Pattern: Collection Initialization

**Context**: In-memory storage for todos in backend API.**Context**: In-memory service setup for storing todos.

**Problem**: Operations (push/map/filter) on undefined or null `todos` causing runtime errors & failing tests.**Problem**: Failing tests and runtime errors due to operations (e.g., push, map) on `undefined` or `null` collections.

**Solution**: Initialize mutable collections to empty arrays at module load. Provide optional reset helper for tests.**Solution**: Always initialize mutable collections as empty arrays (`[]`) at module load to ensure predictable iteration and mutation.

**Example**:**Example**:

```javascript```javascript

// BEFORE// BEFORE

let todos; // push will throw TypeErrorlet todos; // later: todos.push(newTodo) => TypeError



// AFTER// AFTER

let todos = [];let todos = []; // safe for push, map, filter immediately

let nextId = 1;

function addTodo(title) {

function createTodo(title) {  const todo = { id: nextId++, title, completed: false, createdAt: Date.now() };

  const todo = { id: nextId++, title, completed: false, createdAt: Date.now() };  todos.push(todo);

  todos.push(todo);  return todo;

  return todo;}

}```

**Related Files**: `packages/backend/src/app.js`

// Optional (test helper)**Notes**: For test isolation, consider exporting a reset function (`export function _resetStore() { todos = []; nextId = 1; }`) used only in test setup.

export function _resetStore() {

  todos = [];---

  nextId = 1;

}(Add further patterns below using the template.)
```
**Related Files**: `packages/backend/src/app.js`
**Notes**: Avoid reassigning to new arrays mid-request; mutate consistently unless refactoring for immutability.

---

(Add new patterns below using the template.)