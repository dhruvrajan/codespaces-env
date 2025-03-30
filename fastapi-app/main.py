from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Allow Angular's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/hello")
async def hello():
    print("sayhello")
    return "sayhello"


@app.get("/goodbye")
async def goodbye():
    print("saygoodbye")
    return "saygoodbye"


@app.get("/hellogoodbye")
async def hellogoodbye():
    await hello()
    await goodbye()
    return "hellogoodbye"


FAKE_USERS = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"},
    {"id": 3, "name": "Charlie", "email": "charlie@example.com"},
    {"id": 4, "name": "David", "email": "david@example.com"},
    {"id": 5, "name": "Eve", "email": "eve@example.com"},
    {"id": 6, "name": "Frank", "email": "frank@example.com"},
    {"id": 7, "name": "Grace", "email": "grace@example.com"},
    {"id": 8, "name": "Hannah", "email": "hannah@example.com"},
    {"id": 9, "name": "Ian", "email": "ian@example.com"},
    {"id": 10, "name": "Jane", "email": "jane@example.com"},
]


@app.get("/fake_search", response_model=List[dict])
async def fake_search(q: Optional[str] = None, limit: Optional[int] = 10):
    """
    Fake search endpoint that filters users by name or email based on query 'q'.
    - q: Search term (optional, case-insensitive).
    - limit: Maximum number of results (optional, defaults to 10).
    """
    # If no query is provided, return all users up to the limit
    if not q:
        return FAKE_USERS[:limit]

    # Filter users based on the search term (case-insensitive)
    q = q.lower()
    filtered_users = [
        user
        for user in FAKE_USERS
        if q in user["name"].lower() or q in user["email"].lower()
    ]

    # Return limited results
    return filtered_users[:limit]
