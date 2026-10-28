// Loads pages from the dev server in Chrome (CDP) and reports what rendered.
const base = process.argv[2];
const targets = await (await fetch("http://127.0.0.1:9223/json")).json();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = {};
ws.onmessage = (e) => {
  const d = JSON.parse(e.data);
  if (d.id && pending[d.id]) pending[d.id](d.result);
  if (d.method === "Runtime.exceptionThrown") {
    const x = d.params.exceptionDetails;
    console.log("  EXCEPTION:", x.exception?.description ?? x.text, "@", x.url, x.lineNumber);
  }
  if (d.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(d.params.type)) {
    console.log("  console." + d.params.type + ":", d.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 400));
  }
  if (d.method === "Network.loadingFailed") console.log("  NETFAIL:", d.params.errorText, d.params.requestId);
  if (d.method === "Network.responseReceived" && d.params.response.status >= 400)
    console.log("  HTTP", d.params.response.status, d.params.response.url);
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending[i] = resolve;
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await new Promise((r) => (ws.onopen = r));
await send("Runtime.enable");
await send("Network.enable");
await send("Page.enable");

const probe = `JSON.stringify({
  h1: document.querySelector("h1")?.innerText,
  hud: document.querySelector(".hud-bar")?.innerText,
  cube: !!document.querySelector(".cube-3d"),
  canvas: !!document.querySelector(".cyber-canvas"),
  cards: document.querySelectorAll(".card").length,
  rows: document.querySelectorAll(".row").length,
  eli5: !!document.querySelector(".eli5-card"),
  quiz: !!document.querySelector(".quiz-box"),
})`;

for (const path of ["/", "/arcade", "/about", "/ai-product-manager", "/ai-engineer/python-essentials"]) {
  await send("Page.navigate", { url: base + path });
  await sleep(1500);
  const r = await send("Runtime.evaluate", { expression: probe, returnByValue: true });
  console.log(path, r.result.value, "| url:", (await send("Runtime.evaluate", { expression: "location.href", returnByValue: true })).result.value);
}
ws.close();
process.exit(0);
