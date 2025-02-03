import { useCallback } from 'react';
import { deflate, inflate } from 'pako';

export function useDataCompression() {
  const compress = useCallback((data: any) => {
    try {
      // Convert data to JSON string
      const jsonString = JSON.stringify(data);
      
      // Convert string to Uint8Array
      const uint8Array = new TextEncoder().encode(jsonString);
      
      // Compress data
      const compressed = deflate(uint8Array);
      
      // Convert to base64 for transmission
      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Compression error:', error);
      return null;
    }
  }, []);

  const decompress = useCallback((compressedData: string) => {
    try {
      // Convert base64 to Uint8Array
      const compressedArray = new Uint8Array(
        atob(compressedData)
          .split('')
          .map(char => char.charCodeAt(0))
      );
      
      // Decompress data
      const decompressed = inflate(compressedArray);
      
      // Convert back to string and parse JSON
      const jsonString = new TextDecoder().decode(decompressed);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decompression error:', error);
      return null;
    }
  }, []);

  return { compress, decompress };
}