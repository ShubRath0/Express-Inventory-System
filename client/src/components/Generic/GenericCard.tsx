import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

interface GenericCardProps {
  className?: string;
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const GenericCard = (props: GenericCardProps) => {
  return (
    <Card className={props.className}>
      <CardHeader>{props.header}</CardHeader>
      <CardBody>{props.body}</CardBody>
      <CardFooter>{props.footer}</CardFooter>
    </Card>
  );
};
