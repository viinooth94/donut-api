interface Donut {
  id: number;
  name: string;
  price: number;
}

let donuts: Donut[] = [];
let currentId = 1;

export const frabriquerDonut = (name: string, price: number): Donut => {
  const newDonut: Donut = { id: currentId++, name, price };
  donuts.push(newDonut);
  return newDonut;
};

export const modifierDonut = (
  id: number,
  name?: string,
  price?: number
): Donut | null => {
  const donut = donuts.find((d) => d.id === id);
  if (!donut) return null;

  if (name !== undefined) donut.name = name;
  if (price !== undefined) donut.price = price;

  return donut;
};

export const exposerDonuts = (): Donut[] => {
  return donuts;
};


export const vendreDonut = (id: number): boolean => {
  const index = donuts.findIndex((d) => d.id === id);
  if (index === -1) return false;

  donuts.splice(index, 1);
  return true;
};