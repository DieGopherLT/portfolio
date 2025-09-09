'use client';

import { AdaptiveBackground } from '@/components/ui/backgrounds';
import { BackgroundType } from '@/components/ui/backgrounds';

import { ReactNode } from 'react';

interface ClientBackgroundWrapperProps {
  type?: BackgroundType;
  children: ReactNode;
}

export function ClientBackgroundWrapper({ type, children }: ClientBackgroundWrapperProps) {
  return <AdaptiveBackground type={type}>{children}</AdaptiveBackground>;
}
