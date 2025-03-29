async def f() -> int:
    return 1


async def g():
    x: int = await f()


def main():
    print("Hello from app!")


if __name__ == "__main__":
    main()
