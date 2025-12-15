import { html } from "../../../../../lib/helper.ts";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type EntryEditData = {
  id: number;
  title: string;
  type: string;
  content: string;
  isPrivate: boolean;
};

export default (entry: EntryEditData) => {
  const entryId = String(entry.id);
  return html`
    <section class="max-w-3xl mx-auto">
      <header class="space-y-2">
        <h1 class="text-lg font-bold text-white">Editing Entry</h1>
      </header>
      <form
        class="space-y-6 my-4 rounded-2xl border border-dark-border p-6"
        action="/cms/entries/edit/${entryId}"
        method="POST"
      >
        <div class="space-y-4">
          <label class="space-y-2">
            <span class="text-xs text-dark-muted">Title</span>
            <input
              type="text"
              name="title"
              value="${escapeHtml(entry.title)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <label class="space-y-2">
            <span class="text-xs text-dark-muted">Type</span>
            <input
              type="text"
              name="type"
              value="${escapeHtml(entry.type)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
        </div>

        <div class="space-y-2">
          <span class="text-xs text-dark-muted">Visibility</span>

          <select
            name="private"
            class="w-full rounded-xl border border-dark-border bg-dark-bg px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >
            <option value="0" ${entry.isPrivate
              ? ""
              : "selected"}>Public</option>
            <option value="1" ${entry.isPrivate
              ? "selected"
              : ""}>Private</option>
          </select>
        </div>

        <div class="space-y-2">
          <span class="text-xs text-dark-muted">Content</span>

          <textarea
            name="content"
            rows="8"
            class="w-full h-80 rounded-2xl border border-dark-border bg-dark-bg px-3 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >${escapeHtml(entry.content)}</textarea>
        </div>

        <div class="flex justify-start">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-green-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
          >
            Save
          </button>
          <a
            href="/cms/entries"
            class="ml-4 inline-flex items-center justify-center rounded-lg bg-dark-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-dark-border/70"
          >
            Cancel
          </a>
        </div>
      </form>
      <p class="text-sm text-dark-muted">
        Entry ID: ${entryId}<br />
      </p>
    </section>
  `;
};
