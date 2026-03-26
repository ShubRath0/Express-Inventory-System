interface ListItem {
    key: string;
    href: string;
    label: string;
    className: string;
    isExpanded: boolean;
}

export interface ListItemProps {
    key: string;
    href?: string;
    label: string;
    className: string;
    startContent?: React.ReactNode;
    items?: ListItem[];
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

