/**
 * Utility function to handle asset paths for different deployment environments
 */

const basePath = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_PATH 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : '';

export function assetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return the path with basePath prepended
  return `${basePath}/${cleanPath}`;
}

// Helper for common asset types
export const assets = {
  image: (path: string) => assetPath(`assets/images/${path}`),
  screenshot: (path: string) => assetPath(`assets/screenshots/${path}`),
  background: (path: string) => assetPath(`assets/backgrounds/${path}`),
  audio: (path: string) => assetPath(`assets/audio/${path}`),
};