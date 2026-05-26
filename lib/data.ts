// Datos centralizados de la guía turística de Cochabamba

import type {
  Lugar,
  Restaurante,
  Alojamiento,
  Evento,
  Resena,
  Gastronomia,
} from '@/lib/domain/types'
import {
  LugarBuilder,
  EventoBuilder,
  RestauranteBuilder,
  AlojamientoBuilder,
  ResenaBuilder,
  GastronomiaBuilder,
} from '@/lib/domain/builders'

// LUGARES TURÍSTICOS
export const lugares: Lugar[] = [
  {
    id: "cristo-concordia",
    nombre: "Cristo de la Concordia",
    descripcion: "La estatua de Cristo más alta de Sudamérica con vistas panorámicas de la ciudad.",
    descripcionLarga: "El Cristo de la Concordia es una estatua monumental de Jesucristo ubicada en el cerro de San Pedro. Con 34.20 metros de altura (40.44 con el pedestal), es la estatua de Cristo más alta de Sudamérica y la segunda más alta del mundo. Fue construida entre 1987 y 1994 y ofrece vistas espectaculares de toda la ciudad de Cochabamba y el valle.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "cultura",
    ubicacion: "Cerro San Pedro, Cochabamba",
    coordenadas: { lat: -17.3895, lng: -66.1568 },
    horarios: "Martes a Domingo: 9:00 - 18:00",
    precioEntrada: "Bs. 20 (teleférico) / Bs. 5 (escaleras)",
    consejos: [
      "Llevar protector solar y sombrero",
      "El teleférico es recomendado para subir",
      "Los domingos hay más afluencia de visitantes",
      "Llevar agua para la caminata"
    ],
    tours: [
      { nombre: "Tour Express", duracion: "2 horas", precio: "Bs. 50" },
      { nombre: "Tour Completo con Guía", duracion: "4 horas", precio: "Bs. 120" }
    ],
    comidasTipicas: ["Silpancho", "Api con pastel"],
    rating: 4.8,
    totalResenas: 1250
  },
  {
    id: "torotoro",
    nombre: "Parque Nacional Torotoro",
    descripcion: "Cañones, cavernas y huellas de dinosaurios en un paisaje único.",
    descripcionLarga: "Torotoro es un parque nacional ubicado a 140 km de Cochabamba, famoso por sus formaciones geológicas únicas, huellas de dinosaurios, cavernas profundas y el impresionante Cañón de Torotoro. Es un destino imperdible para los amantes de la paleontología y la aventura.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "arqueologia",
    ubicacion: "Provincia Charcas, Potosí",
    coordenadas: { lat: -18.1333, lng: -65.7667 },
    horarios: "Todos los días: 7:00 - 17:00",
    precioEntrada: "Bs. 100 (entrada al parque)",
    consejos: [
      "Contratar guía local es obligatorio",
      "Llevar linterna para las cavernas",
      "Usar calzado resistente al agua",
      "Reservar alojamiento con anticipación"
    ],
    tours: [
      { nombre: "Tour de 1 día", duracion: "12 horas", precio: "Bs. 250" },
      { nombre: "Tour de 2 días", duracion: "2 días", precio: "Bs. 500" }
    ],
    comidasTipicas: ["Charque", "Chicharrón de chancho"],
    rating: 4.9,
    totalResenas: 890
  },
  {
    id: "tunari",
    nombre: "Parque Nacional Tunari",
    descripcion: "Montañas, lagunas y senderos para trekking con flora y fauna nativa.",
    descripcionLarga: "El Parque Nacional Tunari protege la cordillera del mismo nombre al norte de Cochabamba. Con picos que superan los 5,000 metros, ofrece paisajes de alta montaña, lagunas glaciares, bosques de kewiña y una rica biodiversidad andina.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "naturaleza",
    ubicacion: "Norte de Cochabamba",
    coordenadas: { lat: -17.2500, lng: -66.3333 },
    horarios: "Acceso libre las 24 horas",
    precioEntrada: "Gratuito",
    consejos: [
      "Aclimatarse a la altura antes de subir",
      "Llevar ropa abrigada para la cumbre",
      "No dejar basura en el camino",
      "Ir acompañado por seguridad"
    ],
    tours: [
      { nombre: "Trekking Pico Tunari", duracion: "8 horas", precio: "Bs. 180" },
      { nombre: "Tour Lagunas", duracion: "6 horas", precio: "Bs. 150" }
    ],
    comidasTipicas: ["Trucha frita", "Sopa de maní"],
    rating: 4.7,
    totalResenas: 567
  },
  {
    id: "palacio-portales",
    nombre: "Palacio Portales",
    descripcion: "Mansión histórica con jardines franceses y arquitectura europea.",
    descripcionLarga: "El Palacio Portales fue construido entre 1915 y 1927 por el magnate del estaño Simón I. Patiño. Es un ejemplo extraordinario de arquitectura europea en Bolivia, con jardines diseñados al estilo francés y una rica colección de arte y mobiliario de la época.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "cultura",
    ubicacion: "Av. Potosí, Cochabamba",
    coordenadas: { lat: -17.3833, lng: -66.1500 },
    horarios: "Lunes a Viernes: 9:00 - 12:00, 15:00 - 18:00",
    precioEntrada: "Bs. 15",
    consejos: [
      "Las visitas guiadas son muy recomendables",
      "Fotografía permitida sin flash",
      "Visitar los jardines en primavera",
      "Reservar tour con anticipación"
    ],
    tours: [
      { nombre: "Visita Guiada", duracion: "1.5 horas", precio: "Bs. 30" }
    ],
    comidasTipicas: ["Salteñas", "Té con empanadas"],
    rating: 4.6,
    totalResenas: 423
  },
  {
    id: "laguna-corani",
    nombre: "Laguna Corani",
    descripcion: "Laguna artificial rodeada de montañas ideal para pesca y camping.",
    descripcionLarga: "La Laguna Corani es un embalse artificial ubicado a 47 km de Cochabamba, rodeado de montañas andinas. Es un destino popular para la pesca de truchas, camping y observación de aves, especialmente flamencos andinos.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "naturaleza",
    ubicacion: "Chapare, Cochabamba",
    coordenadas: { lat: -17.2167, lng: -66.3500 },
    horarios: "Acceso libre",
    precioEntrada: "Gratuito",
    consejos: [
      "Llevar carpa y sleeping para camping",
      "La pesca requiere permiso",
      "Llevar comida y bebidas propias",
      "El clima puede cambiar rápidamente"
    ],
    tours: [
      { nombre: "Tour de Pesca", duracion: "1 día", precio: "Bs. 200" },
      { nombre: "Camping Organizado", duracion: "2 días", precio: "Bs. 350" }
    ],
    comidasTipicas: ["Trucha al horno", "Chicharrón"],
    rating: 4.5,
    totalResenas: 312
  },
  {
    id: "incallajta",
    nombre: "Incallajta",
    descripcion: "Ruinas incaicas más grandes de Bolivia con impresionante arquitectura.",
    descripcionLarga: "Incallajta es el sitio arqueológico incaico más grande de Bolivia, ubicado a 132 km de Cochabamba. Fue un centro administrativo y militar del Tawantinsuyu con impresionantes estructuras de piedra, incluyendo la kallanka más grande del imperio inca.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "arqueologia",
    ubicacion: "Pocona, Cochabamba",
    coordenadas: { lat: -17.7167, lng: -65.3833 },
    horarios: "Todos los días: 8:00 - 17:00",
    precioEntrada: "Bs. 30",
    consejos: [
      "Contratar guía local para mejor experiencia",
      "Llevar agua y snacks",
      "Usar calzado cómodo para caminar",
      "El camino puede ser difícil en época de lluvias"
    ],
    tours: [
      { nombre: "Tour Arqueológico", duracion: "1 día", precio: "Bs. 280" }
    ],
    comidasTipicas: ["Pampaku", "Chicha"],
    rating: 4.8,
    totalResenas: 198
  },
  {
    id: "villa-tunari",
    nombre: "Villa Tunari",
    descripcion: "Puerta al Chapare con ríos, selva y parques ecológicos.",
    descripcionLarga: "Villa Tunari es la puerta de entrada al trópico cochabambino, ubicada en el corazón del Chapare. Ofrece ríos cristalinos, selva amazónica, parques ecológicos y una variada oferta de actividades de aventura y ecoturismo.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "naturaleza",
    ubicacion: "Chapare, Cochabamba",
    coordenadas: { lat: -16.9833, lng: -65.4167 },
    horarios: "Acceso libre a la zona",
    precioEntrada: "Varía según actividad",
    consejos: [
      "Llevar repelente de mosquitos",
      "Ropa ligera y traje de baño",
      "Visitar el Parque Machía",
      "Probar la cocina tropical local"
    ],
    tours: [
      { nombre: "Tour Selva", duracion: "1 día", precio: "Bs. 180" },
      { nombre: "Rafting Río Espíritu Santo", duracion: "4 horas", precio: "Bs. 250" }
    ],
    comidasTipicas: ["Surubí", "Majao"],
    rating: 4.6,
    totalResenas: 445
  },
  {
    id: "cancha",
    nombre: "La Cancha",
    descripcion: "El mercado al aire libre más grande de Sudamérica.",
    descripcionLarga: "La Cancha es el mercado popular más grande de Sudamérica, donde se puede encontrar literalmente de todo. Es un laberinto de puestos que ofrece una experiencia auténtica de la vida comercial boliviana y una oportunidad única para encontrar artesanías y productos locales.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "cultura",
    ubicacion: "Centro, Cochabamba",
    coordenadas: { lat: -17.3950, lng: -66.1550 },
    horarios: "Miércoles y Sábados: 6:00 - 18:00",
    precioEntrada: "Gratuito",
    consejos: [
      "Ir temprano para mejor experiencia",
      "Cuidar pertenencias personales",
      "Regatear es parte de la cultura",
      "Probar las comidas del mercado"
    ],
    tours: [
      { nombre: "Tour Gastronómico", duracion: "3 horas", precio: "Bs. 80" }
    ],
    comidasTipicas: ["Silpancho", "Api con buñuelos"],
    rating: 4.4,
    totalResenas: 678
  },
  {
    id: "plaza-14-septiembre",
    nombre: "Plaza 14 de Septiembre",
    descripcion: "Plaza principal con la Catedral y edificios coloniales históricos.",
    descripcionLarga: "La Plaza 14 de Septiembre es el corazón histórico de Cochabamba, rodeada por la Catedral Metropolitana, la Prefectura y otros edificios coloniales. Es el punto de partida ideal para explorar el centro histórico de la ciudad.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "cultura",
    ubicacion: "Centro Histórico, Cochabamba",
    coordenadas: { lat: -17.3936, lng: -66.1570 },
    horarios: "Acceso libre 24 horas",
    precioEntrada: "Gratuito",
    consejos: [
      "Visitar la Catedral por dentro",
      "Probar helados en las heladerías cercanas",
      "Ideal para fotos al atardecer",
      "Punto de inicio para tours a pie"
    ],
    tours: [
      { nombre: "Walking Tour Centro", duracion: "2 horas", precio: "Bs. 50" }
    ],
    comidasTipicas: ["Helados", "Salteñas"],
    rating: 4.5,
    totalResenas: 534
  },
  {
    id: "tarata",
    nombre: "Tarata",
    descripcion: "Pueblo colonial con tradición en la elaboración de chicha.",
    descripcionLarga: "Tarata es un pintoresco pueblo colonial a 35 km de Cochabamba, famoso por sus chicherías tradicionales y su arquitectura colonial bien conservada. Es cuna de la chicha cochabambina y ofrece una experiencia auténtica de la vida rural boliviana.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "cultura",
    ubicacion: "Provincia Esteban Arce",
    coordenadas: { lat: -17.6167, lng: -66.0167 },
    horarios: "Pueblo accesible 24 horas",
    precioEntrada: "Gratuito",
    consejos: [
      "Visitar las chicherías tradicionales",
      "Probar la chicha de maíz",
      "Ver el convento de San José",
      "Ir los fines de semana para más ambiente"
    ],
    tours: [
      { nombre: "Tour Chicherías", duracion: "4 horas", precio: "Bs. 100" }
    ],
    comidasTipicas: ["Chicha", "Lechón"],
    rating: 4.4,
    totalResenas: 287
  },
  {
    id: "parque-arqueologico",
    nombre: "Parque Arqueológico de Pisopata",
    descripcion: "Sitio con pinturas rupestres y formaciones rocosas antiguas.",
    descripcionLarga: "El Parque Arqueológico de Pisopata contiene importantes muestras de arte rupestre precolombino y formaciones rocosas únicas. Es un testimonio de las culturas que habitaron la región hace miles de años.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "arqueologia",
    ubicacion: "Tiquipaya, Cochabamba",
    coordenadas: { lat: -17.3333, lng: -66.2167 },
    horarios: "Lunes a Sábado: 8:00 - 16:00",
    precioEntrada: "Bs. 10",
    consejos: [
      "Llevar cámara para las pinturas",
      "Contratar guía local",
      "Usar protector solar",
      "Combinar con visita a Tiquipaya"
    ],
    tours: [
      { nombre: "Tour Arqueológico", duracion: "3 horas", precio: "Bs. 80" }
    ],
    comidasTipicas: ["Pique macho", "Chicharrón"],
    rating: 4.3,
    totalResenas: 156
  },
  {
    id: "sehuencas",
    nombre: "Lagunas de Sehuencas",
    descripcion: "Lagunas de altura con paisajes espectaculares y trekking.",
    descripcionLarga: "Las Lagunas de Sehuencas son un conjunto de lagunas glaciares ubicadas en la cordillera del Tunari. Ofrecen paisajes de alta montaña espectaculares y son ideales para trekking y contemplación de la naturaleza andina.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    categoria: "naturaleza",
    ubicacion: "Cordillera del Tunari",
    coordenadas: { lat: -17.2000, lng: -66.3000 },
    horarios: "Acceso libre",
    precioEntrada: "Gratuito",
    consejos: [
      "Aclimatarse antes del trekking",
      "Llevar ropa abrigada",
      "No dejar basura",
      "Ir en grupo por seguridad"
    ],
    tours: [
      { nombre: "Trekking Completo", duracion: "8 horas", precio: "Bs. 200" }
    ],
    comidasTipicas: ["Trucha", "Sopa de quinua"],
    rating: 4.7,
    totalResenas: 234
  }
]

