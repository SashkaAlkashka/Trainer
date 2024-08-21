import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps1 extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode;
}