import '@testing-library/jest-dom/vitest';

// Le routeur Next n'est pas monté sous Vitest : GameBar n'a besoin que de back/push.
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {}, prefetch: () => {} }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// jsdom n'implémente pas le canvas : le décor pixel art (PixelWorld) ne dessine simplement rien sous test.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement['getContext'];
}
