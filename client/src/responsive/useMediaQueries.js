import { useMediaQuery } from 'react-responsive';
import { DeviceSizes } from './deviceSizes';

export const useMediaQueries = () => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSizes.mobile });
    const isTablet = useMediaQuery({ maxWidth: DeviceSizes.tablet });
    const isLaptop = useMediaQuery({ maxWidth: DeviceSizes.laptop });
    const isDesktop = useMediaQuery({ maxWidth: DeviceSizes.desktop });

    return { isMobile, isTablet, isLaptop, isDesktop };
};
