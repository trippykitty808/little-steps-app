import { el } from '../utils.js';

function renderMemoriesTab(vals, actions) {
  return el('div', {}, [
    el('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '20px' } }, [
      el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)' } }, 'Little moments worth keeping'),
      el('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } }, [
        el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.toggleMemorySelectMode() }, vals.memorySelectMode ? 'Cancel' : 'Select'),
        el('div', { style: { flex: 'none', background: 'var(--sage)', color: '#fff', font: "600 13px 'Quicksand', sans-serif", padding: '10px 16px', borderRadius: '100px', cursor: 'pointer' }, onClick: () => actions.goMemoryNew() }, '+ Add'),
      ]),
    ]),

    el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' } },
      vals.memories.length ? vals.memories.map((mem) => el('div', {
        style: { background: '#fff', border: `2px solid ${mem.isSelected ? 'var(--sage)' : 'var(--card-border)'}`, borderRadius: '18px', overflow: 'hidden', cursor: 'pointer' },
        onClick: () => vals.memorySelectMode ? actions.toggleMemorySelect(mem.id) : actions.openMemory(mem.id),
      }, [
        el('div', { style: { position: 'relative' } }, [
          el('div', { style: { width: '100%', aspectRatio: '1', background: '#F8F4EA' } },
            mem.cover
              ? (mem.cover.type === 'video'
                  ? [el('video', { src: mem.cover.url, muted: true, playsinline: true, preload: 'metadata', style: { width: '100%', height: '100%', objectFit: 'cover' } })]
                  : [el('img', { src: mem.cover.url, style: { width: '100%', height: '100%', objectFit: 'cover' } })])
              : [el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted-2)', font: "500 12px 'Nunito', sans-serif" } }, '📷')]),
          mem.cover && mem.cover.type === 'video' ? el('div', { style: { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }, html: '<div style="width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center"><svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>' }) : null,
          mem.mediaCount > 1 ? el('div', { style: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(67,65,75,.75)', color: '#fff', font: "700 10.5px 'Nunito', sans-serif", padding: '3px 8px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }, html: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" stroke="#fff" stroke-width="2"/><path d="M8 20h10a2 2 0 002-2V8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg><span>${mem.mediaCount}</span>` }) : null,
          mem.hasIcon ? el('div', { style: { position: 'absolute', bottom: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(67,65,75,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }, html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">${mem.iconHtml}</svg>` }) : null,
          vals.memorySelectMode ? el('div', { style: { position: 'absolute', top: '8px', left: '8px', width: '22px', height: '22px', borderRadius: '50%', background: mem.isSelected ? 'var(--sage)' : 'rgba(0,0,0,.25)', border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', font: "700 12px 'Nunito', sans-serif" } }, mem.isSelected ? '✓' : '') : null,
        ]),
        el('div', { style: { padding: '12px' } }, [
          el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--text-primary)', lineHeight: '1.3' } }, mem.caption),
          el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)', marginTop: '6px' } }, mem.date),
        ]),
      ])) : [el('div', { style: { gridColumn: '1 / -1', font: "400 13.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '20px 0', textAlign: 'center' } }, 'No memories yet — log an activity or tap "+ Add" to save your first one.')]),

    vals.memorySelectionCount ? el('div', { class: 'selection-bar' }, [
      el('div', { style: { flex: '1', font: "600 13px 'Nunito', sans-serif", color: '#fff' } }, `${vals.memorySelectionCount} selected`),
      el('div', { style: { background: 'rgba(255,255,255,.15)', color: '#fff', font: "600 13px 'Quicksand', sans-serif", padding: '9px 14px', borderRadius: '100px', cursor: 'pointer' }, onClick: () => actions.shareMemories() }, 'Share'),
      el('div', { style: { background: 'var(--sage)', color: '#fff', font: "600 13px 'Quicksand', sans-serif", padding: '9px 14px', borderRadius: '100px', cursor: 'pointer' }, onClick: () => actions.printMemories() }, 'Print'),
    ]) : null,
    vals.shareToast ? el('div', { class: 'toast' }, vals.shareToast) : null,
  ]);
}

function renderNotesTab(vals, actions) {
  return el('div', {}, [
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '18px' } }, `A quick summary to share with ${vals.childName}'s family`),

    el('div', { class: 'card', style: { marginTop: '16px', borderRadius: '18px', padding: '18px' } }, [
      el('div', { class: 'section-label' }, 'How was today?'),
      el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' } },
        vals.moodOptions.map((mo) => el('div', {
          class: `pill${mo.active ? ' selected' : ''}`,
          style: { padding: '9px 16px', font: "600 13px 'Quicksand', sans-serif", background: mo.active ? mo.bg : '#fff', color: mo.active ? mo.fg : 'var(--text-primary)' },
          onClick: () => actions.setNoteMood(mo.key),
        }, mo.label))),

      el('div', { style: { marginTop: '16px', font: "400 13px/1.5 'Nunito', sans-serif", color: 'var(--text-muted-1)', background: 'var(--input-bg)', borderRadius: '12px', padding: '12px 14px' } }, vals.todaySummaryLine),

      el('textarea', { class: 'text-area', style: { marginTop: '14px', background: 'var(--input-bg)' }, placeholder: 'Anything else worth sharing...', onInput: (e) => actions.onNoteMessageChange(e) }, vals.noteMessage),

      el('div', { class: 'btn-primary', style: { marginTop: '14px', padding: '14px', borderRadius: '14px', font: "600 15px 'Quicksand', sans-serif" }, onClick: () => actions.sendNote() }, 'Send to family'),
      el('div', { style: { marginTop: '8px', textAlign: 'center', font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, 'Opens your phone’s share menu — pick Messages, email, or any app.'),
      vals.shareToast ? el('div', { class: 'toast', style: { marginTop: '6px' } }, vals.shareToast) : null,
    ]),

    el('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '22px' } }, [
      el('div', { class: 'section-label' }, 'Sent'),
      el('div', { style: { font: "600 13px 'Quicksand', sans-serif", color: 'var(--sage)', cursor: 'pointer' }, onClick: () => actions.toggleNoteSelectMode() }, vals.noteSelectMode ? 'Cancel' : 'Select'),
    ]),
    el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' } },
      vals.notesWithMeta.length ? vals.notesWithMeta.map((n) => el('div', {
        style: { background: '#fff', border: `2px solid ${n.isSelected ? 'var(--sage)' : 'var(--card-border)'}`, borderRadius: '16px', padding: '14px', cursor: vals.noteSelectMode ? 'pointer' : 'default' },
        onClick: () => { if (vals.noteSelectMode) actions.toggleNoteSelect(n.id); },
      }, [
        el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
          el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
            vals.noteSelectMode ? el('div', { style: { width: '20px', height: '20px', flex: 'none', borderRadius: '50%', background: n.isSelected ? 'var(--sage)' : 'rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', font: "700 11px 'Nunito', sans-serif" } }, n.isSelected ? '✓' : '') : null,
            el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', background: n.bg, color: n.fg } }, n.label),
          ]),
          el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--text-muted-5)' } }, n.date),
        ]),
        el('div', { style: { font: "400 13.5px/1.5 'Nunito', sans-serif", color: 'var(--text-body)', marginTop: '8px' } }, n.message),
      ])) : [el('div', { style: { font: "400 13.5px 'Nunito', sans-serif", color: 'var(--text-muted-2)', padding: '8px 0' } }, 'No handoff notes sent yet.')]),

    vals.noteSelectionCount ? el('div', { class: 'selection-bar' }, [
      el('div', { style: { flex: '1', font: "600 13px 'Nunito', sans-serif", color: '#fff' } }, `${vals.noteSelectionCount} selected`),
      el('div', { style: { background: 'rgba(255,255,255,.15)', color: '#fff', font: "600 13px 'Quicksand', sans-serif", padding: '9px 14px', borderRadius: '100px', cursor: 'pointer' }, onClick: () => actions.shareNotes() }, 'Share'),
      el('div', { style: { background: 'var(--sage)', color: '#fff', font: "600 13px 'Quicksand', sans-serif", padding: '9px 14px', borderRadius: '100px', cursor: 'pointer' }, onClick: () => actions.printNotes() }, 'Print'),
    ]) : null,
  ]);
}

