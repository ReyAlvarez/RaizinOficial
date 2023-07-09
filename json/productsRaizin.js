let Cart = [];

export const productList = [
  {
    id: 1,
    title: "Melena de León en capsulas",
    description:
      "La melena de león es un hongo medicinal con propiedades neuroprotectoras, estimula el crecimiento de células nerviosas y fortalece el sistema inmunológico. Beneficia la salud cerebral, promueve la función cognitiva y puede tener efectos positivos en el bienestar general.",
    image: "/images/products/Lions-Mane-Mushroom-Drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },
  {
    id: 2,
    title: "Reishi en capsulas",
    description:
      "El reishi es un hongo medicinal con propiedades adaptogénicas y fortalecedoras del sistema inmunológico, utilizado para mejorar la vitalidad y promover la longevidad. Es un potente antioxidante y se investiga por sus beneficios para combatir el estrés y mejorar la salud en general.",
    image: "/images/products/reishi-mushroom-illustration.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },
  {
    id: 3,
    title: "Cordyceps en capsulas",
    description:
      "El cordyceps es un hongo medicinal valorado por sus beneficios energizantes y adaptogénicos. Mejora la resistencia física, fortalece el sistema inmunológico y puede aumentar la vitalidad. Además, se le atribuyen propiedades antiinflamatorias y antioxidantes, promoviendo la salud en general.",
    image: "/images/products/Cordyceps-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },

  {
    id: 4,
    title: "Shiitake en capsulas",
    description:
      "El shiitake es un hongo con numerosos beneficios para la salud. Es conocido por fortalecer el sistema inmunológico, mejorar la salud cardiovascular, regular el colesterol y poseer propiedades antioxidantes y antiinflamatorias. También se le atribuyen efectos positivos en la salud ósea y la función cognitiva.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },
  {
    id: 5,
    title: "Chaga en capsulas",
    description:
      "La chaga es un hongo con poderosos beneficios para la salud. Es reconocido por su capacidad para fortalecer el sistema inmunológico, combatir la inflamación, promover la salud digestiva, regular el azúcar en la sangre y apoyar la función hepática. Además, se le atribuyen propiedades antioxidantes y antitumorales.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },
  {
    id: 6,
    title: "Cola de Pavo en capsulas",
    description:
      "La cola de pavo es un hongo con potenciales beneficios en el cáncer. Se ha estudiado por sus propiedades antitumorales y su capacidad para fortalecer el sistema inmunológico, promover la apoptosis celular y reducir la proliferación de células cancerosas. Sin embargo, se requiere más investigación en este campo.",
    image: "/images/products/Turkey-Tail-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "capsulas",
    stock: 10,
  },

  {
    id: 7,
    title: "Melena de León en tintura",
    description:
      "La melena de león es un hongo medicinal con propiedades neuroprotectoras, estimula el crecimiento de células nerviosas y fortalece el sistema inmunológico. Beneficia la salud cerebral, promueve la función cognitiva y puede tener efectos positivos en el bienestar general.",
    image: "/images/products/Lions-Mane-Mushroom-Drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },
  {
    id: 8,
    title: "Reishi",
    description:
      "El reishi es un hongo medicinal con propiedades adaptogénicas y fortalecedoras del sistema inmunológico, utilizado para mejorar la vitalidad y promover la longevidad. Es un potente antioxidante y se investiga por sus beneficios para combatir el estrés y mejorar la salud en general.",
    image: "/images/products/reishi-mushroom-illustration.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },
  {
    id: 9,
    title: "Cordyceps",
    description:
      "El cordyceps es un hongo medicinal valorado por sus beneficios energizantes y adaptogénicos. Mejora la resistencia física, fortalece el sistema inmunológico y puede aumentar la vitalidad. Además, se le atribuyen propiedades antiinflamatorias y antioxidantes, promoviendo la salud en general.",
    image: "/images/products/Cordyceps-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },

  {
    id: 10,
    title: "Shiitake",
    description:
      "El shiitake es un hongo con numerosos beneficios para la salud. Es conocido por fortalecer el sistema inmunológico, mejorar la salud cardiovascular, regular el colesterol y poseer propiedades antioxidantes y antiinflamatorias. También se le atribuyen efectos positivos en la salud ósea y la función cognitiva.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },
  {
    id: 11,
    title: "Chaga",
    description:
      "La chaga es un hongo con poderosos beneficios para la salud. Es reconocido por su capacidad para fortalecer el sistema inmunológico, combatir la inflamación, promover la salud digestiva, regular el azúcar en la sangre y apoyar la función hepática. Además, se le atribuyen propiedades antioxidantes y antitumorales.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },
  {
    id: 12,
    title: "Cola de Pavo",
    description:
      "La cola de pavo es un hongo con potenciales beneficios en el cáncer. Se ha estudiado por sus propiedades antitumorales y su capacidad para fortalecer el sistema inmunológico, promover la apoptosis celular y reducir la proliferación de células cancerosas. Sin embargo, se requiere más investigación en este campo.",
    image: "/images/products/Turkey-Tail-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "tintura",
    stock: 10,
  },

  {
    id: 13,
    title: "Melena de León en polvo",
    description:
      "La melena de león es un hongo medicinal con propiedades neuroprotectoras, estimula el crecimiento de células nerviosas y fortalece el sistema inmunológico. Beneficia la salud cerebral, promueve la función cognitiva y puede tener efectos positivos en el bienestar general.",
    image: "/images/products/Lions-Mane-Mushroom-Drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },
  {
    id: 14,
    title: "Reishi en polvo",
    description:
      "El reishi es un hongo medicinal con propiedades adaptogénicas y fortalecedoras del sistema inmunológico, utilizado para mejorar la vitalidad y promover la longevidad. Es un potente antioxidante y se investiga por sus beneficios para combatir el estrés y mejorar la salud en general.",
    image: "/images/products/reishi-mushroom-illustration.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },
  {
    id: 15,
    title: "Cordyceps en polvo",
    description:
      "El cordyceps es un hongo medicinal valorado por sus beneficios energizantes y adaptogénicos. Mejora la resistencia física, fortalece el sistema inmunológico y puede aumentar la vitalidad. Además, se le atribuyen propiedades antiinflamatorias y antioxidantes, promoviendo la salud en general.",
    image: "/images/products/Cordyceps-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },

  {
    id: 16,
    title: "Shiitake en polvo",
    description:
      "El shiitake es un hongo con numerosos beneficios para la salud. Es conocido por fortalecer el sistema inmunológico, mejorar la salud cardiovascular, regular el colesterol y poseer propiedades antioxidantes y antiinflamatorias. También se le atribuyen efectos positivos en la salud ósea y la función cognitiva.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },
  {
    id: 17,
    title: "Chaga en polvo",
    description:
      "La chaga es un hongo con poderosos beneficios para la salud. Es reconocido por su capacidad para fortalecer el sistema inmunológico, combatir la inflamación, promover la salud digestiva, regular el azúcar en la sangre y apoyar la función hepática. Además, se le atribuyen propiedades antioxidantes y antitumorales.",
    image: "/images/products/Chaga-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },
  {
    id: 18,
    title: "Cola de Pavo en polvo",
    description:
      "La cola de pavo es un hongo con potenciales beneficios en el cáncer. Se ha estudiado por sus propiedades antitumorales y su capacidad para fortalecer el sistema inmunológico, promover la apoptosis celular y reducir la proliferación de células cancerosas. Sin embargo, se requiere más investigación en este campo.",
    image: "/images/products/Turkey-Tail-mushroom-drawing.jpg",
    quantity: 60,
    price: 5500,
    category: "polvo",
    stock: 10,
  },
];
