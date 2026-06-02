-- =============================================================
-- SEED DATA - TURISMO COCHABAMBA
-- Borra datos y carga contenido real
-- =============================================================

BEGIN;

TRUNCATE TABLE
  public.resenas,
  public.eventos,
  public.restaurantes,
  public.alojamientos,
  public.gastronomia,
  public.lugares
RESTART IDENTITY CASCADE;

-- =============================================================
-- 1. LUGARES
-- =============================================================
INSERT INTO public.lugares (id, nombre, descripcion, descripcion_larga, categoria, ubicacion, lat, lng, horarios, precio_entrada, consejos, tours, comidas_tipicas, rating, total_resenas, imagen_url, imagenes) VALUES

('cristo-concordia',
 'Cristo de la Concordia',
 'La estatua de Jesús más grande de Sudamérica, ubicada sobre el Cerro San Pedro con vista panorámica de toda la ciudad de Cochabamba.',
 'El Cristo de la Concordia es una colosal estatua de hormigón armado y acero ubicada en la Colina San Pedro, en la zona este de Cochabamba. Construida entre 1987 y 1994, fue diseñada por los arquitectos César y Wálter Terrazas Pardo. Con 33,44 metros de altura sobre un pedestal de 6,24 metros, alcanza una altura total de 39,68 metros, superando al Cristo Redentor de Río de Janeiro. Se eleva 265 metros sobre la ciudad, a 2.840 metros sobre el nivel del mar. Desde sus miradores se puede apreciar un panorama de 360° de Cochabamba, divisando la Laguna Alalay al sur y el municipio de Sacaba al este. En la base existe un pequeño museo con fotos y características de la obra. Una escalinata en espiral de 1.399 peldaños permite ascender al interior de la estatua hasta la altura de los brazos, con pequeñas ventanas para fotografiar la ciudad. El teleférico opera de jueves a domingo de 10:00 a 19:00 (domingos hasta las 15:00).',
 'cultura',
 'Colina San Pedro, zona este, Cochabamba',
 -17.3940, -66.1390,
 'Teleférico: Jueves a domingo 10:00–19:00 (domingos hasta 15:00). Acceso a pie: todos los días.',
 'Teleférico: Bs. 6,50 por trayecto. Ingreso vehicular: Bs. 10 aprox.',
 ARRAY[
   'Llevar agua, la altitud supera los 2.800 m s.n.m.',
   'Los domingos se permite subir las escaleras internas de la estatua hasta los brazos.',
   'Visitar al atardecer para disfrutar de una vista completamente diferente de la ciudad.',
   'En la cima hay kioskos, larga-vistas y servicio de fotografías.'
 ],
 '[]'::jsonb,
 ARRAY['Anticuchos', 'Salteñas', 'Chicharrón de cerdo'],
 4.6, 0, NULL, ARRAY[]::text[]),

('laguna-angostura',
 'Laguna Angostura',
 'Laguna artificial a 17 km de Cochabamba, rodeada de restaurantes de pescado, cabañas y actividades acuáticas.',
 'La Laguna Angostura, cuyo nombre oficial es Represa México, es una laguna artificial ubicada en los municipios de Arbieto y Tolata, en las provincias Esteban Arze y Germán Jordán del departamento de Cochabamba. Se encuentra a 17 km de la ciudad a una altitud de 2.700 m s.n.m. Tiene unas dimensiones máximas de 9,7 km de largo por 2 km de ancho y una superficie de 10,5 km². Fue construida gracias a la cooperación del Gobierno de México y se terminó en 1948, acumulando 50.000.000 de m³ de agua. Originalmente concebida para riego agrícola, hoy es uno de los principales destinos turísticos de Cochabamba. A sus orillas hay varios restaurantes especializados en pescado (trucha a la parrilla y horneada), cabañas para alojamiento y actividades acuáticas como paseos en bote, jet ski, banana, parasailing y pesca deportiva. Los fines de semana es muy concurrida por familias cochabambinas.',
 'naturaleza',
 'Municipios de Arbieto y Tolata, 17 km al sureste de Cochabamba',
 -17.5180, -65.9970,
 'Restaurantes y actividades: fines de semana y feriados. Acceso libre todos los días.',
 'Ingreso libre. Actividades acuáticas y restaurantes con precios variables.',
 ARRAY[
   'Los fines de semana la afluencia es muy alta; llegar temprano para conseguir mesa en los restaurantes.',
   'La especialidad es la trucha a la parrilla y horneada; elegir bien el restaurante.',
   'Llevar cámara para capturar los atardeceres reflejados en el agua.',
   'Se puede llegar en transporte público desde la plaza principal de Cochabamba.'
 ],
 '[]'::jsonb,
 ARRAY['Trucha a la parrilla', 'Trucha horneada', 'Garapiña', 'Carmelitas rellenas de queso'],
 4.2, 0, NULL, ARRAY[]::text[]),

('parque-tunari',
 'Parque Nacional Tunari',
 'Área protegida de 309.091 ha al norte de Cochabamba, con trekking, ciclismo de montaña, flora andina y el Pico Tunari a 5.200 m s.n.m.',
 'El Parque Nacional Tunari fue creado el 30 de marzo de 1962 mediante Decreto Supremo 6045 del gobierno de Víctor Paz Estenssoro, elevado a Ley 253 el 4 de noviembre de 1963. Se ubica al norte y oeste de la ciudad de Cochabamba, abarcando las provincias de Ayopaya, Cercado, Quillacollo, Chapare y Tapacarí. Cubre aproximadamente 309.091 hectáreas (3.090 km²). El Pico Tunari, el punto más alto de la cordillera del mismo nombre, se encuentra a 5.200 m s.n.m. En la ladera sur del área existen bosques de pinos y eucaliptos. El parque está habitado por unas 80.000 personas de comunidades aymara y quechua. Se explotan principalmente tres zonas turísticas: un área recreativa a 10 km de la ciudad con senderos y cascadas; las cabañas de Cruzani a 15 km con técnicas agrícolas ancestrales; y las aguas termales de Liriuni a 20 km. Es ideal para trekking, ciclismo de montaña, ecoturismo y paisajismo.',
 'naturaleza',
 'Norte de Cochabamba, abarca provincias Ayopaya, Cercado, Quillacollo, Chapare y Tapacarí',
 -17.2833, -66.2500,
 'Acceso libre todos los días del año.',
 'Ingreso gratuito.',
 ARRAY[
   'Llevar ropa abrigada; la temperatura baja considerablemente a mayor altitud.',
   'Llevar suficiente agua y snacks para las caminatas largas.',
   'Para ascender al Pico Tunari (5.200 m) se recomienda aclimatación previa.',
   'Llegar temprano para aprovechar los senderos con mejor luz natural.'
 ],
 '[]'::jsonb,
 ARRAY['Api con pastel', 'Huminta'],
 4.4, 0, NULL, ARRAY[]::text[]),

('incallajta',
 'Incallajta',
 'La ciudadela inca más grande del Collasuyo, construida hacia 1470 d.C. por Tupac Yupanqui, a 140 km de Cochabamba en la provincia Carrasco.',
 'Incallajta (del quechua Inka Llaqta: "ciudad del Inca") es uno de los centros arqueológicos más importantes de Bolivia y fue declarado Monumento Nacional en 1967. Se encuentra en el municipio de Pocona, provincia de Carrasco, al suroeste del departamento de Cochabamba, a una altitud de 2.950 m s.n.m., a unos 140 km de la capital cochabambina. Fue construida alrededor de 1470 d.C. por el Inca Tupac Yupanqui y reconstruida por su hijo Huayna Capac. Sirvió como fortaleza militar, centro político, administrativo y ceremonial del Imperio Inca para frenar el avance de los pueblos orientales. Con una superficie de 12 hectáreas, alberga el edificio "Kallanka", la mayor estructura de una sola nave de toda la América precolombina (78 m de largo x 22 m de ancho x 7 m de alto), con 12 puertas y 44 hornacinas. También destacan el Torreón (antiguo calendario astronómico), la Plaza Central y diversas residencias. Está siendo promovida como Patrimonio Cultural de la Humanidad ante la UNESCO.',
 'arqueologia',
 'Municipio de Pocona, Provincia Carrasco, 140 km al este de Cochabamba',
 -17.6833, -65.5667,
 'Martes a domingo: 9:00–18:00.',
 'Guía local: Bs. 50 por grupo de máximo 5 personas.',
 ARRAY[
   'Se recomienda vehículo 4x4; el último tramo de 14 km desde Pocona es ripio.',
   'Dependiendo la época del año puede haber un vado de río; verificar condiciones antes de ir.',
   'Llevar almuerzo y agua suficiente; no hay tiendas en el sitio.',
   'Contratar guía local en Pocona para conocer la historia detallada del complejo.'
 ],
 '[{"nombre": "Excursión desde Cochabamba", "duracion": "día completo", "operador": "El Mundo Verde Travel", "descripcion": "Tour de día completo desde Cochabamba incluyendo transporte, guía y visita al complejo arqueológico."}]'::jsonb,
 ARRAY['Picante de pollo', 'Mote'],
 4.7, 0, NULL, ARRAY[]::text[]),

