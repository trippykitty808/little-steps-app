// Small shared helpers — ported from the design prototype's Component class methods.

export function monthsToLabel(m) {
  const y = Math.floor(m / 12), mo = m % 12;
  if (y === 0) return mo + ' month' + (mo === 1 ? '' : 's');
  if (mo === 0) return y + ' year' + (y === 1 ? '' : 's');
  return y + ' yr ' + mo + ' mo';
}

export function stageForMonths(m) {
  if (m < 12) return 'Infant';
  if (m < 18) return 'Young Toddler';
  if (m < 24) return 'Toddler';
  if (m < 36) return 'Young Preschooler';
  if (m < 48) return 'Preschooler';
  return 'Kindergarten Prep';
}

// Reads a video file's length (seconds) via a throwaway <video> element, so we
// can enforce the short-clip cap before uploading. Resolves 0 if unreadable.
export function getVideoDuration(file) {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => { const d = v.duration; URL.revokeObjectURL(url); resolve(Number.isFinite(d) ? d : 0); };
      v.onerror = () => { URL.revokeObjectURL(url); resolve(0); };
      v.src = url;
    } catch (_) { resolve(0); }
  });
}

// 'YYYY-MM-DD' for a native <input type="date"> value, using local time
// (never toISOString, which shifts to UTC and can land on the wrong day).
export function todayInputDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 'YYYY-MM-DD' → friendly display like "July 8". Parsed as a local date.
export function formatDateInput(yyyymmdd) {
  if (!yyyymmdd) return '';
  const parts = String(yyyymmdd).split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return yyyymmdd;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export function formatDateShort(d = new Date()) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'style' && typeof v === 'object') {
      Object.assign(node.style, v);
    } else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === 'html') {
      node.innerHTML = v;
    } else if (k === 'class') {
      node.className = v;
    } else if (v !== undefined && v !== null && v !== false) {
      node.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const child of [].concat(children)) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

export async function shareText(title, lines, onToast) {
  const text = title + '\n\n' + lines.join('\n\n');
  if (navigator.share) {
    try { await navigator.share({ title, text }); } catch (_) { /* user cancelled */ }
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      if (onToast) {
        onToast('Copied to clipboard');
        setTimeout(() => onToast(''), 2500);
      }
    } catch (_) { /* ignore */ }
  }
}

export function svgIcon(size, innerHtml, extraStyle = '') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="${extraStyle}">${innerHtml}</svg>`;
}
