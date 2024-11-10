export type ButtonType = {
  icon: string;
  label: string;
  onclick?: () => void;
} & { [key: string]: any };
