import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { useLocation } from "react-router-dom";

export const GenericBreadCrumbs = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Breadcrumbs>
      <BreadcrumbItem href={pathname} size="md">
        {pathname === "/dashboard" ? "Welcome" : pathname}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};
