"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export type Theme = "light" | "dark" | "system";
export type ThemeToggleVariant = "dropdown" | "tabs";
export type ThemeToggleSize = "sm" | "md" | "lg";

interface ThemeToggleProps {
  variant?: ThemeToggleVariant;
  size?: ThemeToggleSize;
  showLabel?: boolean;
  themes?: Theme[];
  className?: string;
}

const sizeClasses = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

export function Theme({
  variant = "dropdown",
  size = "md",
  showLabel = false,
  themes = ["light", "dark", "system"],
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (variant === "dropdown") {
    const safeTheme: Theme = themes.includes(theme as Theme)
      ? (theme as Theme)
      : "light";
    const Icon = themeIcons[safeTheme];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            className={cn(
              "inline-flex items-center justify-between gap-2 rounded-lg border transition",
              "bg-card text-foreground border-border hover:bg-muted",
              showLabel && "min-w-[80px]",
              sizeClasses[size],
              className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showLabel ? (
              <>
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="font-medium capitalize">{safeTheme}</span>
                </div>
                <ChevronDown size={16} />
              </>
            ) : (
              <Icon size={16} />
            )}
          </motion.button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-[100px]">
          {themes.map((opt) => {
            const OptIcon = themeIcons[opt];
            const selected = theme === opt;
            return (
              <DropdownMenuItem
                key={opt}
                onClick={() => setTheme(opt)}
                className={cn(
                  "flex items-center justify-between gap-2",
                  selected && "bg-primary text-primary-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <OptIcon size={16} />
                  <span className="font-medium capitalize">{opt}</span>
                </div>
                {selected && <Check size={16} />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "tabs") {
    return (
      <Tabs value={theme} onValueChange={setTheme} className={cn(className)}>
        <TabsList className="inline-flex items-center rounded-lg border p-1 bg-muted border-border">
          {themes.map((opt) => {
            const OptIcon = themeIcons[opt];
            const selected = theme === opt;
            return (
              <TabsTrigger
                key={opt}
                value={opt}
                className={cn(
                  "relative inline-flex items-center justify-center rounded-md transition",
                  size === "sm"
                    ? "h-6 px-2 text-xs"
                    : size === "md"
                    ? "h-7 px-3 text-xs"
                    : "h-8 px-4 text-sm",
                  selected && "text-foreground"
                )}
              >
                {selected && (
                  <motion.div
                    layoutId="segmented-bg"
                    className="absolute inset-0 rounded-md bg-background shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-1">
                  <OptIcon size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
                  {showLabel && <span className="capitalize">{opt}</span>}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    );
  }

  return null;
}
