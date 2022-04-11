import { motion } from 'framer-motion';
import { determinePageVariant } from '../../utils';

const FramerMotionAnimations = ({
    children,
    animationType,
    motionKey,
    motionDivStyle,
    style,
}) => {
    const pageVariants = determinePageVariant(animationType);

    return (
        <motion.div
            key={motionKey}
            style={motionDivStyle}
            initial={pageVariants.initial}
            animate={pageVariants.animate}
            exit={pageVariants.exit}
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
};

export default FramerMotionAnimations;