// RESTAURANTES
export const restaurantes: Restaurante[] = [
  // Baratos
  {
    id: "el-silpancho",
    nombre: "El Silpancho de Oro",
    tipo: "barato",
    especialidad: "Silpancho tradicional",
    imagen: "",
    direccion: "Calle Jordán #234, Centro",
    coordenadas: { lat: -17.3940, lng: -66.1565 },
    precioPromedio: "Bs. 25-35",
    horarios: "11:00 - 15:00, 18:00 - 21:00",
    rating: 4.5,
    telefono: "+591 4 4256789"
  },
  {
    id: "dona-peta",
    nombre: "Doña Peta",
    tipo: "barato",
    especialidad: "Comida típica boliviana",
    imagen: "",
    direccion: "Mercado La Cancha, Puesto 45",
    coordenadas: { lat: -17.3955, lng: -66.1560 },
    precioPromedio: "Bs. 15-25",
    horarios: "7:00 - 16:00",
    rating: 4.3,
    telefono: "+591 7 1234567"
  },
  {
    id: "api-buena",
    nombre: "Api de la Buena",
    tipo: "barato",
    especialidad: "Api y pasteles",
    imagen: "",
    direccion: "Av. Heroínas #567",
    coordenadas: { lat: -17.3925, lng: -66.1580 },
    precioPromedio: "Bs. 10-20",
    horarios: "6:00 - 12:00",
    rating: 4.6,
    telefono: "+591 4 4267890"
  },
  // Normales
  {
    id: "la-cantonata",
    nombre: "La Cantonata",
    tipo: "normal",
    especialidad: "Cocina fusión boliviana",
    imagen: "",
    direccion: "Av. América #1234",
    coordenadas: { lat: -17.3800, lng: -66.1600 },
    precioPromedio: "Bs. 50-80",
    horarios: "12:00 - 22:00",
    rating: 4.7,
    telefono: "+591 4 4289012"
  },
  {
    id: "casa-campo",
    nombre: "Casa de Campo",
    tipo: "normal",
    especialidad: "Parrilladas y chicharrón",
    imagen: "",
    direccion: "Zona Cala Cala, Calle 21",
    coordenadas: { lat: -17.3750, lng: -66.1700 },
    precioPromedio: "Bs. 60-90",
    horarios: "11:00 - 23:00",
    rating: 4.5,
    telefono: "+591 4 4290123"
  },
  {
    id: "el-patio",
    nombre: "El Patio",
    tipo: "normal",
    especialidad: "Comida criolla",
    imagen: "",
    direccion: "Calle España #890",
    coordenadas: { lat: -17.3880, lng: -66.1520 },
    precioPromedio: "Bs. 45-70",
    horarios: "12:00 - 21:00",
    rating: 4.4,
    telefono: "+591 4 4301234"
  },
  // Caros
  {
    id: "paprika",
    nombre: "Paprika Gourmet",
    tipo: "caro",
    especialidad: "Alta cocina boliviana",
    imagen: "",
    direccion: "Av. Ballivián #567, Cala Cala",
    coordenadas: { lat: -17.3720, lng: -66.1750 },
    precioPromedio: "Bs. 150-250",
    horarios: "12:00 - 15:00, 19:00 - 23:00",
    rating: 4.9,
    telefono: "+591 4 4312345"
  },
  {
    id: "suiza",
    nombre: "La Suiza",
    tipo: "caro",
    especialidad: "Cocina internacional",
    imagen: "",
    direccion: "Av. Pando #234",
    coordenadas: { lat: -17.3780, lng: -66.1680 },
    precioPromedio: "Bs. 120-200",
    horarios: "18:00 - 24:00",
    rating: 4.8,
    telefono: "+591 4 4323456"
  },
  {
    id: "los-castores",
    nombre: "Los Castores",
    tipo: "caro",
    especialidad: "Carnes premium y vinos",
    imagen: "",
    direccion: "Zona Recoleta, Calle 15",
    coordenadas: { lat: -17.3850, lng: -66.1450 },
    precioPromedio: "Bs. 180-300",
    horarios: "12:00 - 23:00",
    rating: 4.7,
    telefono: "+591 4 4334567"
  }
]

