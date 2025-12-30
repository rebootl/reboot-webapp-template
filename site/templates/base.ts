import { html } from "../../lib/helper.ts";

export const baseTemplate = (content: string /*, req: Request */) => {
  // const ref = req.path || '';
  // const currentLanguage = req.lang || 'en';

  return html`
    <!DOCTYPE html>
    <html lang="en" class="dark">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>reboot.li - Cem's Personal Website</title>
      	<link rel="stylesheet" href="/static/style.css"></link>
      	<link rel="stylesheet" href="/static/tailwind.css"></link>
      </head>
      <body class="bg-dark-bg text-dark-text min-h-screen flex flex-col">
        <header
          class="border-b border-dark-border bg-dark-bg/50 backdrop-blur-sm sticky top-0 z-50"
        >
          <nav class="max-w-4xl mx-auto px-6 py-4">
            <ul class="flex flex-wrap gap-6 items-center justify-between">
              <li>
                <a
                  href="/"
                  class="text-green-300 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span class="hidden sm:inline">home</span>
                </a>
              </li>
              <li>
                <a
                  href="/nerd-stuff"
                  class="text-green-300 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <span class="hidden sm:inline">nerd stuff</span>
                </a>
              </li>
              <li>
                <a
                  href="/cheat-sheets"
                  class="text-green-300 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="hidden sm:inline">cheat sheets</span>
                </a>
              </li>
              <li>
                <a
                  href="/links"
                  class="text-green-300 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span class="hidden sm:inline">links</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main class="max-w-4xl mx-auto px-6 py-12 flex-1">
          ${content}
        </main>

        <footer class="border-t border-dark-border mt-auto">
          <div class="max-w-4xl mx-auto px-6 py-8">
            <div class="text-center space-y-3">
              <p class="text-dark-muted text-sm">Copyright 2025 Cem Aydin</p>
              <p class="text-sm">
                <a
                  href="/privacy-policy"
                  class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
                >Privacy Policy</a>
              </p>
              <p class="text-dark-muted text-sm">
                Built using <span class="font-mono text-indigo-300"
                >Deno</span>, <span class="font-mono text-indigo-300"
                >sqlite</span> and <span class="font-mono text-indigo-300"
                >tailwindcss.</span>
              </p>
              <p class="text-sm">
                <span class="pride-text">Love is love • Care is care</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  `;
};