('incachaca',
 'Incachaca',
 'Paraíso natural a 80 km de Cochabamba con cascadas, puente colgante inca, tirolesa y una de las primeras hidroeléctricas de Bolivia.',
 'Incachaca (del quechua: "puente del inca") es un sitio declarado Patrimonio Cultural y Natural ubicado a 80 km de la ciudad de Cochabamba, en el municipio de Colomi, en la carretera hacia el trópico. Se encuentra en la zona de transición entre los Andes y el trópico, con clima húmedo y cálido que da lugar a una exuberante vegetación con gran variedad de flora y fauna. La ruta principal tiene ocho puntos distribuidos en unos dos kilómetros. Sus atractivos incluyen: la Cascada Velo de la Novia (caída de aguas cristalinas rodeada de vegetación), la Garganta del Diablo (cascada visible desde la Ventana del Diablo), el Puente del Inca (100 m de largo y 35 m de alto), la Casa de Máquinas (primera hidroeléctrica de Bolivia, construida en 1940 por Simón I. Patiño), una laguna artificial rodeada de bosques de pinos y aves rapaces, y un túnel con la Cueva de los Murciélagos. Actividades disponibles: tirolesa, rápel, canotaje, paseo a caballo, kayak y camping.',
 'aventura',
 'Municipio de Colomi, carretera Cochabamba-Santa Cruz, 80 km de Cochabamba',
 -17.2900, -65.8500,
 'Acceso libre. Actividades con operadores locales disponibles fines de semana y feriados.',
 'Ingreso libre. Actividades de aventura con costo según operador.',
 ARRAY[
   'Usar calzado de trekking; los senderos son angostos, pedregosos y con maleza.',
   'El trekking completo dura aproximadamente 6 horas (nivel intermedio).',
   'Llevar impermeable; la zona tiene clima húmedo y puede llover en cualquier momento.',
   'La Casa de Máquinas de 1940 es un atractivo histórico único; no perdérsela.'
 ],
 '[{"nombre": "Trekking Incachaca 1 día", "duracion": "10 horas", "nivel": "Intermedio", "descripcion": "Recorrido completo desde 3400 m hasta 2000 m incluyendo transporte privado y guía cultural desde Cochabamba."}]'::jsonb,
 ARRAY['Trucha frita', 'Chicharrón'],
 4.5, 0, NULL, ARRAY[]::text[]),

('palacio-portales',
 'Palacio Portales',
 'Joya arquitectónica ecléctica construida entre 1915 y 1927 por el magnate del estaño Simón I. Patiño, con jardines inspirados en Versalles.',
 'El Palacio Portales, actualmente sede del Centro Pedagógico y Cultural Simón I. Patiño, se ubica en la zona de Queru Queru al norte de Cochabamba, en la Avenida Potosí esquina Portales. Fue mandado a construir por el magnate boliviano Simón Iturri Patiño, apodado "el Barón del Estaño", uno de los hombres más ricos del mundo a principios del siglo XX. Diseñado por el arquitecto francés Eugène Bliault, fue edificado entre 1915 y 1927 empleando materiales importados de Europa, principalmente mármoles y maderas finas. Es un bello ejemplo del eclecticismo arquitectónico que fusiona elementos renacentistas, barrocos y neoclásicos. El interior presenta escaleras de mármol, techos pintados a mano, espejos dorados y candelabros de cristal. Sus jardines fueron diseñados por expertos japoneses a imitación de los del Palacio de Versalles. Curiosamente, la familia Patiño nunca llegó a habitarlo. Las visitas guiadas están abiertas al público e incluyen el recorrido por los salones y los jardines históricos.',
 'cultura',
 'Zona Queru Queru, Avenida Potosí esquina Portales, Cochabamba',
 -17.3780, -66.1620,
 'Martes a viernes: 15:00–18:30. Sábados y domingos: 10:00–12:00.',
 'Extranjeros: Bs. 20. Nacionales: Bs. 15. Estudiantes: precio reducido.',
 ARRAY[
   'Las visitas son guiadas; respetar los horarios de cada tour (cada 30 minutos).',
   'No usar flash al fotografiar el interior para preservar los materiales originales.',
   'Conocer la historia de Simón I. Patiño antes de visitar enriquece mucho la experiencia.',
   'Los jardines de inspiración versallesca merecen al menos 30 minutos adicionales de recorrido.'
 ],
 '[{"nombre": "Visita guiada en español", "dias": "Martes a viernes", "horarios": "15:30, 16:30, 17:30"}, {"nombre": "Visita guiada en inglés", "dias": "Martes a viernes", "horarios": "16:00, 17:00, 18:00"}]'::jsonb,
 ARRAY['Chicharrón de cerdo', 'Salteñas'],
 4.5, 0, NULL, ARRAY[]::text[]),

('din-kong-shinahota',
 'Din Kong Resort Park',
 'Parque temático en Shinahota con esculturas gigantes de King Kong, Godzilla y más de 30 dinosaurios, laguna artificial, piscinas y actividades de aventura.',
 'Din Kong Resort Park fue inaugurado el 6 de agosto de 2022 por el Sindicato "8 de Marzo" del municipio de Shinahota, como el parque temático más grande de Bolivia. Se ubica en el Sindicato Agrigento B del Distrito VI Central Agropalmar, Shinahota, a la altura del kilómetro 163 de la carretera Cochabamba–Santa Cruz, en el Trópico de Cochabamba. Sus principales atracciones son un gorila gigante de 9 metros (King Kong), un dinosaurio de 7 metros y más de 30 esculturas de dinosaurios en tamaño real (incluyendo Godzilla y Vastatosaurus Rex), creadas por el escultor boliviano Juan García Guzmán junto a estudiantes de Artes Plásticas de Cochabamba. Además del atractivo escultórico, el parque cuenta con: laguna y playa artificiales, piscinas para niños y adultos, puentes colgantes (rompe miedo y de equilibrio), bicicleta aérea, kayak, pesca deportiva, motonáutica, cisne a pedal, equitación, tours en cuadratrack, parque infantil, cancha de fútbol, acuario, plazuela y áreas de camping.',
 'aventura',
 'Km 163 carretera Cochabamba–Santa Cruz, Shinahota, Trópico de Cochabamba',
 -16.6833, -65.1500,
 'Miércoles a domingo: 9:00–17:00.',
 'Consultar precios de actividades al ingreso. WhatsApp: 73999995.',
 ARRAY[
   'Ubicado a aprox. 163 km de Cochabamba; planificar el viaje con anticipación.',
   'Llevar traje de baño para las piscinas y actividades acuáticas.',
   'Ideal para familias con niños; las esculturas gigantes son el atractivo principal.',
   'Para más información y reservas contactar al WhatsApp: 73999995.'
 ],
 '[]'::jsonb,
 ARRAY['Majadito', 'Locro', 'Masaco'],
 4.3, 0, NULL, ARRAY[]::text[]);


-- =============================================================
-- 2. EVENTOS
-- =============================================================
INSERT INTO public.eventos (id, nombre, descripcion, descripcion_larga, fecha, fecha_inicio, fecha_fin, ubicacion, lat, lng, consejos, destacado, imagen_url, imagenes) VALUES

