import { motion } from 'framer-motion';

export interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const date = new Date();

  const formattedDate: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.3, ease: "backInOut" }}
    >
      <h1 className="text-3xl font-semibold">{props.title}</h1>
      <span className="text-sm text-muted-foreground">
        {date.toLocaleDateString("en-US", formattedDate)}
      </span>
    </motion.div>
  );
};