// ALOJAMIENTOS
export const alojamientos: Alojamiento[] = [
  // Económicos
  {
    id: "hostal-jordan",
    nombre: "Hostal Jordán",
    tipo: "economico",
    imagen: "",
    direccion: "Calle Jordán #123",
    coordenadas: { lat: -17.3935, lng: -66.1570 },
    precioNoche: "Bs. 80-120",
    servicios: ["WiFi", "Desayuno incluido", "Agua caliente"],
    rating: 4.2,
    telefono: "+591 4 4256001"
  },
  {
    id: "backpacker-cbba",
    nombre: "Backpacker Cochabamba",
    tipo: "economico",
    imagen: "",
    direccion: "Calle España #456",
    coordenadas: { lat: -17.3900, lng: -66.1540 },
    precioNoche: "Bs. 50-80",
    servicios: ["WiFi", "Cocina compartida", "Lockers"],
    rating: 4.0,
    telefono: "+591 4 4267002"
  },
  {
    id: "residencial-familiar",
    nombre: "Residencial Familiar",
    tipo: "economico",
    imagen: "",
    direccion: "Av. Ayacucho #789",
    coordenadas: { lat: -17.3920, lng: -66.1590 },
    precioNoche: "Bs. 60-100",
    servicios: ["WiFi", "TV Cable", "Estacionamiento"],
    rating: 4.1,
    telefono: "+591 4 4278003"
  },
  // Estándar
  {
    id: "hotel-boston",
    nombre: "Hotel Boston",
    tipo: "estandar",
    imagen: "",
    direccion: "Av. Ballivián #1234",
    coordenadas: { lat: -17.3800, lng: -66.1650 },
    precioNoche: "Bs. 250-350",
    servicios: ["WiFi", "Desayuno buffet", "Gimnasio", "Restaurant"],
    rating: 4.5,
    telefono: "+591 4 4289004"
  },
  {
    id: "apart-hotel-suites",
    nombre: "Apart Hotel Suites",
    tipo: "estandar",
    imagen: "",
    direccion: "Zona Cala Cala, Av. América",
    coordenadas: { lat: -17.3750, lng: -66.1700 },
    precioNoche: "Bs. 300-400",
    servicios: ["WiFi", "Cocina equipada", "Lavandería", "Terraza"],
    rating: 4.6,
    telefono: "+591 4 4290005"
  },
  {
    id: "hotel-diplomat",
    nombre: "Hotel Diplomat",
    tipo: "estandar",
    imagen: "",
    direccion: "Calle Baptista #567",
    coordenadas: { lat: -17.3870, lng: -66.1530 },
    precioNoche: "Bs. 280-380",
    servicios: ["WiFi", "Business center", "Restaurant", "Room service"],
    rating: 4.4,
    telefono: "+591 4 4301006"
  },
  // Premium
  {
    id: "hotel-regina",
    nombre: "Gran Hotel Regina",
    tipo: "premium",
    imagen: "",
    direccion: "Av. Heroínas #890, Centro",
    coordenadas: { lat: -17.3910, lng: -66.1560 },
    precioNoche: "Bs. 600-900",
    servicios: ["WiFi premium", "Spa", "Piscina", "Restaurant gourmet", "Concierge"],
    rating: 4.8,
    telefono: "+591 4 4312007"
  },
  {
    id: "casa-grande",
    nombre: "Casa Grande Boutique Hotel",
    tipo: "premium",
    imagen: "",
    direccion: "Zona Recoleta, Calle Las Palmas",
    coordenadas: { lat: -17.3830, lng: -66.1480 },
    precioNoche: "Bs. 700-1000",
    servicios: ["WiFi", "Jardines", "Restaurant", "Eventos", "Transporte aeropuerto"],
    rating: 4.9,
    telefono: "+591 4 4323008"
  },
  {
    id: "cochabamba-marriott",
    nombre: "Cochabamba Marriott",
    tipo: "premium",
    imagen: "",
    direccion: "Av. Ballivián #1500",
    coordenadas: { lat: -17.3780, lng: -66.1720 },
    precioNoche: "Bs. 800-1200",
    servicios: ["WiFi", "Gimnasio 24h", "Spa", "Piscina climatizada", "Club lounge"],
    rating: 4.9,
    telefono: "+591 4 4334009"
  }
]