('peregrinacion-cristo-concordia',
 'Peregrinación al Cristo de la Concordia',
 'Peregrinación anual de fieles al Cristo de la Concordia, celebrada en noviembre en fecha movible.',
 'Cada año en el mes de noviembre, en fecha movible según el calendario litúrgico, se realiza la peregrinación al Cristo de la Concordia. Miles de fieles y turistas ascienden a pie por las escalinatas o en teleférico para participar en actos religiosos en la base de la estatua. Es una de las celebraciones religiosas más importantes de Cochabamba y reúne a visitantes de todo el departamento y el país.',
 'Noviembre (fecha movible anual)',
 NULL,
 NULL,
 'Colina San Pedro, Cochabamba',
 -17.3940, -66.1390,
 ARRAY['Llegar temprano; la afluencia es muy alta durante la peregrinación.', 'Usar ropa cómoda y calzado adecuado para el ascenso a pie.'],
 true, NULL, ARRAY[]::text[]),

('carnaval-cochabamba',
 'Carnaval de Cochabamba',
 'Celebración del Carnaval con entradas folklóricas, comparsas y Takipayanakus, en febrero o marzo según fecha movible.',
 'El Carnaval de Cochabamba se celebra en febrero o marzo (fecha movible). Incluye las tradicionales entradas folklóricas, comparsas y los Takipayanakus, eventos donde grupos musicales compiten con coplas y canciones en quechua y español. Es una de las festividades más coloridas y concurridas del año en la ciudad.',
 'Febrero o marzo (fecha movible)',
 NULL,
 NULL,
 'Centro de Cochabamba',
 -17.3936, -66.1569,
 ARRAY['Reservar alojamiento con anticipación; la ciudad recibe gran afluencia de turistas.', 'Usar ropa que pueda mojarse; el juego con agua es parte de la tradición.'],
 true, NULL, ARRAY[]::text[]),

('aniversario-cochabamba',
 'Aniversario de la Revolución Cochabambina',
 'Conmemoración del 14 de septiembre de 1810, con actos cívicos, desfiles y eventos culturales en toda la ciudad.',
 'El 14 de septiembre se conmemora el aniversario de la Revolución Cochabambina de 1810. Se realizan actos cívicos oficiales, desfiles escolares y militares, y diversos eventos culturales en plazas y teatros de la ciudad. Es feriado departamental y uno de los días más importantes del calendario cochabambino.',
 '14 de septiembre (anual)',
 NULL,
 NULL,
 'Plaza 14 de Septiembre y centro de Cochabamba',
 -17.3936, -66.1569,
 ARRAY['El centro de la ciudad presenta restricciones de tráfico durante los desfiles.'],
 false, NULL, ARRAY[]::text[]);


-- =============================================================
-- 3. RESTAURANTES
-- =============================================================
INSERT INTO public.restaurantes (id, nombre, tipo, especialidad, direccion, lat, lng, precio_promedio, horarios, rating, telefono, imagen_url) VALUES

('restaurant-la-estancia',
 'La Estancia',
 'normal',
 'Parrilladas y cocina boliviana tradicional',
 'Av. Ballivián, Cochabamba',
 -17.3920, -66.1580,
 'Bs. 60–120 por persona',
 'Lunes a domingo: 12:00–22:00',
 4.2, '', NULL),

('restaurant-casa-campo',
 'Casa de Campo',
 'caro',
 'Cocina boliviana e internacional, especialidad en chicharrón y picantes',
 'Zona del Prado, Cochabamba',
 -17.3900, -66.1600,
 'Bs. 80–150 por persona',
 'Lunes a domingo: 11:00–22:00',
 4.4, '', NULL),

('picanteria-los-nogales',
 'Picantería Los Nogales',
 'barato',
 'Picantes tradicionales cochabambinos: picante de pollo, chicharrón, fritanga',
 'Zona sur de Cochabamba',
 -17.4100, -66.1600,
 'Bs. 25–50 por persona',
 'Martes a domingo: 10:00–15:00',
 4.3, '', NULL);


-- =============================================================
-- 4. ALOJAMIENTOS
-- =============================================================
INSERT INTO public.alojamientos (id, nombre, tipo, direccion, lat, lng, precio_noche, servicios, rating, telefono, imagen_url) VALUES

('hotel-diplomat',
 'Hotel Diplomat',
 'premium',
 'Av. Pando, Zona Recoleta, Cochabamba',
 -17.3780, -66.1700,
 'Desde $us 60 por noche',
 ARRAY['WiFi', 'Restaurante', 'Estacionamiento', 'Recepción 24h', 'Caja fuerte'],
 4.1, '', NULL),

('hotel-portales',
 'Portales Hotel',
 'estandar',
 'Av. Pando 1271, Zona Recoleta, Cochabamba',
 -17.3790, -66.1690,
 'Desde $us 35 por noche',
 ARRAY['WiFi', 'Restaurante', 'Sauna', 'Traslado aeropuerto', 'Recepción 24h'],
 4.0, '', NULL),

('hostal-el-porteno',
 'Hostal El Porteño',
 'economico',
 'Centro de Cochabamba',
 -17.3936, -66.1569,
 'Desde $us 15 por noche',
 ARRAY['WiFi', 'Agua caliente', 'Recepción'],
 3.8, '', NULL);


-- =============================================================
-- 5. GASTRONOMIA
-- =============================================================
INSERT INTO public.gastronomia (id, nombre, descripcion, ingredientes, origen, precio_promedio, imagen_url) VALUES

('chicharron-cerdo',
 'Chicharrón de Cerdo',
 'Costillas y carne de cerdo fritas en su propia grasa, servidas con mote, llajwa y ensalada. Considerado el plato más emblemático de Cochabamba.',
 ARRAY['Costillas de cerdo', 'Mote de maíz', 'Llajwa (salsa picante de tomate y locoto)', 'Cebolla', 'Sal'],
 'Cochabamba, Bolivia',
 'Bs. 35–60',
 NULL),

('picante-pollo',
 'Picante de Pollo',
 'Guiso de pollo en salsa picante de ají amarillo, acompañado de papa, chuño, arroz y ensalada. Plato infaltable de las picanterías cochabambinas.',
 ARRAY['Pollo', 'Ají amarillo', 'Papa', 'Chuño', 'Arroz', 'Cebolla', 'Comino', 'Ajo'],
 'Cochabamba, Bolivia',
 'Bs. 25–45',
 NULL),

('silpancho',
 'Silpancho',
 'Filete de carne de res apanado y frito, servido sobre arroz y papa picada, coronado con huevo frito, tomate y cebolla. Uno de los platos más populares de Cochabamba.',
 ARRAY['Carne de res', 'Pan molido', 'Huevo', 'Arroz', 'Papa', 'Tomate', 'Cebolla', 'Aceite'],
 'Cochabamba, Bolivia',
 'Bs. 20–40',
 NULL),

('salteña-cbba',
 'Salteña cochabambina',
 'Empanada horneada de masa dulce rellena de caldo jugoso con pollo o carne, papa, arveja y aceitunas. La versión cochabambina es especialmente jugosa.',
 ARRAY['Harina', 'Manteca', 'Azúcar', 'Pollo o carne de res', 'Papa', 'Arveja', 'Aceitunas', 'Huevo duro', 'Ají', 'Caldo gelatinizado'],
 'Cochabamba, Bolivia',
 'Bs. 5–10',
 NULL),

('api-pastel',
 'Api con Pastel',
 'Bebida caliente a base de maíz morado o blanco, canela y clavo de olor, acompañada de pastel frito de harina. Típica del desayuno y merienda cochabambina.',
 ARRAY['Maíz morado o blanco molido', 'Canela', 'Clavo de olor', 'Azúcar', 'Harina (para el pastel)', 'Aceite'],
 'Cochabamba, Bolivia',
 'Bs. 8–15',
 NULL),

('pique-macho',
 'Pique a lo Macho',
 'Plato abundante de carne de res y salchichas fritas, papas fritas, tomate, cebolla y locoto. Plato de origen cochabambino muy popular en todo el país.',
 ARRAY['Carne de res', 'Salchicha', 'Papa frita', 'Tomate', 'Cebolla', 'Locoto', 'Huevo duro'],
 'Cochabamba, Bolivia',
 'Bs. 30–55',
 NULL),

('sopa-mani',
 'Sopa de Maní',
 'Sopa espesa a base de maní molido, fideos, carne y papa. Tradicional de la gastronomía boliviana y muy popular en Cochabamba.',
 ARRAY['Maní tostado molido', 'Carne de res', 'Papa', 'Fideos', 'Cebolla', 'Ajo', 'Perejil'],
 'Bolivia',
 'Bs. 15–30',
 NULL),

