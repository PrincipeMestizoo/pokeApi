/**
 * Funciones puras de formateo. Sin dependencias de Angular:
 * fáciles de testear de forma aislada (unit tests puros).
 */

/** La PokéAPI devuelve la altura en decímetros -> se convierte a metros. */
export function formatHeightInMeters(heightDm: number): string {
  return `${(heightDm / 10).toFixed(1)} m`;
}

/** La PokéAPI devuelve el peso en hectogramos -> se convierte a kilogramos. */
export function formatWeightInKg(weightHg: number): string {
  return `${(weightHg / 10).toFixed(1)} kg`;
}

/** Primera letra en mayúscula, resto igual (para nombres/tipos/habilidades). */
export function capitalizeFirst(text: string): string {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Normaliza el término de búsqueda: minúsculas y sin espacios sobrantes. */
export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase();
}

/** Calcula el rango de elementos visibles para el texto de paginación (ej. "1–12 de 1302"). */
export function paginationRangeLabel(offset: number, itemsShown: number, total: number): string {
  if (itemsShown === 0) {
    return `0 de ${total}`;
  }
  return `${offset + 1}–${offset + itemsShown} de ${total}`;
}
