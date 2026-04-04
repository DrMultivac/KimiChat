"use client";

import { useMemo } from "react";
import { markdownToHtml } from "@/lib/format-text";

interface FormattedTextProps {
  /** Raw markdown text from Claude */
  text: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Renders Claude's markdown responses as clean, styled HTML.
 * Uses a lightweight regex-based converter (no heavy lib dependency).
 */
export function FormattedText({ text, className = "" }: FormattedTextProps) {
  const html = useMemo(() => markdownToHtml(text), [text]);

  return (
    <div
      className={`formatted-text text-sm leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
