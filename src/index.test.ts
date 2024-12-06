import request from "supertest";
import app from "./index";

describe(" Magasin Donut ", () => {
  let donutId: number;

  it("Fabriquer de nouveau donuts", async () => {
    const response = await request(app)
      .post("/fabriquer")
      .send({ name: "Donut au kinder Bueno", price: 2.5 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Donut au speculos");
    expect(response.body.price).toBe(2.5);
    donutId = response.body.id;
  });

  it("Modifier texture des donuts ", async () => {
    const response = await request(app)
      .put(`/modifier/${donutId}`)
      .send({ name: "Donut au kinder Bueno", price: 3.0 });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Donut fourré au nutella");
    expect(response.body.price).toBe(3.0);
  });

  it("Exposer tous les donuts", async () => {
    const response = await request(app).get("/exposer");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Vendre le donut", async () => {
    const createResponse = await request(app)
      .post("/vendre")
      .send({ name: "Donut à vendre", price: 2.0 });
    const donutIdToDelete = createResponse.body.id;

    const deleteResponse = await request(app).delete(
      `/vendre/${donutIdToDelete}`
    );
    expect(deleteResponse.status).toBe(204);
  });
});