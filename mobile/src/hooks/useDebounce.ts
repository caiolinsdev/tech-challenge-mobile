import { useState, useEffect } from 'react';

/**
 * Hook que retorna um valor com debounce
 * Útil para evitar chamadas excessivas à API durante digitação
 * 
 * @param value - Valor a ser "debounced"
 * @param delay - Tempo de espera em milissegundos (default: 500ms)
 * @returns Valor com debounce aplicado
 * 
 * @example
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 * 
 * useEffect(() => {
 *   // Esta chamada só acontece 500ms após o usuário parar de digitar
 *   fetchPosts(debouncedSearch);
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

