import type { EntryLocale } from "./locale.ts";
import { html } from "../../../lib/helper.ts";

const badgeStyles: Record<string, string> = {
  nerdstuff: "bg-purple-500/20 text-purple-200",
  cheatsheet: "bg-yellow-500/20 text-amber-200",
  default: "bg-emerald-500/20 text-emerald-200",
};

export type EntryType = {
  id: number;
  title: string;
  type: string;
  visibilityLabel: string;
  createdLabel: string;
  modifiedLabel: string;
};

export default (locale: EntryLocale, entries: EntryType[]) =>
  html`
    <section class="space-y-6 mx-auto">
      <header class="space-y-3 text-left">
        <h1 class="text-lg font-bold text-white">Entries</h1>
        <p class="text-dark-muted text-sm max-w-3xl">
          ${locale.description}
        </p>
      </header>

      ${entries.length === 0
        ? `<div class="rounded-2xl border border-dark-border bg-dark-surface/50 p-6 text-center text-dark-muted">
        ${locale.emptyState}
      </div>`
        : `
      <div class="border border-dark-border bg-dark-bg shadow-lg overflow-auto">
        <table class="min-w-full text-sm text-left text-dark-muted">
          <thead class="bg-dark-surface text-xs uppercase tracking-[0.3em] text-dark-muted/80">
            <tr>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Title</th>
              <th class="px-4 py-3">${locale.labels.visibilityTitle}</th>
              <th class="px-4 py-3">${locale.labels.created}</th>
              <th class="px-4 py-3">${locale.labels.modified}</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${
          entries
            .map((entry) => {
              const normalized = (entry.type || "").toLowerCase();
              const tagClasses = badgeStyles[normalized] ?? badgeStyles.default;
              return `
                  <tr class="border-t border-dark-border/70 hover:bg-dark-bg/50">
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center px-2 py-1 text-[0.65rem] rounded-md font-medium ${tagClasses}">
                        ${normalized || "entry"}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-white font-semibold">${entry.title}</td>
                    <td class="px-4 py-4">${entry.visibilityLabel}</td>
                    <td class="px-4 py-4">${entry.createdLabel}</td>
                    <td class="px-4 py-4">${entry.modifiedLabel}</td>
                    <td class="px-4 py-4">
                      <a
                        href="/cms/entries/edit/${entry.id}"
                        class="inline-flex items-center px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] border border-dark-border rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        EDIT
                      </a>
                    </td>
                  </tr>
                `;
            })
            .join("")
        }
          </tbody>
        </table>
      </div>
    `}
    </section>
  `;
