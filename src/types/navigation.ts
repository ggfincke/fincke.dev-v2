// src/types/navigation.ts
// navigation types for nav links & dropdowns

export interface DropdownItem {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}

export interface NavLink {
  href?: string;
  label: string;
  external?: boolean;
  dropdown?: DropdownItem[];
}