('huminta',
 'Huminta',
 'Tamal de maíz fresco molido, mezclado con queso y envuelto en chala de maíz, cocido al vapor o asado. Muy consumido en Cochabamba especialmente en fiestas y ferias.',
 ARRAY['Maíz fresco', 'Queso', 'Manteca', 'Sal o azúcar', 'Chala de maíz (hoja)'],
 'Andes bolivianos',
 'Bs. 5–10',
 NULL);


-- =============================================================
-- 6. RESEÑAS
-- =============================================================
INSERT INTO public.resenas (id, usuario_id, usuario_nombre, usuario_foto_url, lugar_id, restaurante_id, evento_id, rating, comentario, fecha, likes) VALUES

('r001', 'u001', 'Carlos Mendoza', NULL, 'cristo-concordia', NULL, NULL, 5,
 'Una experiencia increíble. La vista desde la cima es de 360 grados y se puede ver toda la ciudad. El teleférico vale cada centavo. Fui un domingo y pude subir las escaleras internas hasta los brazos de la estatua.',
 '2024-11-15', 24),

('r002', 'u002', 'María Fernanda Quiroga', NULL, 'cristo-concordia', NULL, NULL, 4,
 'Muy bonito lugar, especialmente al atardecer. El único inconveniente es que el teleférico solo funciona jueves a domingo. Si vas entre semana tienes que subir a pie o en vehículo. Los kioskos de arriba tienen buenos precios.',
 '2024-10-22', 17),

('r003', 'u003', 'Pablo Rodríguez', NULL, 'laguna-angostura', NULL, NULL, 4,
 'Excelente para pasar el domingo en familia. La trucha a la parrilla estaba deliciosa. Fuimos en bote y la pasamos genial. El lugar es muy tranquilo entre semana pero los fines de semana se llena mucho.',
 '2024-09-08', 12),

('r004', 'u004', 'Lucía Vargas', NULL, 'laguna-angostura', NULL, NULL, 3,
 'Lindo lugar pero hay que saber elegir el restaurante. Algunos tienen mejor calidad que otros. El paisaje es bonito aunque el agua no es azul como uno imagina, es bastante café por la tierra. Igual vale la pena.',
 '2024-08-30', 8),

('r005', 'u005', 'Andrés Torrico', NULL, 'parque-tunari', NULL, NULL, 5,
 'El Parque Nacional Tunari es un tesoro natural a minutos de la ciudad. Los senderos son bien marcados y la flora es hermosa. Si tienes condición física puedes intentar el ascenso al Pico Tunari a 5.200 msnm. Recomendado para todos los amantes del trekking.',
 '2024-07-20', 31),

('r006', 'u006', 'Sofía Quispe', NULL, 'parque-tunari', NULL, NULL, 4,
 'Fuimos con familia a la zona recreativa que está a 10 km de la ciudad. Hay senderos lindos y cascadas. El ingreso es gratuito. Llevar agua y ropa abrigada porque en las partes altas hace frío.',
 '2024-06-14', 15),

('r007', 'u007', 'Roberto Flores', NULL, 'incallajta', NULL, NULL, 5,
 'Impresionante. La Kallanka es enorme, cuesta creer que los incas construyeron eso sin maquinaria moderna. Contratamos guía local en Pocona y la experiencia fue mucho más rica. El camino desde Pocona es de ripio, conviene ir en 4x4.',
 '2024-05-03', 42),

('r008', 'u008', 'Valentina Cruz', NULL, 'incallajta', NULL, NULL, 5,
 'Hicimos el tour con El Mundo Verde Travel desde Cochabamba. Todo el día bien organizado. Pasamos por Laguna Angostura y luego llegamos a Incallajta. Las ruinas son majestuosas. Una joya arqueológica que pocos bolivianos conocen.',
 '2024-04-18', 38),

('r009', 'u009', 'Diego Mamani', NULL, 'incallajta', NULL, NULL, 4,
 'Lugar histórico increíble pero el acceso es complicado. El vado del río estaba lleno cuando fui en época de lluvias y tuvimos que dejar el auto y caminar 2 km. A pesar de eso valió cada paso.',
 '2024-03-10', 19),

('r010', 'u010', 'Gabriela Heredia', NULL, 'incachaca', NULL, NULL, 5,
 'La cascada Velo de la Novia es espectacular. El sonido del agua es impresionante. La ruta es de nivel intermedio pero con calzado adecuado no hay problema. La Casa de Máquinas de 1940 es un hallazgo histórico fascinante.',
 '2024-11-28', 27),

('r011', 'u011', 'Javier Soliz', NULL, 'incachaca', NULL, NULL, 4,
 'Muy buen lugar para aventura. Hicimos tirolesa y rápel, una experiencia única. El paisaje es de selva andina, muy verde y húmedo. Llevar ropa impermeable. El trekking completo toma unas 6 horas.',
 '2024-10-05', 21),

('r012', 'u012', 'Camila Orellana', NULL, 'palacio-portales', NULL, NULL, 5,
 'Una obra de arte arquitectónica en plena Cochabamba. La visita guiada es excelente, la guía explicó toda la historia de Simón Patiño y los detalles del palacio. Los jardines al estilo Versalles son preciosos. No entiendo por qué la familia nunca vivió aquí.',
 '2024-09-21', 33),

('r013', 'u013', 'Nicolás Terán', NULL, 'palacio-portales', NULL, NULL, 4,
 'Muy bien conservado. Los salones con candelabros y pisos de mármol son impresionantes. La visita guiada incluye el recorrido por los jardines. El precio de entrada es muy accesible para lo que ofrece.',
 '2024-08-12', 16),

('r014', 'u014', 'Ana María Pedraza', NULL, 'palacio-portales', NULL, NULL, 5,
 'Fui con mi clase del colegio y fue una experiencia maravillosa. El guía habló en inglés y en español. Los techos pintados a mano son increíbles. Definitivamente uno de los lugares más elegantes de Bolivia.',
 '2024-07-07', 22),

('r015', 'u015', 'Fernando Gutiérrez', NULL, 'din-kong-shinahota', NULL, NULL, 5,
 'Con mis hijos fue una experiencia inolvidable. El King Kong de 9 metros es impresionante. Los dinosaurios están muy bien hechos. También hay piscina, kayak y pesca. Ideal para pasar todo el día. El viaje desde Cochabamba vale la pena.',
 '2024-10-14', 29),

('r016', 'u016', 'Patricia Lima', NULL, 'din-kong-shinahota', NULL, NULL, 4,
 'Un parque muy original para Bolivia. Las esculturas son de muy buena calidad. Hay muchas actividades para niños y adultos. Lo único es que queda lejos, a 163 km de Cochabamba, pero la ruta es buena.',
 '2024-09-03', 18),

('r017', 'u017', 'Marco Soria', NULL, 'cristo-concordia', NULL, NULL, 4,
 'Vista panorámica espectacular de Cochabamba. Fui en vehículo propio, el camino empedrado hasta la cima está en buen estado. La entrada es económica. Hay comercios pequeños en la cima. Lo recomiendo a cualquier visitante.',
 '2024-12-01', 14),

('r018', 'u018', 'Elena Baptista', NULL, 'laguna-angostura', NULL, NULL, 4,
 'Pasamos un domingo muy agradable. Almorzamos trucha horneada que estaba riquísima. Los paseos en bote son tranquilos y económicos. El paisaje andino alrededor de la laguna es muy bonito, especialmente al atardecer.',
 '2024-11-10', 11),

('r019', 'u019', 'Hernán Villanueva', NULL, 'incachaca', NULL, NULL, 5,
 'Uno de los lugares más hermosos que he visitado en Bolivia. La Garganta del Diablo vista desde la Ventana del Diablo es alucinante. El Puente del Inca de 100 metros de largo es imponente. Pienso volver para hacer el circuito completo con más calma.',
 '2024-08-25', 35),

('r020', 'u020', 'Daniela Chávez', NULL, 'din-kong-shinahota', NULL, NULL, 4,
 'Muy entretenido para toda la familia. Los dinosaurios en tamaño real sorprenden mucho. La playa artificial y la laguna son un plus. Llevar efectivo ya que no todos los servicios tienen POS. Abierto miércoles a domingo de 9 a 17.',
 '2024-07-19', 20);

