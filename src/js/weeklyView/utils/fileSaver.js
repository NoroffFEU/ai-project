/*global html2canvas */
// See cdnjs in yourWeek.html header

function fileSaver(extension) {
  const now = new Date().toISOString().replace(/[:.]/g, "-");
  return `cards-${now}.${extension}`;
}

async function exportAsPng(e) {
  e?.preventDefault();
  const container = document.getElementById("cardsContainer");
  const canvas = await html2canvas(container, {
    backgroundColor: "#ffffff",
    scale: Math.max(window.devicePixelRatio || 1, 2),
  });
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = fileSaver("png");
  link.click();
}

async function exportAsPdf(e) {
  e?.preventDefault();
  const container = document.getElementById("cardsContainer");
  const canvas = await html2canvas(container, {
    backgroundColor: "#ffffff",
    scale: Math.max(window.devicePixelRatio || 1, 2),
  });
  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save(fileSaver("pdf"));
}

function exportAsCsv(e) {
  e?.preventDefault();

  const items = Array.from(
    document.querySelectorAll("#taskList > li[data-id]"),
  );

  if (items.length === 0) {
    alert("No tasks to export for this week.");
    return;
  }

  const rows = [["Title", "Completed", "CreatedAt"]];

  for (const li of items) {
    const title = (li.querySelector(".task-title")?.textContent || "").trim();
    const completed = li.querySelector('input[type="checkbox"]')?.checked
      ? "true"
      : "false";
    const createdAt = li.getAttribute("data-created-at") || "";
    rows.push([title, completed, createdAt]);
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
