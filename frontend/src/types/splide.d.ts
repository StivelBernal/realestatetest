/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react';

  export interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    rewind?: boolean;
    pagination?: boolean;
    arrows?: boolean;
    cover?: boolean;
    height?: string | number;
    gap?: string | number;
    [key: string]: any;
  }

  export interface SplideProps {
    options?: SplideOptions;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }

  export interface SplideSlideProps {
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}

declare module '@splidejs/react-splide/css' {
  // CSS imports don't export anything
}