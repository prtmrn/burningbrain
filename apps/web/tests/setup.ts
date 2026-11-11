import '@testing-library/jest-dom/vitest';

// Le routeur Next n'est pas monté sous Vitest : GameBar n'a besoin que de back/push.
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {}, prefetch: () => {} }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