// EVENTOS
export const eventos: Evento[] = [
  {
    id: "carnaval",
    nombre: "Carnaval de Cochabamba",
    descripcion: "El carnaval más alegre de Bolivia con corso de comparsas y música.",
    descripcionLarga: "El Carnaval de Cochabamba es una de las festividades más importantes del departamento, caracterizado por el colorido corso de comparsas, las tradicionales coplas cochabambinas, los juegos con agua y las reuniones familiares. Durante varios días, la ciudad se llena de música, baile y alegría.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "Febrero - Marzo",
    fechaInicio: "2025-02-28",
    fechaFin: "2025-03-04",
    ubicacion: "Toda la ciudad de Cochabamba",
    coordenadas: { lat: -17.3936, lng: -66.1570 },
    consejos: [
      "Llevar ropa que se pueda mojar",
      "Proteger equipos electrónicos del agua",
      "Reservar alojamiento con anticipación",
      "Disfrutar de las coplas tradicionales"
    ],
    destacado: true
  },
  {
    id: "urkupina",
    nombre: "Fiesta de la Virgen de Urkupiña",
    descripcion: "La festividad religiosa más grande de Bolivia con entrada folklórica.",
    descripcionLarga: "La Fiesta de la Virgen de Urkupiña en Quillacollo es la celebración religiosa más importante de Bolivia, atrayendo a millones de devotos y visitantes. La entrada folklórica reúne a más de 50,000 danzarines de todo el país en una demostración única de fe y cultura boliviana.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "14-15 de Agosto",
    fechaInicio: "2025-08-14",
    fechaFin: "2025-08-15",
    ubicacion: "Quillacollo, Cochabamba",
    coordenadas: { lat: -17.3950, lng: -66.2783 },
    consejos: [
      "Llegar muy temprano para ver la entrada",
      "Respetar las tradiciones religiosas",
      "Llevar efectivo para compras",
      "Usar calzado cómodo para caminar"
    ],
    destacado: true
  },
  {
    id: "festival-chicha",
    nombre: "Festival de la Chicha",
    descripcion: "Celebración de la bebida ancestral con música y gastronomía.",
    descripcionLarga: "El Festival de la Chicha celebra la bebida tradicional más importante de Cochabamba. Durante el evento se puede degustar diferentes variedades de chicha, disfrutar de comida típica y participar en actividades culturales que resaltan la importancia de esta bebida en la identidad cochabambina.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "Septiembre",
    fechaInicio: "2025-09-20",
    fechaFin: "2025-09-21",
    ubicacion: "Tarata, Cochabamba",
    coordenadas: { lat: -17.6167, lng: -66.0167 },
    consejos: [
      "Probar diferentes tipos de chicha",
      "Ir con conductor designado",
      "Disfrutar la música tradicional",
      "Comprar chicha para llevar"
    ],
    destacado: false
  },
  {
    id: "feria-alasitas",
    nombre: "Feria de Alasitas",
    descripcion: "Feria de miniaturas y tradición del Ekeko para la prosperidad.",
    descripcionLarga: "La Feria de Alasitas es una tradición andina donde se compran miniaturas de los deseos que se quieren cumplir durante el año. El Ekeko, dios de la abundancia, es el protagonista de esta festividad que combina tradición, artesanía y fe popular.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "24 de Enero",
    fechaInicio: "2025-01-24",
    fechaFin: "2025-02-24",
    ubicacion: "Plaza de las Banderas, Cochabamba",
    coordenadas: { lat: -17.3900, lng: -66.1600 },
    consejos: [
      "Comprar miniaturas a las 12 del mediodía",
      "Hacer bendecir las miniaturas",
      "Regatear con los vendedores",
      "Buscar artesanos locales"
    ],
    destacado: false
  },
  {
    id: "festival-internacional-cultura",
    nombre: "Festival Internacional de la Cultura",
    descripcion: "Encuentro de artistas internacionales con música, teatro y danza.",
    descripcionLarga: "El Festival Internacional de la Cultura de Cochabamba reúne a artistas de todo el mundo en una celebración de las artes escénicas. Durante una semana, la ciudad se convierte en escenario de conciertos, obras de teatro, exposiciones y talleres culturales.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "Abril",
    fechaInicio: "2025-04-15",
    fechaFin: "2025-04-22",
    ubicacion: "Diversos escenarios en Cochabamba",
    coordenadas: { lat: -17.3936, lng: -66.1570 },
    consejos: [
      "Revisar la programación con anticipación",
      "Comprar entradas para eventos populares",
      "Participar en los talleres gratuitos",
      "Aprovechar las actividades al aire libre"
    ],
    destacado: false
  },
  {
    id: "todos-santos",
    nombre: "Todos Santos",
    descripcion: "Celebración de los difuntos con altares, tantawawas y tradiciones.",
    descripcionLarga: "Todos Santos es una de las celebraciones más importantes del calendario andino, donde se honra a los difuntos con altares decorados, ofrendas de comida tradicional como las tantawawas (panes con forma humana) y visitas a los cementerios.",
    imagen: "",
    imagenes: [
      "",
      "",
      ""
    ],
    fecha: "1-2 de Noviembre",
    fechaInicio: "2025-11-01",
    fechaFin: "2025-11-02",
    ubicacion: "Toda la ciudad de Cochabamba",
    coordenadas: { lat: -17.3936, lng: -66.1570 },
    consejos: [
      "Visitar el cementerio general",
      "Probar las tantawawas tradicionales",
      "Respetar las tradiciones familiares",
      "Participar en las rezas comunitarias"
    ],
    destacado: false
  }
]

