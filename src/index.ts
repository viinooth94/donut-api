import express, { Request, Response } from "express";
import { frabriquerDonut, modifierDonut, exposerDonuts, vendreDonut } from "./db-utils";

const app = express();
app.use(express.json());


app.post("/fabriquer", (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Nom et prix pas defini" });
  }
  const newDonut = frabriquerDonut(name, price);
  res.status(201).json(newDonut);
});


app.get("/exposer", (_req: Request, res: Response) => {
  const donuts = exposerDonuts();
  res.json(donuts);
});


app.put("/modifier/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const updatedDonut = modifierDonut(parseInt(id), name, price);
  if (!updatedDonut) {
    return res.status(404).end();
  }
  res.json(updatedDonut);
});


app.delete("/vendre/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const success = vendreDonut(parseInt(id));
  if (!success) {
    return res.status(404).end();
  }
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;