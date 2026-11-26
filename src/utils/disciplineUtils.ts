// Mapeo directo para asegurar que los slugs coincidan con los archivos JSON
export function getDisciplineSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    "Yoga": "yoga",
    "Terapia Física y Ocupacional para el Adulto Mayor": "terapia-fisica-ocupacional",
    "Terapia Física y Ocupacional": "terapia-fisica-ocupacional",
    "Heels Dance": "heels-dance",
    "Ori Tahiti": "danzas-polinesias",
    "Danzas Polinesias": "danzas-polinesias",
    "Meditación y Atención Plena": "meditacion-atencion-plena",
    "Flexibilidad": "flexibilidad",
    "Floorwork": "floorwork",
    "Chair Dance": "chair-dance",
    "Sonoterapia": "sonoterapia"
  };

  return slugMap[name] || name.toLowerCase().replace(/\s+/g, "-");
} 