function renderMilestonesTab(vals, actions) {
  return el('div', {}, [
    el('div', { style: { font: "400 14px 'Nunito', sans-serif", color: 'var(--text-muted-1)', marginTop: '18px' } }, `Every milestone logged for ${vals.childName}`),
    el('div', { style: { display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '16px' } },
      vals.domainsForScrapbook.map((d) => el('div', {}, [
        el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          el('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: d.color } }),
          el('div', { style: { font: "700 14px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, d.domain),
        ]),
        el('div', { style: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' } },
          d.items.map((m) => el('div', {
            class: 'card', style: { borderRadius: '14px', padding: '13px 16px', cursor: 'pointer' },
            onClick: () => actions.openMilestone(m.key, 'scrapbook-milestones'),
          }, [
            el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' } }, [
              el('div', { style: { font: "500 14px 'Nunito', sans-serif", color: 'var(--text-primary)' } }, m.title),
              el('div', { style: { font: "600 11px 'Nunito', sans-serif", letterSpacing: '.04em', textTransform: 'uppercase', flex: 'none', padding: '4px 10px', borderRadius: '100px', background: m.badgeBg, color: m.badgeFg } }, m.statusLabel),
            ]),
            el('div', { style: { display: 'flex', gap: '14px', marginTop: '8px' } }, [
              m.emergingDate ? el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--amber-fg)' } }, `Emerging ${m.emergingDate}`) : null,
              m.achievedDate ? el('div', { style: { font: "400 11.5px 'Nunito', sans-serif", color: 'var(--sage-tint-fg)' } }, `Achieved ${m.achievedDate}`) : null,
            ]),
          ]))),
      ]))),
  ]);
}