COMMIT;
-- =============================================================
-- RESET + SEED DATA - TURISMO COCHABAMBA
-- Ejecutar en Supabase SQL Editor.
-- =============================================================

BEGIN;

-- Borrar datos existentes (orden seguro por dependencias)
TRUNCATE TABLE
  public.resenas,
  public.eventos,
  public.restaurantes,
  public.alojamientos,
  public.gastronomia,
  public.lugares
RESTART IDENTITY CASCADE;

-- =============================================================
-- 1. LUGARES
-- =============================================================
INSERT INTO public.lugares (id, nombre, descripcion, descripcion_larga, categoria, ubicacion, lat, lng, horarios, precio_entrada, consejos, tours, comidas_tipicas, rating, total_resenas, imagen_url, imagenes) VALUES

('cristo-concordia',
 'Cristo de la Concordia',
 'La estatua de Jesús más grande de Sudamérica, ubicada sobre el Cerro San Pedro con vista panorámica de toda la ciudad de Cochabamba.',
 'El Cristo de la Concordia es una colosal estatua de hormigón armado y acero ubicada en la Colina San Pedro, en la zona este de Cochabamba. Construida entre 1987 y 1994, fue diseñada por los arquitectos César y Wálter Terrazas Pardo. Con 33,44 metros de altura sobre un pedestal de 6,24 metros, alcanza una altura total de 39,68 metros, superando al Cristo Redentor de Río de Janeiro. Se eleva 265 metros sobre la ciudad, a 2.840 metros sobre el nivel del mar. Desde sus miradores se puede apreciar un panorama de 360° de Cochabamba, divisando la Laguna Alalay al sur y el municipio de Sacaba al este. En la base existe un pequeño museo con fotos y características de la obra. Una escalinata en espiral de 1.399 peldaños permite ascender al interior de la estatua hasta la altura de los brazos, con pequeñas ventanas para fotografiar la ciudad. El teleférico opera de jueves a domingo de 10:00 a 19:00 (domingos hasta las 15:00).',
 'cultura',
 'Colina San Pedro, zona este, Cochabamba',
 -17.3940, -66.1390,
 'Teleférico: Jueves a domingo 10:00–19:00 (domingos hasta 15:00). Acceso a pie: todos los días.',
 'Teleférico: Bs. 6,50 por trayecto. Ingreso vehicular: Bs. 10 aprox.',
 ARRAY[
   'Llevar agua, la altitud supera los 2.800 m s.n.m.',
   'Los domingos se permite subir las escaleras internas de la estatua hasta los brazos.',
   'Visitar al atardecer para disfrutar de una vista completamente diferente de la ciudad.',
   'En la cima hay kioskos, larga-vistas y servicio de fotografías.'
 ],
 '[]'::jsonb,
 ARRAY['Anticuchos', 'Salteñas', 'Chicharrón de cerdo'],
 4.6, 0, NULL, ARRAY[]::text[]),

('laguna-angostura',
 'Laguna Angostura',
 'Laguna artificial a 17 km de Cochabamba, rodeada de restaurantes de pescado, cabañas y actividades acuáticas.',
 'La Laguna Angostura, cuyo nombre oficial es Represa México, es una laguna artificial ubicada en los municipios de Arbieto y Tolata, en las provincias Esteban Arze y Germán Jordán del departamento de Cochabamba. Se encuentra a 17 km de la ciudad a una altitud de 2.700 m s.n.m. Tiene unas dimensiones máximas de 9,7 km de largo por 2 km de ancho y una superficie de 10,5 km². Fue construida gracias a la cooperación del Gobierno de México y se terminó en 1948, acumulando 50.000.000 de m³ de agua. Originalmente concebida para riego agrícola, hoy es uno de los principales destinos turísticos de Cochabamba. A sus orillas hay varios restaurantes especializados en pescado (trucha a la parrilla y horneada), cabañas para alojamiento y actividades acuáticas como paseos en bote, jet ski, banana, parasailing y pesca deportiva. Los fines de semana es muy concurrida por familias cochabambinas.',
 'naturaleza',
 'Municipios de Arbieto y Tolata, 17 km al sureste de Cochabamba',
 -17.5180, -65.9970,
 'Restaurantes y actividades: fines de semana y feriados. Acceso libre todos los días.',
 'Ingreso libre. Actividades acuáticas y restaurantes con precios variables.',
 ARRAY[
   'Los fines de semana la afluencia es muy alta; llegar temprano para conseguir mesa en los restaurantes.',
   'La especialidad es la trucha a la parrilla y horneada; elegir bien el restaurante.',
   'Llevar cámara para capturar los atardeceres reflejados en el agua.',
   'Se puede llegar en transporte público desde la plaza principal de Cochabamba.'
 ],
 '[]'::jsonb,
 ARRAY['Trucha a la parrilla', 'Trucha horneada', 'Garapiña', 'Carmelitas rellenas de queso'],
 4.2, 0, NULL, ARRAY[]::text[]),

('parque-tunari',
 'Parque Nacional Tunari',
 'Área protegida de 309.091 ha al norte de Cochabamba, con trekking, ciclismo de montaña, flora andina y el Pico Tunari a 5.200 m s.n.m.',
 'El Parque Nacional Tunari fue creado el 30 de marzo de 1962 mediante Decreto Supremo 6045 del gobierno de Víctor Paz Estenssoro, elevado a Ley 253 el 4 de noviembre de 1963. Se ubica al norte y oeste de la ciudad de Cochabamba, abarcando las provincias de Ayopaya, Cercado, Quillacollo, Chapare y Tapacarí. Cubre aproximadamente 309.091 hectáreas (3.090 km²). El Pico Tunari, el punto más alto de la cordillera del mismo nombre, se encuentra a 5.200 m s.n.m. En la ladera sur del área existen bosques de pinos y eucaliptos. El parque está habitado por unas 80.000 personas de comunidades aymara y quechua. Se explotan principalmente tres zonas turísticas: un área recreativa a 10 km de la ciudad con senderos y cascadas; las cabañas de Cruzani a 15 km con técnicas agrícolas ancestrales; y las aguas termales de Liriuni a 20 km. Es ideal para trekking, ciclismo de montaña, ecoturismo y paisajismo.',
 'naturaleza',
 'Norte de Cochabamba, abarca provincias Ayopaya, Cercado, Quillacollo, Chapare y Tapacarí',
 -17.2833, -66.2500,
 'Acceso libre todos los días del año.',
 'Ingreso gratuito.',
 ARRAY[
   'Llevar ropa abrigada; la temperatura baja considerablemente a mayor altitud.',
   'Llevar suficiente agua y snacks para las caminatas largas.',
   'Para ascender al Pico Tunari (5.200 m) se recomienda aclimatación previa.',
   'Llegar temprano para aprovechar los senderos con mejor luz natural.'
 ],
 '[]'::jsonb,
 ARRAY['Api con pastel', 'Huminta'],
 4.4, 0, NULL, ARRAY[]::text[]),

('incallajta',
 'Incallajta',
 'La ciudadela inca más grande del Collasuyo, construida hacia 1470 d.C. por Tupac Yupanqui, a 140 km de Cochabamba en la provincia Carrasco.',
 'Incallajta (del quechua Inka Llaqta: "ciudad del Inca") es uno de los centros arqueológicos más importantes de Bolivia y fue declarado Monumento Nacional en 1967. Se encuentra en el municipio de Pocona, provincia de Carrasco, al suroeste del departamento de Cochabamba, a una altitud de 2.950 m s.n.m., a unos 140 km de la capital cochabambina. Fue construida alrededor de 1470 d.C. por el Inca Tupac Yupanqui y reconstruida por su hijo Huayna Capac. Sirvió como fortaleza militar, centro político, administrativo y ceremonial del Imperio Inca para frenar el avance de los pueblos orientales. Con una superficie de 12 hectáreas, alberga el edificio "Kallanka", la mayor estructura de una sola nave de toda la América precolombina (78 m de largo x 22 m de ancho x 7 m de alto), con 12 puertas y 44 hornacinas. También destacan el Torreón (antiguo calendario astronómico), la Plaza Central y diversas residencias. Está siendo promovida como Patrimonio Cultural de la Humanidad ante la UNESCO.',
 'arqueologia',
 'Municipio de Pocona, Provincia Carrasco, 140 km al este de Cochabamba',
 -17.6833, -65.5667,
 'Martes a domingo: 9:00–18:00.',
 'Guía local: Bs. 50 por grupo de máximo 5 personas.',
 ARRAY[
   'Se recomienda vehículo 4x4; el último tramo de 14 km desde Pocona es ripio.',
   'Dependiendo la época del año puede haber un vado de río; verificar condiciones antes de ir.',
   'Llevar almuerzo y agua suficiente; no hay tiendas en el sitio.',
   'Contratar guía local en Pocona para conocer la historia detallada del complejo.'
 ],
 '[{"nombre": "Excursión desde Cochabamba", "duracion": "día completo", "operador": "El Mundo Verde Travel", "descripcion": "Tour de día completo desde Cochabamba incluyendo transporte, guía y visita al complejo arqueológico."}]'::jsonb,
 ARRAY['Picante de pollo', 'Mote'],
 4.7, 0, NULL, ARRAY[]::text[]),

