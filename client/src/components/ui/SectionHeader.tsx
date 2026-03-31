import { motion } from 'framer-motion';

export const SectionHeader = ({ title }: { title: string; }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: "backInOut" }}
        >
            <div className="flex flex-col gap-4 mt-4">
                <p className="text-4xl font-semibold tracking-tight">{title}</p>
                <p>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
        </motion.div>
    );
};