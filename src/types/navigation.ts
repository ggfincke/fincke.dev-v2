// Navigation types
export interface DropdownItem
{
  href: string;
  label: string;
  description: string;
  external?: boolean;
}

export interface NavLink
{
  href?: string;
  label: string;
  external?: boolean;
  dropdown?: DropdownItem[];
}