('incachaca',
 'Incachaca',
 'Paraíso natural a 80 km de Cochabamba con cascadas, puente colgante inca, tirolesa y una de las primeras hidroeléctricas de Bolivia.',
 'Incachaca (del quechua: "puente del inca") es un sitio declarado Patrimonio Cultural y Natural ubicado a 80 km de la ciudad de Cochabamba, en el municipio de Colomi, en la carretera hacia el trópico. Se encuentra en la zona de transición entre los Andes y el trópico, con clima húmedo y cálido que da lugar a una exuberante vegetación con gran variedad de flora y fauna. La ruta principal tiene ocho puntos distribuidos en unos dos kilómetros. Sus atractivos incluyen: la Cascada Velo de la Novia (caída de aguas cristalinas rodeada de vegetación), la Garganta del Diablo (cascada visible desde la Ventana del Diablo), el Puente del Inca (100 m de largo y 35 m de alto), la Casa de Máquinas (primera hidroeléctrica de Bolivia, construida en 1940 por Simón I. Patiño), una laguna artificial rodeada de bosques de pinos y aves rapaces, y un túnel con la Cueva de los Murciélagos. Actividades disponibles: tirolesa, rápel, canotaje, paseo a caballo, kayak y camping.',
 'aventura',
 'Municipio de Colomi, carretera Cochabamba-Santa Cruz, 80 km de Cochabamba',
 -17.2900, -65.8500,
 'Acceso libre. Actividades con operadores locales disponibles fines de semana y feriados.',
 'Ingreso libre. Actividades de aventura con costo según operador.',
 ARRAY[
   'Usar calzado de trekking; los senderos son angostos, pedregosos y con maleza.',
   'El trekking completo dura aproximadamente 6 horas (nivel intermedio).',
   'Llevar impermeable; la zona tiene clima húmedo y puede llover en cualquier momento.',
   'La Casa de Máquinas de 1940 es un atractivo histórico único; no perdérsela.'
 ],
 '[{"nombre": "Trekking Incachaca 1 día", "duracion": "10 horas", "nivel": "Intermedio", "descripcion": "Recorrido completo desde 3400 m hasta 2000 m incluyendo transporte privado y guía cultural desde Cochabamba."}]'::jsonb,
 ARRAY['Trucha frita', 'Chicharrón'],
 4.5, 0, NULL, ARRAY[]::text[]),

('palacio-portales',
 'Palacio Portales',
 'Joya arquitectónica ecléctica construida entre 1915 y 1927 por el magnate del estaño Simón I. Patiño, con jardines inspirados en Versalles.',
 'El Palacio Portales, actualmente sede del Centro Pedagógico y Cultural Simón I. Patiño, se ubica en la zona de Queru Queru al norte de Cochabamba, en la Avenida Potosí esquina Portales. Fue mandado a construir por el magnate boliviano Simón Iturri Patiño, apodado "el Barón del Estaño", uno de los hombres más ricos del mundo a principios del siglo XX. Diseñado por el arquitecto francés Eugène Bliault, fue edificado entre 1915 y 1927 empleando materiales importados de Europa, principalmente mármoles y maderas finas. Es un bello ejemplo del eclecticismo arquitectónico que fusiona elementos renacentistas, barrocos y neoclásicos. El interior presenta escaleras de mármol, techos pintados a mano, espejos dorados y candelabros de cristal. Sus jardines fueron diseñados por expertos japoneses a imitación de los del Palacio de Versalles. Curiosamente, la familia Patiño nunca llegó a habitarlo. Las visitas guiadas están abiertas al público e incluyen el recorrido por los salones y los jardines históricos.',
 'cultura',
 'Zona Queru Queru, Avenida Potosí esquina Portales, Cochabamba',
 -17.3780, -66.1620,
 'Martes a viernes: 15:00–18:30. Sábados y domingos: 10:00–12:00.',
 'Extranjeros: Bs. 20. Nacionales: Bs. 15. Estudiantes: precio reducido.',
 ARRAY[
   'Las visitas son guiadas; respetar los horarios de cada tour (cada 30 minutos).',
   'No usar flash al fotografiar el interior para preservar los materiales originales.',
   'Conocer la historia de Simón I. Patiño antes de visitar enriquece mucho la experiencia.',
   'Los jardines de inspiración versallesca merecen al menos 30 minutos adicionales de recorrido.'
 ],
 '[{"nombre": "Visita guiada en español", "dias": "Martes a viernes", "horarios": "15:30, 16:30, 17:30"}, {"nombre": "Visita guiada en inglés", "dias": "Martes a viernes", "horarios": "16:00, 17:00, 18:00"}]'::jsonb,
 ARRAY['Chicharrón de cerdo', 'Salteñas'],
 4.5, 0, NULL, ARRAY[]::text[]),

('din-kong-shinahota',
 'Din Kong Resort Park',
 'Parque temático en Shinahota con esculturas gigantes de King Kong, Godzilla y más de 30 dinosaurios, laguna artificial, piscinas y actividades de aventura.',
 'Din Kong Resort Park fue inaugurado el 6 de agosto de 2022 por el Sindicato "8 de Marzo" del municipio de Shinahota, como el parque temático más grande de Bolivia. Se ubica en el Sindicato Agrigento B del Distrito VI Central Agropalmar, Shinahota, a la altura del kilómetro 163 de la carretera Cochabamba–Santa Cruz, en el Trópico de Cochabamba. Sus principales atracciones son un gorila gigante de 9 metros (King Kong), un dinosaurio de 7 metros y más de 30 esculturas de dinosaurios en tamaño real (incluyendo Godzilla y Vastatosaurus Rex), creadas por el escultor boliviano Juan García Guzmán junto a estudiantes de Artes Plásticas de Cochabamba. Además del atractivo escultórico, el parque cuenta con: laguna y playa artificiales, piscinas para niños y adultos, puentes colgantes (rompe miedo y de equilibrio), bicicleta aérea, kayak, pesca deportiva, motonáutica, cisne a pedal, equitación, tours en cuadratrack, parque infantil, cancha de fútbol, acuario, plazuela y áreas de camping.',
 'aventura',
 'Km 163 carretera Cochabamba–Santa Cruz, Shinahota, Trópico de Cochabamba',
 -16.6833, -65.1500,
 'Miércoles a domingo: 9:00–17:00.',
 'Consultar precios de actividades al ingreso. WhatsApp: 73999995.',
 ARRAY[
   'Ubicado a aprox. 163 km de Cochabamba; planificar el viaje con anticipación.',
   'Llevar traje de baño para las piscinas y actividades acuáticas.',
   'Ideal para familias con niños; las esculturas gigantes son el atractivo principal.',
   'Para más información y reservas contactar al WhatsApp: 73999995.'
 ],
 '[]'::jsonb,
 ARRAY['Majadito', 'Locro', 'Masaco'],
 4.3, 0, NULL, ARRAY[]::text[]);


-- =============================================================
-- 2. EVENTOS
-- =============================================================
INSERT INTO public.eventos (id, nombre, descripcion, descripcion_larga, fecha, fecha_inicio, fecha_fin, ubicacion, lat, lng, consejos, destacado, imagen_url, imagenes) VALUES

