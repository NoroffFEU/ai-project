export function showStatus(message, type = 'warning') {
  let el = document.getElementById('statusMessageContainer');

  if (!el) {
    el = document.createElement('div');
    el.id = 'statusMessageContainer';
    el.className = 'alert text-center m-2  mx-auto font-weight-bold';
    document.body.prepend(el);
  }

  el.textContent = message;
  el.className = `alert alert-${type} text-center m-2`;
}