export function renderScrapbook(vals, actions) {
  const tab = vals.scrapbookTab;
  return el('div', { 'data-screen-label': 'Scrapbook', class: 'screen', style: { padding: '26px 24px 10px' } }, [
    el('div', { style: { font: "700 26px 'Quicksand', sans-serif", color: 'var(--text-primary)' } }, 'Scrapbook'),

    el('div', { style: { display: 'flex', gap: '8px', marginTop: '16px', background: '#F6F1E4', borderRadius: '100px', padding: '4px' } }, [
      el('div', { style: { flex: '1', textAlign: 'center', padding: '9px 0', borderRadius: '100px', cursor: 'pointer', font: "600 13px 'Quicksand', sans-serif", background: tab === 'memories' ? '#fff' : 'transparent', color: tab === 'memories' ? 'var(--text-primary)' : 'var(--text-muted-2)' }, onClick: () => actions.goScrapbookMemories() }, 'Memories'),
      el('div', { style: { flex: '1', textAlign: 'center', padding: '9px 0', borderRadius: '100px', cursor: 'pointer', font: "600 13px 'Quicksand', sans-serif", background: tab === 'notes' ? '#fff' : 'transparent', color: tab === 'notes' ? 'var(--text-primary)' : 'var(--text-muted-2)' }, onClick: () => actions.goScrapbookNotes() }, 'Handoff Notes'),
      el('div', { style: { flex: '1', textAlign: 'center', padding: '9px 0', borderRadius: '100px', cursor: 'pointer', font: "600 13px 'Quicksand', sans-serif", background: tab === 'milestones' ? '#fff' : 'transparent', color: tab === 'milestones' ? 'var(--text-primary)' : 'var(--text-muted-2)' }, onClick: () => actions.goScrapbookMilestones() }, 'Milestones'),
    ]),

    tab === 'memories' ? renderMemoriesTab(vals, actions) : null,
    tab === 'notes' ? renderNotesTab(vals, actions) : null,
    tab === 'milestones' ? renderMilestonesTab(vals, actions) : null,
    el('div', { style: { height: '16px' } }),
  ]);
}
