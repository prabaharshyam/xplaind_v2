import type { Roadmap } from "../types";
import { minutesOf, topicsOf } from "../content";
import { loadProgressMap } from "../progress";

function pdfAscii(text: string): string {
  return text
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2192/g, "->")
    .replace(/\u2022/g, "*")
    .replace(/\u00D7/g, "x")
    .replace(/\u2265/g, ">=")
    .replace(/\u2264/g, "<=")
    .replace(/\u2248/g, "~")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (!cur) {
      cur = w;
    } else if (cur.length + 1 + w.length <= maxChars) {
      cur += " " + w;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Generates and downloads a valid multi-page A4 PDF physical tracking checklist
 * with zero external runtime dependencies.
 */
export function downloadRoadmapChecklistPdf(roadmap: Roadmap): void {
  const progress = loadProgressMap(roadmap.slug);
  const allTopics = topicsOf(roadmap);
  const doneCount = allTopics.filter((t) => progress[t.id] === "done" || progress[t.id] === "skipped").length;
  const totalMinutes = minutesOf(roadmap);
  const pct = allTopics.length ? Math.round((doneCount / allTopics.length) * 100) : 0;

  const pageWidth = 595.28; // A4 width in pt
  const pageHeight = 841.89; // A4 height in pt
  const marginX = 44;

  const pages: string[][] = [];
  let ops: string[] = [];
  let y = pageHeight - 48;

  const startNewPage = (pageNum: number) => {
    ops = [];
    // Dark header band
    ops.push("0.07 0.08 0.09 rg");
    ops.push(`0 ${pageHeight - 34} ${pageWidth} 34 re f`);
    ops.push("BT /F2 8.5 Tf 0.96 0.96 0.94 rg");
    ops.push(`${marginX} ${pageHeight - 21} Td (${pdfAscii("XPLAINED.IN  |  PHYSICAL PRACTITIONER CHECKLIST & PROGRESS TRACKER")}) Tj ET`);
    ops.push("BT /F1 8.5 Tf 0.75 0.80 0.86 rg");
    ops.push(`${pageWidth - 130} ${pageHeight - 21} Td (${pdfAscii(`Page ${pageNum}  |  ${roadmap.slug}`)}) Tj ET`);

    // Footer band
    ops.push("0.86 0.85 0.82 RG 0.6 w");
    ops.push(`${marginX} 34 m ${pageWidth - marginX} 34 l S`);
    ops.push("BT /F1 8 Tf 0.42 0.45 0.49 rg");
    ops.push(
      `${marginX} 21 Td (${pdfAscii(
        `Print this sheet to track your ${roadmap.title} mastery offline. Check [x] each module after completing the specification & verification quiz.`
      )}) Tj ET`
    );

    pages.push(ops);
    y = pageHeight - 58;
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < 48) {
      startNewPage(pages.length + 1);
    }
  };

  startNewPage(1);

  // Title banner box on Page 1
  ops.push("0.96 0.95 0.93 rg");
  ops.push(`${marginX} ${y - 68} ${pageWidth - marginX * 2} 68 re f`);
  ops.push("0.06 0.30 0.51 rg");
  ops.push(`${marginX} ${y - 68} 5 68 re f`);

  ops.push("BT /F2 17 Tf 0.07 0.08 0.09 rg");
  ops.push(`${marginX + 16} ${y - 24} Td (${pdfAscii(`${roadmap.title} - Physical Roadmap Checklist`)}) Tj ET`);

  const subtitleLines = wrapText(roadmap.description, 88);
  ops.push("BT /F1 9.5 Tf 0.28 0.31 0.35 rg");
  ops.push(`${marginX + 16} ${y - 40} Td (${pdfAscii(subtitleLines[0] ?? "")}) Tj ET`);

  const metaLine = `Current Readiness: ${doneCount}/${allTopics.length} Modules (${pct}%)   |   Est. Study Time: ~${Math.floor(
    totalMinutes / 60
  )}h ${totalMinutes % 60}m   |   Target Date: ____ / ____ / 202_`;
  ops.push("BT /F2 8.5 Tf 0.06 0.30 0.51 rg");
  ops.push(`${marginX + 16} ${y - 57} Td (${pdfAscii(metaLine)}) Tj ET`);

  y -= 84;

  // Stack / Tools summary row
  const toolsLine = `Core Stack & Standards: ${roadmap.tools.join("  *  ")}`;
  const wrappedTools = wrapText(toolsLine, 96);
  for (const tl of wrappedTools.slice(0, 2)) {
    ops.push("BT /F1 8.5 Tf 0.32 0.35 0.40 rg");
    ops.push(`${marginX} ${y} Td (${pdfAscii(tl)}) Tj ET`);
    y -= 13;
  }
  y -= 6;

  let globalIndex = 0;

  for (let sIdx = 0; sIdx < roadmap.sections.length; sIdx++) {
    const sec = roadmap.sections[sIdx];
    ensureSpace(56);

    // Stage header bar
    ops.push("0.07 0.08 0.09 rg");
    ops.push(`${marginX} ${y - 18} ${pageWidth - marginX * 2} 21 re f`);
    ops.push("BT /F2 9.5 Tf 1 1 1 rg");
    ops.push(
      `${marginX + 8} ${y - 11} Td (${pdfAscii(
        `STAGE 0${sIdx + 1}: ${sec.title.toUpperCase()}  (${sec.topics.length} MODULES)`
      )}) Tj ET`
    );
    y -= 30;

    for (const topic of sec.topics) {
      globalIndex += 1;
      const st = progress[topic.id] ?? "pending";
      const isDone = st === "done" || st === "skipped";
      const summaryLines = wrapText(topic.summary, 84).slice(0, 2);
      const firstPoint = topic.points[0] ? wrapText(`Key check: ${topic.points[0]}`, 86)[0] : "";
      const rowHeight = 28 + summaryLines.length * 10 + (firstPoint ? 11 : 0);

      ensureSpace(rowHeight + 6);

      // Subtle card border
      ops.push("0.85 0.84 0.80 RG 0.5 w");
      ops.push(`${marginX} ${y - rowHeight + 6} ${pageWidth - marginX * 2} ${rowHeight} re S`);

      // Physical Checkbox square
      const boxX = marginX + 10;
      const boxY = y - 11;
      ops.push("0.07 0.08 0.09 RG 1.1 w");
      ops.push(`${boxX} ${boxY} 11 11 re S`);

      if (isDone) {
        ops.push("0.08 0.33 0.18 rg");
        ops.push(`${boxX + 2} ${boxY + 2} 7 7 re f`);
      }

      // Topic Number + Title
      const numStr = String(globalIndex).padStart(2, "0");
      const statusTag = isDone ? "[COMPLETED]" : st === "learning" ? "[IN PROGRESS]" : "[ ]";
      ops.push("BT /F2 10 Tf 0.07 0.08 0.09 rg");
      ops.push(
        `${marginX + 28} ${y - 9} Td (${pdfAscii(`${numStr}. ${topic.title}   ${statusTag}`)}) Tj ET`
      );

      // Right-aligned duration & date line
      ops.push("BT /F1 8 Tf 0.40 0.43 0.47 rg");
      ops.push(
        `${pageWidth - marginX - 118} ${y - 9} Td (${pdfAscii(`${topic.minutes} min  |  Date: ___/___`)}) Tj ET`
      );

      let textY = y - 21;
      for (const sl of summaryLines) {
        ops.push("BT /F1 8.5 Tf 0.26 0.29 0.33 rg");
        ops.push(`${marginX + 28} ${textY} Td (${pdfAscii(sl)}) Tj ET`);
        textY -= 10.5;
      }

      if (firstPoint) {
        ops.push("BT /F2 8 Tf 0.06 0.30 0.51 rg");
        ops.push(`${marginX + 28} ${textY} Td (${pdfAscii(firstPoint)}) Tj ET`);
      }

      y -= rowHeight + 5;
    }

    y -= 6;
  }

  // Sign-off block at the end
  ensureSpace(58);
  ops.push("0.95 0.94 0.91 rg");
  ops.push(`${marginX} ${y - 44} ${pageWidth - marginX * 2} 44 re f`);
  ops.push("BT /F2 9.5 Tf 0.07 0.08 0.09 rg");
  ops.push(
    `${marginX + 12} ${y - 18} Td (${pdfAscii(
      "PRACTITIONER COMPLETION SIGN-OFF  |  All stages verified, code exercises executed, and readiness checkpoints passed."
    )}) Tj ET`
  );
  ops.push("BT /F1 8.5 Tf 0.30 0.33 0.37 rg");
  ops.push(
    `${marginX + 12} ${y - 34} Td (${pdfAscii(
      "Practitioner Name: ____________________________     Completion Date: ____ / ____ / 202_     Signature: ____________________"
    )}) Tj ET`
  );

  // Assemble valid PDF 1.4 document
  const objects: string[] = [];
  const addObj = (body: string) => {
    objects.push(body);
    return objects.length; // 1-based object ID
  };

  const fontRegularId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageObjIds: number[] = [];
  const pagesRootPlaceholderId = addObj(""); // placeholder for /Pages

  for (const pageOps of pages) {
    const streamContent = pageOps.join("\n");
    const contentId = addObj(`<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream`);
    const pageId = addObj(
      `<< /Type /Page /Parent ${pagesRootPlaceholderId} 0 R /MediaBox [0 0 ${pageWidth.toFixed(
        2
      )} ${pageHeight.toFixed(
        2
      )}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    pageObjIds.push(pageId);
  }

  objects[pagesRootPlaceholderId - 1] = `<< /Type /Pages /Kids [${pageObjIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] /Count ${pageObjIds.length} >>`;

  const catalogId = addObj(`<< /Type /Catalog /Pages ${pagesRootPlaceholderId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${roadmap.slug}-roadmap-checklist.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}

/**
 * Opens a print-ready physical checklist view in a dedicated print window and triggers browser Print / Save as PDF.
 */
export function printRoadmapChecklistSheet(roadmap: Roadmap): void {
  const progress = loadProgressMap(roadmap.slug);
  const allTopics = topicsOf(roadmap);
  const doneCount = allTopics.filter((t) => progress[t.id] === "done" || progress[t.id] === "skipped").length;
  const totalMinutes = minutesOf(roadmap);
  const pct = allTopics.length ? Math.round((doneCount / allTopics.length) * 100) : 0;

  let idx = 0;
  const sectionsHtml = roadmap.sections
    .map((s, sIdx) => {
      const rows = s.topics
        .map((t) => {
          idx += 1;
          const st = progress[t.id] ?? "pending";
          const checked = st === "done" || st === "skipped";
          return `<div class="item ${checked ? "done" : ""}">
            <div class="check">${checked ? "✓" : ""}</div>
            <div class="body">
              <div class="row-top">
                <strong>${String(idx).padStart(2, "0")}. ${t.title}</strong>
                <span class="meta">${t.minutes} min · Date: ____/____</span>
              </div>
              <p>${t.summary}</p>
              <div class="points">
                ${t.points.slice(0, 2).map((p) => `<span>□ ${p}</span>`).join("")}
              </div>
            </div>
          </div>`;
        })
        .join("");

      return `<section class="stage">
        <h2>STAGE 0${sIdx + 1} — ${s.title} <span>(${s.topics.length} Modules)</span></h2>
        ${rows}
      </section>`;
    })
    .join("");

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${roadmap.title} — Printable Roadmap Checklist (XplAIned.in)</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111315; margin: 24px; line-height: 1.4; }
    .top { border: 2px solid #111315; padding: 16px 20px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
    .brand { font-family: monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #0F4C81; font-weight: 700; }
    h1 { margin: 4px 0 6px; font-size: 24px; }
    .sub { margin: 0; font-size: 13px; color: #4A5058; max-width: 580px; }
    .stats { text-align: right; font-family: monospace; font-size: 12px; white-space: nowrap; }
    .stage { margin-bottom: 16px; break-inside: avoid-page; }
    .stage h2 { background: #111315; color: #fff; font-size: 12px; font-family: monospace; letter-spacing: 0.06em; padding: 7px 12px; margin: 0 0 8px; display: flex; justify-content: space-between; }
    .item { display: flex; gap: 12px; border: 1px solid #CFD4DC; padding: 9px 12px; margin-bottom: 6px; border-radius: 4px; break-inside: avoid; }
    .item.done { background: #F0FDF4; border-color: #86EFAC; }
    .check { width: 18px; height: 18px; border: 2px solid #111315; border-radius: 3px; display: grid; place-items: center; font-weight: 700; font-size: 13px; flex-shrink: 0; margin-top: 2px; }
    .body { flex: 1; }
    .row-top { display: flex; justify-content: space-between; gap: 8px; font-size: 13.5px; }
    .meta { font-family: monospace; font-size: 11px; color: #525866; }
    .body p { margin: 3px 0 5px; font-size: 12px; color: #374151; }
    .points { display: grid; gap: 2px; font-size: 11px; color: #0F4C81; font-family: monospace; }
    @media print { body { margin: 10mm; } }
  </style>
</head>
<body>
  <div class="top">
    <div>
      <div class="brand">XplAIned.in · Physical Career Roadmap Checklist</div>
      <h1>${roadmap.title}</h1>
      <p class="sub">${roadmap.description}</p>
    </div>
    <div class="stats">
      <div><strong>Readiness:</strong> ${doneCount} / ${allTopics.length} (${pct}%)</div>
      <div><strong>Est. Time:</strong> ~${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m</div>
      <div style="margin-top:6px;">Target Date: ____/____/202_</div>
    </div>
  </div>
  ${sectionsHtml}
  <script>window.onload = () => { window.print(); };</script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=920,height=800");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
  }
}
