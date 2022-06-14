export const db = [
  {
    category: "pantalon",
    color: "red",
    size: "xl",
    price: "20.50",
    brand: "nike",
    title: "pantalone nike air 2022",
    discount: "20"
  }
];

export const filters = [
  {
    name: "Size",
    type: "checkbox",
    options: ["all", "xxs", "xs", "sm", "m", "l", "xl", "xxl"]
  },
  {
    name: "Color",
    type: "colorBox",
    options: [
      "red",
      "yellow",
      "black",
      "green",
      "purble",
      "grey",
      "blue",
      "white"
    ]
  },
  {
    name: "Marka",
    type: "select",
    options: [
      "all",
      "bmw",
      "huindai",
      "marceds",
      "cetrion",
      "nissan",
      "chevrolet",
      "toyota",
      "ford"
    ]
  },
  {
    name: "Price",
    type: "range",
    options: ["0", "100"]
  }
];
