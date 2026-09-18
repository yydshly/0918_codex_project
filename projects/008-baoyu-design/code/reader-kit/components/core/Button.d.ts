export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: (event: any) => void;
}
