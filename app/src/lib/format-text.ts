/**
 * Lightweight markdown-to-HTML and markdown-stripping utilities.
 *
 * No heavy dependencies -- just targeted regex replacements for the
 * subset of markdown that Claude typically produces.
 */

/**
 * Strip ALL markdown formatting and return plain text suitable for TTS.
 * Removes bold, italic, headings, lists, code fences, links, etc.
 */
export function stripMarkdown(md: string): string {
  let text = md;

  // Remove code fences
  text = text.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  text = text.replace(/`([^`]+)`/g, "$1");
  // Remove images
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");
  // Convert links to just the link text
  text = text.replace(/\[([^\]]+)\]\(.*?\)/g, "$1");
  // Remove headings (## Heading -> Heading)
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Remove bold/italic markers (order matters: bold first, then italic)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "$1");
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/\*(.+?)\*/g, "$1");
  text = text.replace(/___(.+?)___/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");
  text = text.replace(/_(.+?)_/g, "$1");
  // Remove strikethrough
  text = text.replace(/~~(.+?)~~/g, "$1");
  // Convert unordered list items to plain text
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  // Convert ordered list items to plain text
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, "");
  // Remove blockquotes
  text = text.replace(/^\s*>\s?/gm, "");
  // Collapse multiple newlines into max two
  text = text.replace(/\n{3,}/g, "\n\n");
  // Trim
  text = text.trim();

  return text;
}

/**
 * Convert a subset of markdown to sanitised HTML for in-app rendering.
 * Returns an HTML string. The caller is responsible for rendering via
 * dangerouslySetInnerHTML (the output is safe because we only produce
 * structural tags -- no script injection vectors).
 */
export function markdownToHtml(md: string): string {
  let html = escapeHtml(md);

  // Code fences -> <pre><code>
  html = html.replace(
    /```(?:\w+)?\n([\s\S]*?)```/g,
    '<pre style="background:rgba(0,0,0,0.05);border-radius:8px;padding:8px 12px;overflow-x:auto;font-size:0.8em;margin:8px 0"><code>$1</code></pre>'
  );
  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code style="background:rgba(0,0,0,0.06);padding:1px 4px;border-radius:3px;font-size:0.9em">$1</code>'
  );

  // Bold + italic combined
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<s>$1</s>");

  // Headings (## -> <h3>, ### -> <h4>, etc.)
  html = html.replace(
    /^#{4,6}\s+(.+)$/gm,
    '<h4 style="font-size:0.95em;font-weight:600;margin:12px 0 4px">$1</h4>'
  );
  html = html.replace(
    /^###\s+(.+)$/gm,
    '<h4 style="font-size:1em;font-weight:600;margin:12px 0 4px">$1</h4>'
  );
  html = html.replace(
    /^##\s+(.+)$/gm,
    '<h3 style="font-size:1.05em;font-weight:700;margin:14px 0 4px">$1</h3>'
  );
  html = html.replace(
    /^#\s+(.+)$/gm,
    '<h3 style="font-size:1.1em;font-weight:700;margin:14px 0 6px">$1</h3>'
  );

  // Horizontal rules
  html = html.replace(
    /^[-*_]{3,}\s*$/gm,
    '<hr style="border:none;border-top:1px solid rgba(0,0,0,0.1);margin:12px 0"/>'
  );

  // Unordered list blocks: detect consecutive lines starting with - or * or +
  html = html.replace(
    /(?:^[ \t]*[-*+]\s+.+$\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => line.replace(/^\s*[-*+]\s+/, "").trim())
        .filter(Boolean)
        .map((item) => `<li style="margin:2px 0">${item}</li>`)
        .join("");
      return `<ul style="margin:6px 0;padding-left:20px;list-style:disc">${items}</ul>`;
    }
  );

  // Ordered list blocks
  html = html.replace(
    /(?:^[ \t]*\d+\.\s+.+$\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => line.replace(/^\s*\d+\.\s+/, "").trim())
        .filter(Boolean)
        .map((item) => `<li style="margin:2px 0">${item}</li>`)
        .join("");
      return `<ol style="margin:6px 0;padding-left:20px">${items}</ol>`;
    }
  );

  // Blockquotes
  html = html.replace(
    /(?:^&gt;\s?(.+)$\n?)+/gm,
    (match) => {
      const content = match
        .split("\n")
        .map((l) => l.replace(/^&gt;\s?/, ""))
        .join("<br/>");
      return `<blockquote style="border-left:3px solid rgba(91,79,176,0.4);padding-left:12px;margin:8px 0;color:inherit;opacity:0.85">${content}</blockquote>`;
    }
  );

  // Paragraph breaks: double newlines -> </p><p>
  html = html.replace(/\n\n+/g, "</p><p>");
  // Single newlines -> <br/>
  html = html.replace(/\n/g, "<br/>");

  // Wrap in paragraph
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
}

/** Minimal HTML entity escaping (runs before all other transforms). */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
