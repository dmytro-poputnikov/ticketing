import request from "supertest";
import { app } from "../../app";

describe("SignOut Tests:", () => {
  it("clears the cookie after signing out", async () => {
    const signUpResponse = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    expect(signUpResponse.get("Set-Cookie")).toBeDefined();

    const reponseSignOut = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    expect(reponseSignOut.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
