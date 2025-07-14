// src/components/ui/sidebar.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

// --- Componenti di base della Sidebar ---

// Sidebar principale
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "flex h-full w-64 flex-col overflow-y-auto bg-gray-900 text-gray-100",
      className
    )}
    {...props}
  />
));
Sidebar.displayName = "Sidebar";

// Header della Sidebar
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

// Contenuto principale della Sidebar (scrolling area)
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 p-4 space-y-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

// Footer della Sidebar
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 mt-auto", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

// --- Componenti per il Menu ---

// Gruppo di elementi del menu
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

// Label del gruppo (es. "Menu Principale", "Area Admin")
const SidebarGroupLabel = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("px-3 text-xs font-semibold uppercase tracking-wider text-gray-400", className)}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Contenuto del gruppo (contiene i SidebarMenuItems)
const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

// Wrapper per il menu (utile se vuoi applicare stili specifici alla lista)
const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

// Elemento singolo del menu (li)
const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

// Bottone del menu (a o button)
const sidebarMenuButtonVariants = cva(
  "flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "text-gray-300 hover:bg-gray-800 hover:text-white",
        active: "bg-gray-700 text-white", // Stile per l'elemento attivo
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(sidebarMenuButtonVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // Rimosso l'esportazione di sidebarMenuButtonVariants
};