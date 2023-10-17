import { useEffect } from 'react';

export interface ParallaxConfig {
  /**
   * @default 1
   */
  scale?: number;
}

/**
 *
 * @param selector Select elements to listen for parallaxing
 * @param parallaxConfig Configuration options
 */
export function useParallax(selector: string, { scale = 1 }: ParallaxConfig) {
  useEffect(() => {
    function handleParallax() {
      const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      elements.forEach((element) => {
        element.style.backgroundPositionX = `${window.scrollX * scale}px`;
        element.style.backgroundPositionY = `${window.scrollY * scale}px`;
      });
    }
    handleParallax();
    window.addEventListener('scroll', handleParallax);
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, [scale, selector]);
}
