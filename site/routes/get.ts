import type { Response } from "express";

import { html } from "../../lib/helper.ts";
import { baseTemplate } from "../templates/base.ts";

const mainContent = html`
  <!-- Welcome Section -->
  <article class="relative bg-dark-bg shadow-xl">
    <div
      class="grid grid-cols-1 md:grid-cols-2 md:[grid-template-columns:1fr_12rem] md:items-center gap-8"
    >
      <!-- Main column (text + links) -->
      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-6 text-white">
          Welcome to reboot.li
        </h1>

        <div class="prose prose-invert max-w-none space-y-4">
          <p class="text-dark-text leading-relaxed">
            This is the <span class="font-mono text-indigo-300"
            >1'938'489'483th</span> iteration of my personal website. Why it is
            like this, I don't know. Well, maybe because I use this as a
            playground for experimentation and trying out new stuff.
          </p>

          <p class="text-dark-text leading-relaxed">
            My name is <span class="font-semibold text-white">Cem</span>. I'm a
            web dev, kinda, and sysadmin, maybe?
          </p>

          <!-- Mobile image (shown only on small screens) -->
          <div class="block md:hidden flex justify-center mb-4">
            <img
              src="/static/me-small.jpeg"
              alt="small false color colorized portray photo of myself"
              class="rounded-lg w-48 h-auto"
            >
          </div>

          <p class="text-dark-text leading-relaxed">
            I'm 40+, yikes.<br>
            My pronouns are <span class="italic text-white">he/him</span>.
          </p>
        </div>

        <!-- Social Links -->
        <div class="mt-8">
          <h2 class="text-2xl font-semibold mb-4 text-slate-200">Find me on</h2>
          <ul class="space-y-2 list-disc pl-5 marker:text-slate-400">
            <li>
              <a
                href="#"
                class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
              >
                Twitch
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
              >
                Lichess
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
              >
                Mastodon
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Desktop image column (shown only on md+) -->
      <div class="hidden md:flex md:items-center md:justify-center">
        <img
          src="/static/me-small.jpeg"
          alt="small false color colorized portray photo of myself"
          class="rounded-lg w-48 h-auto"
        >
      </div>
    </div>

    <!-- Full-width divider / meta row that should span across the article regardless of the right image -->
    <div class="mt-8 pt-6 border-t border-dark-border text-sm text-dark-muted">
      <p>Last modified: <time datetime="2025-11-15">2025-11-15 23:50h</time></p>
    </div>
  </article>
`;

export default (_req: unknown, res: Response) => {
  const html = baseTemplate(mainContent);
  res.send(html);
};
