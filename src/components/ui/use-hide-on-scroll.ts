import { useEffect, useState } from 'react';

/**
 * useHideOnScroll Hook - Mobile Header Auto-Hide
 * 
 * Implements Material Design 3 mobile header behavior with PYMSTR two-speed transitions:
 * - Scrolling DOWN: Header slides up quickly (300ms - efficient hiding)
 * - Scrolling UP: Header slides down gently (500ms - smooth reveal)
 * 
 * This creates an intuitive mobile UX where:
 * - Users get maximum content space while reading/scrolling down
 * - Users can access navigation by scrolling up with a gentle, luxurious animation
 * 
 * @param threshold - Minimum scroll distance (px) to trigger hide/show (default: 10)
 * @returns { isVisible, transitionClass } - Visibility state and appropriate transition class
 * 
 * Usage:
 * ```tsx
 * const { isVisible, transitionClass } = useHideOnScroll();
 * 
 * <header 
 *   className={`sticky top-0 z-40 ${transitionClass} ${
 *     isVisible ? 'translate-y-0' : '-translate-y-full'
 *   } md:!translate-y-0`}
 *   style={{ transition: isVisible ? 'transform 500ms ease-out' : 'transform 300ms ease-out' }}
 * >
 *   Your header content
 * </header>
 * ```
 */
export const useHideOnScroll = (threshold: number = 10) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let ticking = false;
    let prevScrollY = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // At the top of the page, always show header
          if (currentScrollY <= threshold) {
            setIsVisible(true);
            setIsScrollingUp(false);
          } 
          // Scrolling down: hide header (only if scrolled past threshold)
          else if (currentScrollY > prevScrollY && currentScrollY > threshold) {
            setIsVisible(false);
            setIsScrollingUp(false);
          } 
          // Scrolling up: show header with gentle animation
          else if (currentScrollY < prevScrollY) {
            setIsVisible(true);
            setIsScrollingUp(true);
          }

          prevScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    // Set initial scroll position
    prevScrollY = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isVisible, isScrollingUp };
};