('peregrinacion-cristo-concordia',
 'Peregrinación al Cristo de la Concordia',
 'Peregrinación anual de fieles al Cristo de la Concordia, celebrada en noviembre en fecha movible.',
 'Cada año en el mes de noviembre, en fecha movible según el calendario litúrgico, se realiza la peregrinación al Cristo de la Concordia. Miles de fieles y turistas ascienden a pie por las escalinatas o en teleférico para participar en actos religiosos en la base de la estatua. Es una de las celebraciones religiosas más importantes de Cochabamba y reúne a visitantes de todo el departamento y el país.',
 'Noviembre (fecha movible anual)',
 NULL,
 NULL,
 'Colina San Pedro, Cochabamba',
 -17.3940, -66.1390,
 ARRAY['Llegar temprano; la afluencia es muy alta durante la peregrinación.', 'Usar ropa cómoda y calzado adecuado para el ascenso a pie.'],
 true, NULL, ARRAY[]::text[]),

('carnaval-cochabamba',
 'Carnaval de Cochabamba',
 'Celebración del Carnaval con entradas folklóricas, comparsas y Takipayanakus, en febrero o marzo según fecha movible.',
 'El Carnaval de Cochabamba se celebra en febrero o marzo (fecha movible). Incluye las tradicionales entradas folklóricas, comparsas y los Takipayanakus, eventos donde grupos musicales compiten con coplas y canciones en quechua y español. Es una de las festividades más coloridas y concurridas del año en la ciudad.',
 'Febrero o marzo (fecha movible)',
 NULL,
 NULL,
 'Centro de Cochabamba',
 -17.3936, -66.1569,
 ARRAY['Reservar alojamiento con anticipación; la ciudad recibe gran afluencia de turistas.', 'Usar ropa que pueda mojarse; el juego con agua es parte de la tradición.'],
 true, NULL, ARRAY[]::text[]),

('aniversario-cochabamba',
 'Aniversario de la Revolución Cochabambina',
 'Conmemoración del 14 de septiembre de 1810, con actos cívicos, desfiles y eventos culturales en toda la ciudad.',
 'El 14 de septiembre se conmemora el aniversario de la Revolución Cochabambina de 1810. Se realizan actos cívicos oficiales, desfiles escolares y militares, y diversos eventos culturales en plazas y teatros de la ciudad. Es feriado departamental y uno de los días más importantes del calendario cochabambino.',
 '14 de septiembre (anual)',
 NULL,
 NULL,
 'Plaza 14 de Septiembre y centro de Cochabamba',
 -17.3936, -66.1569,
 ARRAY['El centro de la ciudad presenta restricciones de tráfico durante los desfiles.'],
 false, NULL, ARRAY[]::text[]);


-- =============================================================
-- 3. RESTAURANTES
-- =============================================================
INSERT INTO public.restaurantes (id, nombre, tipo, especialidad, direccion, lat, lng, precio_promedio, horarios, rating, telefono, imagen_url) VALUES

('restaurant-la-estancia',
 'La Estancia',
 'normal',
 'Parrilladas y cocina boliviana tradicional',
 'Av. Ballivián, Cochabamba',
 -17.3920, -66.1580,
 'Bs. 60–120 por persona',
 'Lunes a domingo: 12:00–22:00',
 4.2, '', NULL),

('restaurant-casa-campo',
 'Casa de Campo',
 'caro',
 'Cocina boliviana e internacional, especialidad en chicharrón y picantes',
 'Zona del Prado, Cochabamba',
 -17.3900, -66.1600,
 'Bs. 80–150 por persona',
 'Lunes a domingo: 11:00–22:00',
 4.4, '', NULL),

('picanteria-los-nogales',
 'Picantería Los Nogales',
 'barato',
 'Picantes tradicionales cochabambinos: picante de pollo, chicharrón, fritanga',
 'Zona sur de Cochabamba',
 -17.4100, -66.1600,
 'Bs. 25–50 por persona',
 'Martes a domingo: 10:00–15:00',
 4.3, '', NULL);


-- =============================================================
-- 4. ALOJAMIENTOS
-- =============================================================
INSERT INTO public.alojamientos (id, nombre, tipo, direccion, lat, lng, precio_noche, servicios, rating, telefono, imagen_url) VALUES

('hotel-diplomat',
 'Hotel Diplomat',
 'premium',
 'Av. Pando, Zona Recoleta, Cochabamba',
 -17.3780, -66.1700,
 'Desde $us 60 por noche',
 ARRAY['WiFi', 'Restaurante', 'Estacionamiento', 'Recepción 24h', 'Caja fuerte'],
 4.1, '', NULL),

('hotel-portales',
 'Portales Hotel',
 'estandar',
 'Av. Pando 1271, Zona Recoleta, Cochabamba',
 -17.3790, -66.1690,
 'Desde $us 35 por noche',
 ARRAY['WiFi', 'Restaurante', 'Sauna', 'Traslado aeropuerto', 'Recepción 24h'],
 4.0, '', NULL),

('hostal-el-porteno',
 'Hostal El Porteño',
 'economico',
 'Centro de Cochabamba',
 -17.3936, -66.1569,
 'Desde $us 15 por noche',
 ARRAY['WiFi', 'Agua caliente', 'Recepción'],
 3.8, '', NULL);


-- =============================================================
-- 5. GASTRONOMIA
-- =============================================================
INSERT INTO public.gastronomia (id, nombre, descripcion, ingredientes, origen, precio_promedio, imagen_url) VALUES

('chicharron-cerdo',
 'Chicharrón de Cerdo',
 'Costillas y carne de cerdo fritas en su propia grasa, servidas con mote, llajwa y ensalada. Considerado el plato más emblemático de Cochabamba.',
 ARRAY['Costillas de cerdo', 'Mote de maíz', 'Llajwa (salsa picante de tomate y locoto)', 'Cebolla', 'Sal'],
 'Cochabamba, Bolivia',
 'Bs. 35–60',
 NULL),

('picante-pollo',
 'Picante de Pollo',
 'Guiso de pollo en salsa picante de ají amarillo, acompañado de papa, chuño, arroz y ensalada. Plato infaltable de las picanterías cochabambinas.',
 ARRAY['Pollo', 'Ají amarillo', 'Papa', 'Chuño', 'Arroz', 'Cebolla', 'Comino', 'Ajo'],
 'Cochabamba, Bolivia',
 'Bs. 25–45',
 NULL),

('silpancho',
 'Silpancho',
 'Filete de carne de res apanado y frito, servido sobre arroz y papa picada, coronado con huevo frito, tomate y cebolla. Uno de los platos más populares de Cochabamba.',
 ARRAY['Carne de res', 'Pan molido', 'Huevo', 'Arroz', 'Papa', 'Tomate', 'Cebolla', 'Aceite'],
 'Cochabamba, Bolivia',
 'Bs. 20–40',
 NULL),

('salteña-cbba',
 'Salteña cochabambina',
 'Empanada horneada de masa dulce rellena de caldo jugoso con pollo o carne, papa, arveja y aceitunas. La versión cochabambina es especialmente jugosa.',
 ARRAY['Harina', 'Manteca', 'Azúcar', 'Pollo o carne de res', 'Papa', 'Arveja', 'Aceitunas', 'Huevo duro', 'Ají', 'Caldo gelatinizado'],
 'Cochabamba, Bolivia',
 'Bs. 5–10',
 NULL),

('api-pastel',
 'Api con Pastel',
 'Bebida caliente a base de maíz morado o blanco, canela y clavo de olor, acompañada de pastel frito de harina. Típica del desayuno y merienda cochabambina.',
 ARRAY['Maíz morado o blanco molido', 'Canela', 'Clavo de olor', 'Azúcar', 'Harina (para el pastel)', 'Aceite'],
 'Andes bolivianos',
 'Bs. 8–15',
 NULL),

('pique-macho',
 'Pique a lo Macho',
 'Plato abundante de carne de res y salchichas fritas, papas fritas, tomate, cebolla y locoto. Plato de origen cochabambino muy popular en todo el país.',
 ARRAY['Carne de res', 'Salchicha', 'Papa frita', 'Tomate', 'Cebolla', 'Locoto', 'Huevo duro'],
 'Cochabamba, Bolivia',
 'Bs. 30–55',
 NULL),

('sopa-mani',
 'Sopa de Maní',
 'Sopa espesa a base de maní molido, fideos, carne y papa. Tradicional de la gastronomía boliviana y muy popular en Cochabamba.',
 ARRAY['Maní tostado molido', 'Carne de res', 'Papa', 'Fideos', 'Cebolla', 'Ajo', 'Perejil'],
 'Bolivia',
 'Bs. 15–30',
 NULL),

