import { ReactNode } from "react";

export interface ComponentMetadata {
  title: string;
  description: string;
  icon: string | ReactNode | null;
  previewComponent: string | null;
  previewProps: Record<string, unknown>;
}

export interface ComponentVariation {
  name: string;
  description: string;
  code: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  title: string;
  description: string;
  icon?: ReactNode;
  codeSample?: string;
  variations?: ComponentVariation[];
  children?: ComponentItem[];
}

