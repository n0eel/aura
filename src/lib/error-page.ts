export function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>aura — temporary error</title>
    <style>
      :root {
        color-scheme: dark;
        --background: #09090b;
        --foreground: #fafafa;
        --muted: rgba(250, 250, 250, 0.65);
        --panel: rgba(255, 255, 255, 0.06);
        --border: rgba(255, 255, 255, 0.12);
        --primary: #f472b6;
        --primary-foreground: #09090b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at top, rgba(244, 114, 182, 0.14), transparent 32%),
          radial-gradient(circle at bottom, rgba(168, 85, 247, 0.14), transparent 35%),
          var(--background);
        color: var(--foreground);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wrap {
        width: min(100%, 560px);
        border: 1px solid var(--border);
        background: var(--panel);
        backdrop-filter: blur(18px);
        border-radius: 18px;
        padding: 32px;
        text-align: center;
      }
      h1 { margin: 0 0 12px; font-size: clamp(2rem, 4vw, 2.8rem); }
      p { margin: 0; line-height: 1.65; color: var(--muted); }
      .actions {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }
      a, button {
        appearance: none;
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 12px 18px;
        font: inherit;
        cursor: pointer;
        text-decoration: none;
        color: var(--foreground);
        background: transparent;
      }
      .primary {
        background: var(--primary);
        color: var(--primary-foreground);
        border-color: transparent;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <h1>aura is waking back up</h1>
      <p>The page hit a temporary server issue. Refresh the page or return home in a moment.</p>
      <div class="actions">
        <button class="primary" onclick="window.location.reload()">Refresh</button>
        <a href="/">Go home</a>
      </div>
    </main>
  </body>
</html>`;
}