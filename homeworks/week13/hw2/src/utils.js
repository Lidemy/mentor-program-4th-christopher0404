import { commentTemplate } from './templates';

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getCurrentDatetime() {
  const datetimeFormat = datetime => (datetime < 10 ? `0${datetime}` : datetime);
  const d = new Date(Date.now());
  return `${d.getFullYear()}-${datetimeFormat(d.getMonth() + 1)}-${datetimeFormat(d.getDate())} ${datetimeFormat(d.getHours())}:${datetimeFormat(d.getMinutes())}:${datetimeFormat(d.getSeconds())}`;
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}

export function appendCommentsToDOM(container, comment, isPrepend) {
  if (isPrepend) {
    container.prepend(commentTemplate(comment, escapeHtml));
  } else {
    container.append(commentTemplate(comment, escapeHtml));
  }
}
