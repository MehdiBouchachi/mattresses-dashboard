export const categories = [
  /* ================= CLASSIC ================= */

  {
    value: "classic",
    translations: {
      en: "Classic Range",
      fr: "Gamme Classique",
      ar: "الفئة الكلاسيكية",
    },

    subcategories: [
      {
        value: "roll",
        translations: {
          en: "Roll Packed",
          fr: "Roulé",
          ar: "ملفوفة",
        },

        types: [
          {
            value: "d30",
            translations: {
              en: "D30",
              fr: "D30",
              ar: "D30",
            },
          },
          {
            value: "d36",
            translations: {
              en: "D36",
              fr: "D36",
              ar: "D36",
            },
          },
        ],
      },

      {
        value: "open",
        translations: {
          en: "Open Form",
          fr: "Ouvert",
          ar: "مفتوحة",
        },

        types: [
          {
            value: "d30",
            translations: {
              en: "D30",
              fr: "D30",
              ar: "D30",
            },
          },
          {
            value: "d36",
            translations: {
              en: "D36",
              fr: "D36",
              ar: "D36",
            },
          },
        ],
      },
    ],
  },

  /* ================= MULTI LAYER ================= */

  {
    value: "multi-layer",
    translations: {
      en: "Multi-Layer Range",
      fr: "Gamme Multi-couches",
      ar: "فئة متعددة الطبقات",
    },

    subcategories: [
      {
        value: "confort",
        translations: {
          en: "Comfort",
          fr: "Confort",
          ar: "كونفورت",
        },
      },

      {
        value: "visco",
        translations: {
          en: "Visco",
          fr: "Visco",
          ar: "فيسكو",
        },
      },

      {
        value: "visco-plus",
        translations: {
          en: "Visco Plus",
          fr: "Visco Plus",
          ar: "فيسكو بلس",
        },
      },
    ],
  },

  /* ================= SPRING ================= */

  {
    value: "spring",
    translations: {
      en: "Spring Range",
      fr: "Gamme Ressorts",
      ar: "فئة النوابض",
    },

    subcategories: [
      {
        value: "spring-confort",
        translations: {
          en: "Confort",
          fr: "Confort",
          ar: "كونفور",
        },
      },

      {
        value: "spring-premium",
        translations: {
          en: "Premium",
          fr: "Premium",
          ar: "بريميوم",
        },
      },

      {
        value: "spring-prestige",
        translations: {
          en: "Prestige",
          fr: "Prestige",
          ar: "بريستيج",
        },
      },
    ],
  },
];
