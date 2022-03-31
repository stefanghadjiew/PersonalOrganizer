import { motion } from 'framer-motion';
import { determinePageVariant } from '../../utils';

const FramerMotionAnimations = ({
    children,
    animationType,
    key = null,
}) => {
    const pageVariants = determinePageVariant(animationType);

    return (
        <motion.div
            key={key}
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
