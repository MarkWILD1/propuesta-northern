export const HOME_SLUG = "home";

export function defaultLandingPageCreateData() {
  return {
    slug: HOME_SLUG,
    title: "Colegio Northern",
    eyebrow: "Educacion con identidad",
    heroTitle: "Un colegio cercano para crecer con confianza.",
    heroSubtitle:
      "Una landing institucional para presentar informacion comercial, imagenes, propuestas y novedades con una experiencia clara en cualquier dispositivo.",
    ctaLabel: "Inscripciones",
    ctaHref: "#contacto",
    levelsTitle: "Una propuesta para cada etapa",
    statsTitle: "Nuestra comunidad en numeros",
    featuredTitle: "Lo que nos define",
    activitiesTitle: "Lenguas extranjeras",
    activitiesKicker: "Vida escolar",
    galleryTitle: "Talleres",
    newsTitle: "Noticias",
    instagramTitle: "Más allá del aula",
    instagramUrl: "",
    contactTitle: "Hablemos de la propuesta educativa",
    contactBody:
      "Escribinos para conocer admisiones, actividades y novedades del Colegio Northern.",
    contactEmail: "info@northern.edu",
    contactPhone: "",
    sections: {
      create: [
        {
          title: "Biculturalidad",
          body: "Una formacion integral que prioriza valores como la honestidad, la solidaridad y la tolerancia, junto a la organizacion, la constancia y el respeto.",
          ctaLabel: "Leer mas",
          ctaHref: "#colegio",
          sortOrder: 0,
        },
        {
          title: "Excelencia academica",
          body: "Educacion de destacada calidad academica con foco en el desarrollo integral, el espiritu critico y la preparacion para un mundo en constante evolucion.",
          ctaLabel: "Leer mas",
          ctaHref: "#colegio",
          sortOrder: 1,
        },
        {
          title: "Nuestros valores",
          body: "Formamos personas integras y respetuosas, listas para el mundo, en el marco de la autonomia, la disciplina, la responsabilidad y la solidaridad.",
          ctaLabel: "Leer mas",
          ctaHref: "#colegio",
          sortOrder: 2,
        },
      ],
    },
    navLinks: {
      create: [
        { label: "Inicio", href: "/#top", linkType: "SECTION", sortOrder: 0 },
        { label: "Propuesta", href: "/#niveles", linkType: "SECTION", sortOrder: 1 },
        { label: "El Colegio", href: "/#colegio", linkType: "SECTION", sortOrder: 2 },
        {
          label: "Actividades",
          href: "/#actividades",
          linkType: "SECTION",
          sortOrder: 3,
        },
        { label: "Talleres", href: "/#talleres", linkType: "SECTION", sortOrder: 4 },
        { label: "Contacto", href: "/#contacto", linkType: "SECTION", sortOrder: 5 },
      ],
    },
    announcementBar: {
      create: {
        message: "Inscripciones abiertas",
        linkType: "NONE",
        dismissible: true,
        published: false,
      },
    },
    programLevels: {
      create: [
        {
          title: "Educacion Inicial",
          slug: "educacion-inicial",
          body: "Un primer espacio calido y seguro donde el juego y la exploracion impulsan el aprendizaje.",
          detailBody:
            "En Educacion Inicial acompanamos a cada nino y nina en sus primeros pasos escolares con un entorno calido, seguro y estimulante.\n\nEl juego, la exploracion y el contacto con la naturaleza son el centro de nuestra propuesta, favoreciendo el desarrollo emocional, social y cognitivo.",
          altText: "Educacion Inicial",
          driveUrl: "",
          driveFileId: "",
          ctaLabel: "Contactanos",
          ctaHref: "/#contacto",
          sortOrder: 0,
        },
        {
          title: "Primaria",
          slug: "primaria",
          body: "Bases solidas en lo academico y humano, acompanando a cada estudiante en su proceso.",
          detailBody:
            "La Primaria consolida bases solidas en lo academico y lo humano, respetando los ritmos de aprendizaje de cada estudiante.\n\nPromovemos la curiosidad, el trabajo colaborativo y el sentido de pertenencia, preparando a los alumnos para enfrentar nuevos desafios con confianza.",
          altText: "Primaria",
          driveUrl: "",
          driveFileId: "",
          ctaLabel: "Contactanos",
          ctaHref: "/#contacto",
          sortOrder: 1,
        },
        {
          title: "Secundaria",
          slug: "secundaria",
          body: "Pensamiento critico y autonomia para enfrentar los desafios de un mundo en evolucion.",
          detailBody:
            "En Secundaria fortalecemos el pensamiento critico, la autonomia y la responsabilidad personal y social.\n\nNuestros estudiantes desarrollan herramientas para aprender de forma permanente y participar activamente en un mundo en constante evolucion.",
          altText: "Secundaria",
          driveUrl: "",
          driveFileId: "",
          ctaLabel: "Contactanos",
          ctaHref: "/#contacto",
          sortOrder: 2,
        },
      ],
    },
    stats: {
      create: [
        { value: "40", label: "Anos", sortOrder: 0 },
        { value: "1200", label: "Alumnos", sortOrder: 1 },
        { value: "180", label: "Funcionarios", sortOrder: 2 },
        { value: "3", label: "Sedes", sortOrder: 3 },
      ],
    },
    activities: {
      create: [
        {
          title: "Inglés",
          body: "Una propuesta sostenida para desarrollar la comunicación oral y escrita en una lengua extranjera.",
          ctaLabel: "Leer mas",
          ctaHref: "#contacto",
          sortOrder: 0,
        },
        {
          title: "Portugués",
          body: "Experiencias de aprendizaje que acercan a los estudiantes a la lengua y la cultura regional.",
          ctaLabel: "Leer mas",
          ctaHref: "#contacto",
          sortOrder: 1,
        },
        {
          title: "Francés",
          body: "Un espacio para ampliar horizontes culturales y sumar nuevas herramientas de comunicación.",
          ctaLabel: "Leer mas",
          ctaHref: "#contacto",
          sortOrder: 2,
        },
      ],
    },
    news: {
      create: [
        {
          title: "Bienvenidos al nuevo ano escolar",
          excerpt: "Comenzamos un nuevo ciclo lleno de proyectos, encuentros y aprendizajes para toda la comunidad.",
          dateLabel: "Marzo 2026",
          sortOrder: 0,
        },
        {
          title: "Feria del libro",
          excerpt: "Celebramos el mes del libro con actividades en todos los niveles del colegio.",
          dateLabel: "Mayo 2026",
          sortOrder: 1,
        },
        {
          title: "Expo de Tecnologia e Innovacion",
          excerpt: "Una jornada de creatividad y descubrimiento donde los estudiantes exploraron el mundo de la tecnologia.",
          dateLabel: "Junio 2026",
          sortOrder: 2,
        },
      ],
    },
    locations: {
      create: [
        {
          name: "Sede Central",
          addressLines: "Av. Northern 1234\nMontevideo\nCod. Postal 11300",
          phone: "(+598) 2000 0000",
          body: "",
          altText: "",
          driveUrl: null,
          driveFileId: null,
          href: null,
          sortOrder: 0,
        },
      ],
    },
    physicalEducation: {
      create: {
        title: "Educación física",
        body: "",
        altText: "",
        driveUrl: null,
        driveFileId: null,
        ctaLabel: null,
        ctaHref: null,
        published: false,
      },
    },
    multidisciplinaryTeam: {
      create: {
        title: "Equipo multidisciplinario",
        body: "",
        published: false,
      },
    },
    institutionalProject: {
      create: {
        title: "Proyecto institucional",
        body: "",
        altText: "",
        driveUrl: null,
        driveFileId: null,
        published: false,
      },
    },
    finalShow: {
      create: {
        title: "Muestra final",
        body: "",
        eventAt: null,
        videoUrl: null,
        published: false,
      },
    },
  };
}
