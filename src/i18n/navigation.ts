import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers ligeros alrededor de las APIs de navegación de Next.js
// que consideran la configuración de routing
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