// GASTRONOMÍA
export const gastronomia: Gastronomia[] = [
  {
    id: "silpancho",
    nombre: "Silpancho",
    descripcion: "Plato emblemático de Cochabamba con carne apanada, arroz, papa y huevo frito.",
    imagen: "",
    ingredientes: ["Carne de res apanada", "Arroz", "Papa cocida", "Huevo frito", "Ensalada de tomate y cebolla"],
    origen: "Cochabamba",
    precioPromedio: "Bs. 25-40"
  },
  {
    id: "pique-macho",
    nombre: "Pique Macho",
    descripcion: "Montaña de carne, salchichas, papas fritas y locoto picante.",
    imagen: "",
    ingredientes: ["Carne de res", "Salchichas", "Papas fritas", "Locoto", "Tomate", "Cebolla", "Huevo duro"],
    origen: "Cochabamba",
    precioPromedio: "Bs. 60-120"
  },
  {
    id: "chicharron",
    nombre: "Chicharrón de Chancho",
    descripcion: "Cerdo frito crujiente servido con mote y llajwa.",
    imagen: "",
    ingredientes: ["Cerdo", "Mote de maíz", "Llajwa", "Papa"],
    origen: "Valle Alto",
    precioPromedio: "Bs. 40-70"
  },
  {
    id: "sopa-mani",
    nombre: "Sopa de Maní",
    descripcion: "Sopa tradicional con base de maní, carne y fideos.",
    imagen: "",
    ingredientes: ["Maní molido", "Carne de res", "Papa", "Fideo", "Orégano"],
    origen: "Cochabamba",
    precioPromedio: "Bs. 20-35"
  },
  {
    id: "saltena",
    nombre: "Salteña",
    descripcion: "Empanada dulce rellena de carne en jugo, el desayuno boliviano.",
    imagen: "",
    ingredientes: ["Masa dulce", "Carne de res o pollo", "Papa", "Arvejas", "Aceitunas", "Jugo especiado"],
    origen: "Bolivia",
    precioPromedio: "Bs. 8-15"
  },
  {
    id: "api",
    nombre: "Api con Pastel",
    descripcion: "Bebida caliente de maíz morado acompañada de pastel frito.",
    imagen: "",
    ingredientes: ["Maíz morado", "Canela", "Clavo de olor", "Azúcar", "Pastel de queso"],
    origen: "Altiplano",
    precioPromedio: "Bs. 10-15"
  },
  {
    id: "chicha",
    nombre: "Chicha de Maíz",
    descripcion: "Bebida fermentada ancestral, símbolo de Cochabamba.",
    imagen: "",
    ingredientes: ["Maíz", "Agua", "Fermentación natural"],
    origen: "Cochabamba",
    precioPromedio: "Bs. 5-10 por vaso"
  },
  {
    id: "llajwa",
    nombre: "Llajwa",
    descripcion: "Salsa picante tradicional de locoto y tomate.",
    imagen: "",
    ingredientes: ["Locoto", "Tomate", "Quirquiña", "Sal"],
    origen: "Bolivia",
    precioPromedio: "Incluida en platos"
  }
]