('huminta',
 'Huminta',
 'Tamal de maíz fresco molido, mezclado con queso y envuelto en chala de maíz, cocido al vapor o asado. Muy consumido en Cochabamba especialmente en fiestas y ferias.',
 ARRAY['Maíz fresco', 'Queso', 'Manteca', 'Sal o azúcar', 'Chala de maíz (hoja)'],
 'Andes bolivianos',
 'Bs. 5–10',
 NULL);


-- =============================================================
-- 6. RESEÑAS
-- =============================================================
INSERT INTO public.resenas (id, usuario_id, usuario_nombre, usuario_foto_url, lugar_id, restaurante_id, evento_id, rating, comentario, fecha, likes) VALUES

('r001', 'u001', 'Carlos Mendoza', NULL, 'cristo-concordia', NULL, NULL, 5,
 'Una experiencia increíble. La vista desde la cima es de 360 grados y se puede ver toda la ciudad. El teleférico vale cada centavo. Fui un domingo y pude subir las escaleras internas hasta los brazos de la estatua.',
 '2024-11-15', 24),

('r002', 'u002', 'María Fernanda Quiroga', NULL, 'cristo-concordia', NULL, NULL, 4,
 'Muy bonito lugar, especialmente al atardecer. El único inconveniente es que el teleférico solo funciona jueves a domingo. Si vas entre semana tienes que subir a pie o en vehículo. Los kioskos de arriba tienen buenos precios.',
 '2024-10-22', 17),

('r003', 'u003', 'Pablo Rodríguez', NULL, 'laguna-angostura', NULL, NULL, 4,
 'Excelente para pasar el domingo en familia. La trucha a la parrilla estaba deliciosa. Fuimos en bote y la pasamos genial. El lugar es muy tranquilo entre semana pero los fines de semana se llena mucho.',
 '2024-09-08', 12),

('r004', 'u004', 'Lucía Vargas', NULL, 'laguna-angostura', NULL, NULL, 3,
 'Lindo lugar pero hay que saber elegir el restaurante. Algunos tienen mejor calidad que otros. El paisaje es bonito aunque el agua no es azul como uno imagina, es bastante café por la tierra. Igual vale la pena.',
 '2024-08-30', 8),

('r005', 'u005', 'Andrés Torrico', NULL, 'parque-tunari', NULL, NULL, 5,
 'El Parque Nacional Tunari es un tesoro natural a minutos de la ciudad. Los senderos son bien marcados y la flora es hermosa. Si tienes condición física puedes intentar el ascenso al Pico Tunari a 5.200 msnm. Recomendado para todos los amantes del trekking.',
 '2024-07-20', 31),

('r006', 'u006', 'Sofía Quispe', NULL, 'parque-tunari', NULL, NULL, 4,
 'Fuimos con familia a la zona recreativa que está a 10 km de la ciudad. Hay senderos lindos y cascadas. El ingreso es gratuito. Llevar agua y ropa abrigada porque en las partes altas hace frío.',
 '2024-06-14', 15),

('r007', 'u007', 'Roberto Flores', NULL, 'incallajta', NULL, NULL, 5,
 'Impresionante. La Kallanka es enorme, cuesta creer que los incas construyeron eso sin maquinaria moderna. Contratamos guía local en Pocona y la experiencia fue mucho más rica. El camino desde Pocona es de ripio, conviene ir en 4x4.',
 '2024-05-03', 42),

('r008', 'u008', 'Valentina Cruz', NULL, 'incallajta', NULL, NULL, 5,
 'Hicimos el tour con El Mundo Verde Travel desde Cochabamba. Todo el día bien organizado. Pasamos por Laguna Angostura y luego llegamos a Incallajta. Las ruinas son majestuosas. Una joya arqueológica que pocos bolivianos conocen.',
 '2024-04-18', 38),

('r009', 'u009', 'Diego Mamani', NULL, 'incallajta', NULL, NULL, 4,
 'Lugar histórico increíble pero el acceso es complicado. El vado del río estaba lleno cuando fui en época de lluvias y tuvimos que dejar el auto y caminar 2 km. A pesar de eso valió cada paso.',
 '2024-03-10', 19),

('r010', 'u010', 'Gabriela Heredia', NULL, 'incachaca', NULL, NULL, 5,
 'La cascada Velo de la Novia es espectacular. El sonido del agua es impresionante. La ruta es de nivel intermedio pero con calzado adecuado no hay problema. La Casa de Máquinas de 1940 es un hallazgo histórico fascinante.',
 '2024-11-28', 27),

('r011', 'u011', 'Javier Soliz', NULL, 'incachaca', NULL, NULL, 4,
 'Muy buen lugar para aventura. Hicimos tirolesa y rápel, una experiencia única. El paisaje es de selva andina, muy verde y húmedo. Llevar ropa impermeable. El trekking completo toma unas 6 horas.',
 '2024-10-05', 21),

('r012', 'u012', 'Camila Orellana', NULL, 'palacio-portales', NULL, NULL, 5,
 'Una obra de arte arquitectónica en plena Cochabamba. La visita guiada es excelente, la guía explicó toda la historia de Simón Patiño y los detalles del palacio. Los jardines al estilo Versalles son preciosos. No entiendo por qué la familia nunca vivió aquí.',
 '2024-09-21', 33),

('r013', 'u013', 'Nicolás Terán', NULL, 'palacio-portales', NULL, NULL, 4,
 'Muy bien conservado. Los salones con candelabros y pisos de mármol son impresionantes. La visita guiada incluye el recorrido por los jardines. El precio de entrada es muy accesible para lo que ofrece.',
 '2024-08-12', 16),

('r014', 'u014', 'Ana María Pedraza', NULL, 'palacio-portales', NULL, NULL, 5,
 'Fui con mi clase del colegio y fue una experiencia maravillosa. El guía habló en inglés y en español. Los techos pintados a mano son increíbles. Definitivamente uno de los lugares más elegantes de Bolivia.',
 '2024-07-07', 22),

('r015', 'u015', 'Fernando Gutiérrez', NULL, 'din-kong-shinahota', NULL, NULL, 5,
 'Con mis hijos fue una experiencia inolvidable. El King Kong de 9 metros es impresionante. Los dinosaurios están muy bien hechos. También hay piscina, kayak y pesca. Ideal para pasar todo el día. El viaje desde Cochabamba vale la pena.',
 '2024-10-14', 29),

('r016', 'u016', 'Patricia Lima', NULL, 'din-kong-shinahota', NULL, NULL, 4,
 'Un parque muy original para Bolivia. Las esculturas son de muy buena calidad. Hay muchas actividades para niños y adultos. Lo único es que queda lejos, a 163 km de Cochabamba, pero la ruta es buena.',
 '2024-09-03', 18),

('r017', 'u017', 'Marco Soria', NULL, 'cristo-concordia', NULL, NULL, 4,
 'Vista panorámica espectacular de Cochabamba. Fui en vehículo propio, el camino empedrado hasta la cima está en buen estado. La entrada es económica. Hay comercios pequeños en la cima. Lo recomiendo a cualquier visitante.',
 '2024-12-01', 14),

('r018', 'u018', 'Elena Baptista', NULL, 'laguna-angostura', NULL, NULL, 4,
 'Pasamos un domingo muy agradable. Almorzamos trucha horneada que estaba riquísima. Los paseos en bote son tranquilos y económicos. El paisaje andino alrededor de la laguna es muy bonito, especialmente al atardecer.',
 '2024-11-10', 11),

('r019', 'u019', 'Hernán Villanueva', NULL, 'incachaca', NULL, NULL, 5,
 'Uno de los lugares más hermosos que he visitado en Bolivia. La Garganta del Diablo vista desde la Ventana del Diablo es alucinante. El Puente del Inca de 100 metros de largo es imponente. Pienso volver para hacer el circuito completo con más calma.',
 '2024-08-25', 35),

('r020', 'u020', 'Daniela Chávez', NULL, 'din-kong-shinahota', NULL, NULL, 4,
 'Muy entretenido para toda la familia. Los dinosaurios en tamaño real sorprenden mucho. La playa artificial y la laguna son un plus. Llevar efectivo ya que no todos los servicios tienen POS. Abierto miércoles a domingo de 9 a 17.',
 '2024-07-19', 20);

COMMIT;
