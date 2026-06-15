export const HOME_SLUG = "home";

export function defaultLandingPageCreateData() {
  return {
    slug: HOME_SLUG,
    title: "Colegio Northern",
    eyebrow: "Educacion con identidad",
    heroTitle: "Un colegio cercano para crecer con confianza.",
    heroSubtitle:
      "Una landing institucional para presentar informacion comercial, imagenes, propuestas y novedades con una experiencia clara en cualquier dispositivo.",
    ctaLabel: "Contactar al colegio",
    ctaHref: "mailto:info@northern.edu",
    contactTitle: "Hablemos de la propuesta educativa",
    contactBody:
      "Escribinos para conocer admisiones, actividades y novedades del Colegio Northern.",
    contactEmail: "info@northern.edu",
    contactPhone: "",
    sections: {
      create: [
        {
          title: "Proyecto institucional",
          body: "Un espacio educativo pensado para acompanar a cada estudiante con cercania, orden y una comunicacion clara con las familias.",
          sortOrder: 0,
        },
        {
          title: "Comunidad y actividades",
          body: "La pagina puede mostrar experiencias, eventos, jornadas y momentos importantes del colegio a traves de fotografias publicadas desde Drive.",
          sortOrder: 1,
        },
        {
          title: "Informacion siempre actualizada",
          body: "El panel administrativo permite cambiar textos, secciones y fotos sin pedir cambios en el codigo.",
          sortOrder: 2,
        },
      ],
    },
  };
}