// RESEÑAS DE EJEMPLO
export const resenasEjemplo: Resena[] = [
  {
    id: "r1",
    usuarioId: "u1",
    usuarioNombre: "María García",
    usuarioFoto: "",
    lugarId: "cristo-concordia",
    rating: 5,
    comentario: "Una experiencia increíble. Las vistas desde arriba son espectaculares. Recomiendo subir en teleférico al atardecer.",
    fecha: "2024-12-15",
    likes: 45
  },
  {
    id: "r2",
    usuarioId: "u2",
    usuarioNombre: "Carlos Mendoza",
    usuarioFoto: "",
    lugarId: "torotoro",
    rating: 5,
    comentario: "Torotoro es mágico. Las huellas de dinosaurios y las cavernas son impresionantes. Hay que ir preparado para caminar bastante.",
    fecha: "2024-11-28",
    likes: 67
  },
  {
    id: "r3",
    usuarioId: "u3",
    usuarioNombre: "Ana Flores",
    usuarioFoto: "",
    restauranteId: "paprika",
    rating: 5,
    comentario: "La mejor experiencia gastronómica en Cochabamba. El silpancho gourmet es una obra de arte.",
    fecha: "2024-12-10",
    likes: 34
  },
  {
    id: "r4",
    usuarioId: "u4",
    usuarioNombre: "Pedro Vargas",
    usuarioFoto: "",
    lugarId: "tunari",
    rating: 4,
    comentario: "Excelente para trekking. La subida es desafiante pero vale la pena. Llevar mucha agua y ropa abrigada.",
    fecha: "2024-12-05",
    likes: 28
  },
  {
    id: "r5",
    usuarioId: "u5",
    usuarioNombre: "Laura Quispe",
    usuarioFoto: "",
    eventoId: "urkupina",
    rating: 5,
    comentario: "La entrada folklórica de Urkupiña es algo que todos deberían ver al menos una vez. La fe y la cultura se unen de manera única.",
    fecha: "2024-08-16",
    likes: 89
  }
]

