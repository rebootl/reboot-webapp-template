import { html } from "../../../../lib/helper.ts";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type NewEntryFormData = {
  title: string;
  type: string;
  content: string;
  isPrivate: boolean;
};

const defaultFormData: NewEntryFormData = {
  title: "",
  type: "",
  content: "",
  isPrivate: false,
};

export default (entry: NewEntryFormData = defaultFormData) =>
  html`
    <section class="max-w-3xl mx-auto space-y-6">
      <form
        class="space-y-6 rounded-xl bg-dark-surface/50 border border-dark-border p-8 pt-6"
        action="/cms/entries/new"
        method="POST"
      >
        <header class="space-y-2">
          <h1 class="text-2xl font-bold text-white">Add Entry</h1>
        </header>
        <div class="space-y-4">
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">Title</span>
            <input
              type="text"
              name="title"
              value="${escapeHtml(entry.title)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">Type</span>
            <input
              type="text"
              name="type"
              value="${escapeHtml(entry.type)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>

          <div class="space-y-2">
            <span class="text-xs text-dark-muted">Visibility</span>
            <select
              name="private"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
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
              class="w-full h-80 rounded-2xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >${escapeHtml(entry.content)}</textarea>
          </div>
        </div>

        <div class="flex justify-start mt-6">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md bg-emerald-400 px-5 py-2 text-xs font-semibold text-black transition hover:bg-emerald-500"
          >
            Create
          </button>
          <a
            href="/cms/entries"
            class="ml-4 inline-flex items-center border border-dark-border rounded-md px-5 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </section>
  `;
