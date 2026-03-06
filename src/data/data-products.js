export const products = [
  {
    id: 1,
    slug: "classic-open",

    name: {
      en: "Classic Mattress (Open)",
      fr: "Matelas Classique (Ouvert)",
      ar: "مرتبة كلاسيك مفتوحة",
    },

    description: {
      en: "Classic open foam mattress available in D30 and D36 densities.",
      fr: "Matelas mousse classique disponible en densité D30 et D36.",
      ar: "مرتبة إسفنج كلاسيكية متوفرة بكثافة D30 و D36.",
    },

    category: "classic",
    subcategory: "open",

    available: true,
    featured: false,

    discount: 2000,

    images: [
      "/images/classic/classic-D30-5.jpeg",
      "/images/classic/classic-D36-1.jpeg",
    ],

    details: {
      thickness: 22,
      firmness: 8,

      densities: [
        { value: "D30", label: "D30" },
        { value: "D36", label: "D36" },
      ],

      dimensions: [
        {
          size: "90 x 190",
          options: [
            { density: "D30", thickness: 20, price: 14500 },
            { density: "D36", thickness: 20, price: 17500 },
          ],
        },
      ],

      whyChoose: {
        en: [
          "Firm support for spine alignment",
          "Available in D30 and D36 densities",
        ],
        fr: [
          "Soutien ferme pour la colonne vertébrale",
          "Disponible en densité D30 et D36",
        ],
        ar: ["دعم قوي للعمود الفقري", "متوفر بكثافة D30 و D36"],
      },

      technicalSpecs: {
        en: [
          { label: "Foam type", value: "High density polyurethane foam" },
          { label: "Density", value: "D30 / D36" },
        ],
        fr: [
          {
            label: "Type de mousse",
            value: "Mousse polyuréthane haute densité",
          },
          { label: "Densité", value: "D30 / D36" },
        ],
        ar: [
          { label: "نوع الإسفنج", value: "إسفنج عالي الكثافة" },
          { label: "الكثافة", value: "D30 / D36" },
        ],
      },
    },
  },
];
