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
    <header>
      <h1 className="text-3xl font-semibold">{props.title}</h1>
      <span className="text-sm text-muted-foreground">
        {date.toLocaleDateString("en-US", formattedDate)}
      </span>
    </header>
  );
};