// Función para obtener lugar por ID
export function getLugarById(id: string): Lugar | undefined {
  const lugar = lugares.find(l => l.id === id)
  return lugar ? LugarBuilder.from(lugar).build() : undefined
}

// Función para obtener evento por ID
export function getEventoById(id: string): Evento | undefined {
  const evento = eventos.find(e => e.id === id)
  return evento ? EventoBuilder.from(evento).build() : undefined
}

// Función para obtener restaurantes por lugar
export function getRestaurantesPorLugar(lugarId: string): Restaurante[] {
  // En una app real, esto sería filtrado por ubicación cercana
  return restaurantes.map(r => RestauranteBuilder.from(r).build())
}

// Función para obtener alojamientos por lugar
export function getAlojamientosPorLugar(lugarId: string): Alojamiento[] {
  // En una app real, esto sería filtrado por ubicación cercana
  return alojamientos.map(a => AlojamientoBuilder.from(a).build())
}

// Función para obtener reseñas por entidad
export function getResenasPorLugar(lugarId: string): Resena[] {
  return resenasEjemplo
    .filter(r => r.lugarId === lugarId)
    .map(r => ResenaBuilder.from(r).build())
}

export function getResenasPorRestaurante(restauranteId: string): Resena[] {
  return resenasEjemplo
    .filter(r => r.restauranteId === restauranteId)
    .map(r => ResenaBuilder.from(r).build())
}

export function getResenasPorEvento(eventoId: string): Resena[] {
  return resenasEjemplo
    .filter(r => r.eventoId === eventoId)
    .map(r => ResenaBuilder.from(r).build())
}

// Top lugares por rating
export function getTopLugares(limit: number = 5): Lugar[] {
  return [...lugares]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(l => LugarBuilder.from(l).build())
}

// Top 10 mejor valorados (lugares + restaurantes)
export function getTop10MejorValorados(): (Lugar | Restaurante)[] {
  const todos = [
    ...lugares.map(l => ({ ...LugarBuilder.from(l).build(), tipo: 'lugar' as const })),
    ...restaurantes.map(r => ({ ...RestauranteBuilder.from(r).build(), tipo: 'restaurante' as const })),
  ]
  return todos.sort((a, b) => b.rating - a.rating).slice(0, 10)
}
