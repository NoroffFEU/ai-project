export function confirmModal({
  title = "Confirm",
  body = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
} = {}) {
  return new Promise((resolve) => {
    const modalEl = document.getElementById("confirmModal");
    const titleEl = document.getElementById("confirmTitle");
    const bodyEl = document.getElementById("confirmBody");
    const okBtn = document.getElementById("confirmOkBtn");
    const cancelBtn = document.getElementById("confirmCancelBtn");

    titleEl.textContent = title;
    bodyEl.textContent = body;
    okBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;

    const bsModal = new bootstrap.Modal(modalEl, { backdrop: "static" });

    const cleanup = () => {
      okBtn.removeEventListener("click", onOk);
      modalEl.removeEventListener("hidden.bs.modal", onCancelIfHidden);
    };

    const onOk = () => {
      cleanup();
      bsModal.hide();
      resolve(true);
    };
    const onCancelIfHidden = () => {
      cleanup();
      resolve(false);
    };

    okBtn.addEventListener("click", onOk, { once: true });
    modalEl.addEventListener("hidden.bs.modal", onCancelIfHidden, {
      once: true,
    });

    bsModal.show();
  });
}

export function showFeedback(message = "Task deleted") {
  const modalEl = document.getElementById("feedbackModal");
  const bodyEl = document.getElementById("feedbackBody");
  bodyEl.textContent = message;
  const bsModal = new bootstrap.Modal(modalEl, { backdrop: true });
  bsModal.show();
}
