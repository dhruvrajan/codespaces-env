from fastapi import FastAPI

app = FastAPI()


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