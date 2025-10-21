/*global html2canvas */
// See cdnjs in weekly.html header
import { isLoggedIn } from "../../auth/isLoggedIn.mjs";

function getModalById(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const B = window.bootstrap;
  return B ? B.Modal.getOrCreateInstance(el) : null;
}

function showAuthRequired() {
  const m = getModalById("authRequiredModal");
  if (m) m.show();
}

const button = document.getElementById("exportBtn");

button.addEventListener("click", () => {});
function fileSaver(extension) {
  const now = new Date().toISOString().replace(/[:.]/g, "-");
  return `cards-${now}.${extension}`;
}

async function exportAsPng(e) {
  e?.preventDefault();
  try {
    if (!isLoggedIn()) {
      showAuthRequired();
      return;
    }
    const container =
      document.getElementById("cardsContainer") ||
      document.getElementById("singleTaskContainer");

    if (!container) {
      console.error("Container element not found");
      alert("Export failed: Container not found");
      return;
    }

    const canvas = await html2canvas(container, {
      backgroundColor: "#ffffff",
      scale: Math.max(window.devicePixelRatio || 1, 2),
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileSaver("png");
    link.click();
  } catch (error) {
    console.error("Error exporting PNG:", error);
    alert("Failed to export PNG: " + error.message);
  }
}

async function exportAsPdf(e) {
  e?.preventDefault();
  try {
    if (!isLoggedIn()) {
      showAuthRequired();
      return;
    }
    const container = document.getElementById("cardsContainer");
    if (!container) {
      console.error("Container element not found");
      alert("Export failed: Container not found");
      return;
    }

    const canvas = await html2canvas(container, {
      backgroundColor: "#ffffff",
      scale: Math.max(window.devicePixelRatio || 1, 2),
    });

    const imgData = canvas.toDataURL("image/png");

    if (!window.jspdf) {
      console.error("jsPDF library not loaded");
      alert("PDF library failed to load. Please refresh the page.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(fileSaver("pdf"));
  } catch (error) {
    console.error("Error exporting PDF:", error);
    alert("Failed to export PDF: " + error.message);
  }
}

function exportAsCsv(e) {
  e?.preventDefault();
  if (!isLoggedIn()) {
    showAuthRequired();
    return;
  }

  const items = Array.from(
    document.querySelectorAll("#cardsContainer > .card"),
  );

  if (items.length === 0) {
    alert("No tasks to export for this week.");
    return;
  }

  const rows = [["Title", "Completed", "CreatedAt"]];

  for (const card of items) {
    const title = (card.querySelector(".card-title")?.textContent || "").trim();
    const description = (
      card.querySelector(".card-text")?.textContent || ""
    ).trim();

    const createdEl = [...card.querySelectorAll(".card-text small")].find(
      (el) => /created\s*at/i.test(el.textContent),
    );

    const createdAt = createdEl
      ? createdEl.textContent.replace(/^\s*Created\s*At:\s*/i, "").trim()
      : "";

    rows.push([title, description, createdAt]);
  }

  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileSaver("csv");
  link.click();
  URL.revokeObjectURL(link.href);
}

document.getElementById("exportPng")?.addEventListener("click", exportAsPng);
document.getElementById("exportPdf")?.addEventListener("click", exportAsPdf);
document.getElementById("exportCsv")?.addEventListener("click", exportAsCsv);
