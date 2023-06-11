import Controller from "../controller";

describe("controller.js tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("login should return true for successful login", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({status: 200});

    const result = await Controller.login("username", "password");

    expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    });
    expect(result).toBe(true);
  });

  test("login should return false for failed login", async () => {
    const responseMock = {
      status: 400,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({responseMock});

    const result = await Controller.login("username", "password");

    expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    });
    expect(result).toBe(false);
  });
});
