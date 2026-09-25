import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { color, line, font } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';

const PROJ_FIELDS = [
  { label: 'Project name', ph: 'Coral Bay Residences' },
  { label: 'Location', ph: 'Paphos, Cyprus' },
  { label: 'GPS coordinates', ph: '34.7712, 32.4074' },
  { label: 'Completion date', ph: 'Q3 2027' },
  { label: 'Number of units', ph: '12' },
];

const FACILITIES = ['Communal pool', 'Gym', 'Gated area', 'Underground parking', 'Tennis / golf', 'Concierge', 'Lift', 'Landscaped gardens'];
const FEATURES = ['Terrace', 'Private garden', 'Allocated parking', 'Sea view', 'Private pool', 'Air conditioning'];

const DEV_PROFILE = [
  { label: 'Company', value: 'XYZ Developments Ltd' },
  { label: 'Registration no.', value: 'HE 418 220' },
  { label: 'Licence', value: 'Cyprus PDL / 2019-0442' },
  { label: 'Years active', value: '11 years' },
  { label: 'Completed projects', value: '7 · 214 units' },
  { label: 'Primary contact', value: 'A. Georgiou · verified' },
];

const SINGLE_FIELDS = [
  { label: 'Price', ph: '€640,000' },
  { label: 'Bedrooms', ph: '4' },
  { label: 'Bathrooms', ph: '3' },
  { label: 'Built area m²', ph: '240' },
  { label: 'Plot area m²', ph: '800' },
  { label: 'Expected rent', ph: '€3,400 / month' },
];

const UNIT_HEAD = [
  { label: 'UNIT', align: 'left' as const },
  { label: 'LAYOUT', align: 'left' as const },
  { label: 'AREA', align: 'left' as const },
  { label: 'PRICE', align: 'right' as const },
  { label: 'EXPECTED RENT', align: 'right' as const },
  { label: 'AVAILABILITY', align: 'left' as const },
  { label: '', align: 'right' as const },
];

const TINTS = ['#DCEEF9', '#E5F6FF', '#EAF2F8', '#D3E5F2'];
const smallField = { width: '100%', padding: '9px 10px', border: '1px solid rgba(32,90,135,.2)', borderRadius: 10, background: '#fff', fontSize: 15.5 } as const;

export function AddProjectPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const s = useAppStore();
  const { photoFiles, uploads, devUnits, planFiles, projectKind, singleSaved, unitOpen, editingUnit, declaredUnits } = s;

  useEffect(() => {
    if (!uploads.length) return;
    const t = window.setInterval(() => s.tickUploads(), 420);
    return () => window.clearInterval(t);
  }, [uploads.length, s]);

  const layouts = projectKind === 'single' ? [] : [...new Set(devUnits.map((u) => (u.beds.match(/^\d+\s*bed/) || ['1 bed'])[0]))];
  const planTargets = ['Unassigned', 'Whole project', ...layouts];
  const editing = editingUnit !== null ? devUnits[editingUnit] : null;

  const readiness = [
    { label: 'Project details', value: 'Complete', fg: '#9FD2B4' },
    { label: 'Developer profile', value: 'Verified', fg: '#9FD2B4' },
    { label: 'Photos', value: `${photoFiles.length} of 30`, fg: photoFiles.length >= 6 ? color.success : color.action },
    {
      label: 'Units',
      value: projectKind === 'single' ? 'One property' : `${devUnits.length} of ${declaredUnits}`,
      fg: projectKind === 'single' || devUnits.length >= declaredUnits ? color.success : color.action,
    },
  ];

  return (
    <DevPortalLayout>
      <div style={{ padding: isMobile ? '20px 18px 36px' : '28px 32px 40px' }}>
        <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.muted2, cursor: 'pointer', padding: '0 0 12px' }}>
          ← Developer dashboard
        </button>
        <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.ink, margin: '0 0 22px' }}>Add Project</h1>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1.4 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 16 }}>PROJECT INFORMATION</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 14 }}>
                {PROJ_FIELDS.map((f) => (
                  <label key={f.label} style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: 15.5, color: color.dim, marginBottom: 5 }}>{f.label}</span>
                    <input placeholder={f.ph} style={{ ...smallField, padding: '10px 11px', fontSize: 16.5 }} />
                  </label>
                ))}
              </div>
              <label style={{ display: 'block', marginTop: 14 }}>
                <span style={{ display: 'block', fontSize: 15.5, color: color.dim, marginBottom: 5 }}>Description</span>
                <textarea rows={3} placeholder="What makes this project attractive to investors?" style={{ ...smallField, padding: '10px 11px', fontSize: 16.5, resize: 'vertical' }} />
              </label>
              <div style={{ fontSize: 14, letterSpacing: '.14em', color: color.muted2, margin: '20px 0 10px' }}>FACILITIES · SHARED BY THE WHOLE PROJECT</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {FACILITIES.map((f) => (
                  <label key={f} style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 15.5, border: '1px solid rgba(32,90,135,.18)', borderRadius: 20, padding: '6px 12px', background: '#FFFFFF', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: color.ink, width: 14, height: 14 }} />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2 }}>DEVELOPER INFORMATION</div>
                <button onClick={() => navigate('/developer-portal/company')} style={{ border: 0, background: 'transparent', fontSize: 14, color: color.action, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                  Edit in account
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px 18px', background: '#FFFFFF', border: `1px solid ${line(0.1)}`, borderRadius: 7, padding: '16px 18px' }}>
                {DEV_PROFILE.map((d) => (
                  <div key={d.label}>
                    <div style={{ fontSize: 13, color: color.muted2, marginBottom: 3 }}>{d.label}</div>
                    <div style={{ fontSize: 16.5, color: color.ink }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 18 }}>MEDIA</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500 }}>Photos</div>
                <div style={{ fontSize: 14, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{photoFiles.length} of 30 · jpg or png, min 2000px</div>
              </div>
              <p style={{ fontSize: 14, color: color.muted2, margin: '0 0 12px' }}>Drag a tile to reorder. The first photo is the cover investors see in search results.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(104px,1fr))', gap: 10 }}>
                {photoFiles.map((name, i) => (
                  <div key={name + i} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 7, overflow: 'hidden', background: TINTS[i % TINTS.length], border: `1px solid ${line(0.14)}`, cursor: 'grab' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '5px 7px', background: 'linear-gradient(transparent,rgba(16,30,22,.72))', fontFamily: font.mono, fontSize: 11, color: '#EAF1EC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {name}
                    </div>
                    {i === 0 && (
                      <div style={{ position: 'absolute', top: 6, left: 6, fontSize: 10.5, letterSpacing: '.1em', padding: '3px 6px', borderRadius: 3, background: color.ink, color: color.sky }}>COVER</div>
                    )}
                    <button onClick={() => s.removePhoto(i)} style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, border: 0, borderRadius: '50%', background: 'rgba(16,30,22,.6)', color: '#fff', fontSize: 14, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={s.startUpload} style={{ aspectRatio: '4/3', border: '1px dashed rgba(32,90,135,.32)', borderRadius: 40, background: '#FFFFFF', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: color.dim }}>
                  <span style={{ fontSize: 19, lineHeight: 1, fontWeight: 300 }}>+</span>
                  <span style={{ fontSize: 13 }}>Add photos</span>
                </button>
              </div>
              <div style={{ fontSize: 13.5, color: color.muted2, marginTop: 9 }}>Or drop a folder of images here — we upload them in one go.</div>

              {uploads.length > 0 && (
                <div style={{ marginTop: 12, ...devPanel, padding: '13px 14px' }}>
                  <div style={{ fontSize: 14, letterSpacing: '.1em', color: color.muted2, marginBottom: 10 }}>UPLOADING · SUBMIT IS BLOCKED UNTIL THIS FINISHES</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {uploads.map((u, i) => (
                      <div key={u.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 5 }}>
                          <span style={{ fontSize: 15.5, color: color.ink, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                          <span style={{ display: 'flex', gap: 9, alignItems: 'center', flex: 'none' }}>
                            {u.error && <span style={{ fontSize: 13, color: color.dangerDeep }}>{u.error}</span>}
                            {!u.error && <span style={{ fontSize: 13.5, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{u.pct}%</span>}
                            <button onClick={() => s.dropUpload(i)} style={{ border: 0, background: 'transparent', color: color.faint, fontSize: 15.5, cursor: 'pointer', padding: '0 2px' }}>
                              ✕
                            </button>
                          </span>
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: 'rgba(32,90,135,.1)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 3, background: u.error ? color.danger : color.action, width: `${u.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55, color: color.muted2, marginTop: 10 }}>
                    Thumbnails are generated after each upload finishes, which is why a tile appears a moment later than its progress bar.
                  </div>
                </div>
              )}

              <div style={{ height: 1, background: line(0.1), margin: '22px 0' }} />

              <MediaGroup label="Videos" hint="mp4 or mov · up to 2 · 500 MB each" cta="+ Add video" files={[{ ext: 'MP4', name: 'coral_bay_walkthrough.mp4', meta: '2:41 · 184 MB' }]} />

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 9 }}>
                  <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500 }}>Floor plans</div>
                  <div style={{ fontSize: 14, color: color.muted2 }}>pdf or png · one per layout</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {planFiles.map((f, i) => (
                    <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#FFFFFF', border: `1px solid ${line(0.12)}`, borderRadius: 7, padding: '10px 12px' }}>
                      <span style={{ flex: 'none', fontFamily: font.mono, fontSize: 11, letterSpacing: '.06em', color: color.dim, background: color.sky, borderRadius: 3, padding: '4px 6px' }}>{f.ext}</span>
                      <span style={{ flex: 1, minWidth: 0, fontSize: 15.5, color: color.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                      <span style={{ flex: 'none', fontSize: 13.5, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{f.meta}</span>
                      <select defaultValue={f.assign || layouts[i] || 'Unassigned'} style={{ flex: 'none', maxWidth: 150, fontSize: 14, padding: '5px 7px', border: '1px solid rgba(32,90,135,.18)', borderRadius: 10, background: '#fff', color: color.ink }}>
                        {planTargets.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <button onClick={() => s.showToast(`${f.name} removed`)} style={{ flex: 'none', border: 0, background: 'transparent', color: color.faint, fontSize: 16.5, cursor: 'pointer', padding: '0 2px' }}>
                        ×
                      </button>
                    </div>
                  ))}
                  <button onClick={() => s.showToast('A file picker opens here — pick a floor plan from your device')} style={dashedCta}>
                    + Add floor plan
                  </button>
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted2, marginTop: 8 }}>
                  {projectKind === 'single'
                    ? 'A single property has one plan — no layout to choose.'
                    : layouts.length
                      ? 'The layout list comes from the units you add below. Add a unit with a new bedroom count and it appears here.'
                      : 'Add units below and their layouts become selectable here.'}
                </div>
              </div>

              <MediaGroup label="Brochure" hint="pdf · one file" cta="+ Replace brochure" files={[{ ext: 'PDF', name: 'coral_bay_brochure_en.pdf', meta: '8.6 MB' }]} />
            </div>

            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2 }}>UNITS</div>
                <div style={{ fontSize: 14, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>
                  {projectKind === 'single' ? 'One property' : `${devUnits.length} added · ${declaredUnits} declared above`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
                {([
                  { key: 'multi' as const, label: 'Several units' },
                  { key: 'single' as const, label: 'Single property (villa or house)' },
                ]).map((k) => {
                  const on = projectKind === k.key;
                  return (
                    <button key={k.key} onClick={() => s.setProjectKind(k.key)} style={{ border: `1px solid ${on ? color.actionDeep : 'rgba(32,90,135,.18)'}`, borderRadius: 40, padding: '7px 14px', background: on ? color.actionDeep : '#FFFFFF', color: on ? color.sky : color.dim, fontSize: 15.5, cursor: 'pointer' }}>
                      {k.label}
                    </button>
                  );
                })}
              </div>

              {projectKind === 'single' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(122px,1fr))', gap: 12, marginBottom: 14 }}>
                    {SINGLE_FIELDS.map((f) => (
                      <label key={f.label} style={{ display: 'block' }}>
                        <span style={{ display: 'block', fontSize: 14, color: color.dim, marginBottom: 5 }}>{f.label}</span>
                        <input placeholder={f.ph} style={smallField} />
                      </label>
                    ))}
                    <label style={{ display: 'block' }}>
                      <span style={{ display: 'block', fontSize: 14, color: color.dim, marginBottom: 5 }}>Availability</span>
                      <select style={{ ...smallField, color: color.ink }}>
                        <option>Available</option>
                        <option>Reserved</option>
                        <option>Sold</option>
                      </select>
                    </label>
                  </div>
                  <div style={{ fontSize: 14, letterSpacing: '.14em', color: color.muted2, marginBottom: 10 }}>THIS PROPERTY</div>
                  <FeatureChips />
                  <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${line(0.1)}` }}>
                    <button onClick={s.saveSingle} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.ink, color: color.sky, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                      Save property details
                    </button>
                    <span style={{ fontSize: 14, color: singleSaved ? color.action : color.muted2 }}>{singleSaved ? 'Saved · included when you submit for review' : 'Not saved yet'}</span>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 14, color: color.muted2, margin: '0 0 14px' }}>Add one unit, then duplicate it and change the number — floors usually repeat.</p>

                  {devUnits.length === 0 && (
                    <div style={{ border: '1px dashed rgba(32,90,135,.28)', borderRadius: 12, padding: '24px 20px', marginBottom: 14, background: '#FFFFFF' }}>
                      <div style={{ fontSize: 16.5, fontWeight: 600, color: color.ink, marginBottom: 5 }}>No units yet</div>
                      <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.muted2, margin: 0 }}>
                        You declared {declaredUnits} units above. Add the first one below — or import the whole schedule from a spreadsheet. A project can be submitted with fewer units than declared, but every unit must exist before publication.
                      </p>
                    </div>
                  )}

                  <div style={{ overflowX: 'auto', marginBottom: 14 }} className="bip-scroll">
                    <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', fontSize: 15.5 }}>
                      <thead>
                        <tr>
                          {UNIT_HEAD.map((h, i) => (
                            <th key={i} style={{ textAlign: h.align, padding: '8px 10px', fontSize: 12, letterSpacing: '.1em', color: color.muted2, fontWeight: 500, borderBottom: '1px solid rgba(32,90,135,.14)' }}>
                              {h.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {devUnits.map((u, i) => (
                          <tr key={u.no}>
                            <td style={{ ...cell, color: color.ink, fontWeight: 500 }}>{u.no}</td>
                            <td style={{ ...cell, color: color.dim }}>{u.beds}</td>
                            <td style={{ ...cell, color: color.dim, fontVariantNumeric: 'tabular-nums' }}>{u.area}</td>
                            <td style={{ ...cell, textAlign: 'right', color: color.ink, fontVariantNumeric: 'tabular-nums' }}>{u.price}</td>
                            <td style={{ ...cell, textAlign: 'right', color: color.dim, fontVariantNumeric: 'tabular-nums' }}>{u.rent}</td>
                            <td style={cell}>
                              <span style={{ fontSize: 13, padding: '4px 9px', borderRadius: 4, background: u.avail === 'Available' ? color.sky : u.avail === 'Reserved' ? '#D3E5F2' : color.panel, color: color.action, whiteSpace: 'nowrap' }}>{u.avail}</span>
                            </td>
                            <td style={{ ...cell, textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button onClick={() => s.editUnit(i)} style={{ border: 0, background: 'transparent', color: color.ink, fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '0 6px' }}>
                                Edit
                              </button>
                              <button onClick={() => s.duplicateUnit(i)} style={{ border: 0, background: 'transparent', color: color.action, fontSize: 14, cursor: 'pointer', padding: '0 6px' }}>
                                Duplicate
                              </button>
                              <button onClick={() => s.removeUnit(i)} style={{ border: 0, background: 'transparent', color: color.faint, fontSize: 14, cursor: 'pointer', padding: '0 2px' }}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {unitOpen ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid rgba(32,90,135,.16)', borderRadius: 12, padding: 18 }}>
                      <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500, marginBottom: 14 }}>{editing ? `Edit ${editing.no}` : 'New unit'}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(122px,1fr))', gap: 12, marginBottom: 14 }}>
                        {[
                          { label: 'Unit number', ph: editing?.no ?? 'A-201' },
                          { label: 'Bedrooms', ph: '1' },
                          { label: 'Bathrooms', ph: '1' },
                          { label: 'Area m²', ph: editing?.area.replace(' m²', '') ?? '55' },
                          { label: 'Price', ph: editing?.price ?? '€175,000' },
                          { label: 'Expected rent', ph: editing ? `${editing.rent} / month` : '€1,050 / month' },
                        ].map((f) => (
                          <label key={f.label} style={{ display: 'block' }}>
                            <span style={{ display: 'block', fontSize: 14, color: color.dim, marginBottom: 5 }}>{f.label}</span>
                            <input placeholder={f.ph} style={smallField} />
                          </label>
                        ))}
                        <label style={{ display: 'block' }}>
                          <span style={{ display: 'block', fontSize: 14, color: color.dim, marginBottom: 5 }}>Availability</span>
                          <select defaultValue={editing?.avail ?? 'Available'} style={{ ...smallField, color: color.ink }}>
                            <option>Available</option>
                            <option>Reserved</option>
                            <option>Sold</option>
                          </select>
                        </label>
                      </div>
                      <div style={{ fontSize: 14, letterSpacing: '.14em', color: color.muted2, marginBottom: 10 }}>THIS UNIT ONLY</div>
                      <FeatureChips />
                      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
                        <button onClick={s.saveUnit} style={{ border: 0, borderRadius: 40, padding: '10px 17px', background: color.ink, color: color.sky, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                          Save unit
                        </button>
                        <button onClick={s.saveUnit} style={{ border: '1px solid rgba(32,90,135,.22)', borderRadius: 40, padding: '10px 17px', background: '#fff', color: color.ink, fontSize: 15.5, cursor: 'pointer' }}>
                          Save and add another
                        </button>
                        <button onClick={s.closeUnitForm} style={{ border: 0, background: 'transparent', color: color.muted2, fontSize: 15.5, cursor: 'pointer', padding: '0 4px' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
                      <button onClick={s.openUnitForm} style={{ border: '1px dashed rgba(32,90,135,.32)', borderRadius: 40, padding: '12px 18px', background: '#FFFFFF', color: color.ink, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
                        + Add unit
                      </button>
                      <button onClick={() => s.showToast('Spreadsheet import opens here — csv or xlsx')} style={{ border: 0, background: 'transparent', color: color.action, fontSize: 15.5, textDecoration: 'underline', cursor: 'pointer', padding: '0 4px' }}>
                        Import units from a spreadsheet
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div style={{ flex: '1 1 250px', minWidth: 0, alignSelf: 'stretch' }}>
            <div style={{ background: color.ink, color: color.sky, borderRadius: 16, padding: 22, position: 'sticky', top: 16 }}>
              <div style={{ fontSize: 12, letterSpacing: '.18em', color: color.edge, marginBottom: 10 }}>BEFORE PUBLICATION</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.edge, margin: '0 0 14px' }}>
                Reviewed before publication — we verify pricing, availability and rental assumptions, then produce an independent investment score.
              </p>
              <div style={{ fontSize: 13.5, lineHeight: 1.7, color: color.edge, paddingBottom: 16, borderBottom: '1px solid rgba(228,237,244,.16)' }}>Submitted → Review → Analysis → Published</div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.edge, marginBottom: 9 }}>READY TO SUBMIT</div>
                {readiness.map((r) => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 15.5, padding: '5px 0', color: color.edge }}>
                    <span>{r.label}</span>
                    <span style={{ color: r.fg, fontVariantNumeric: 'tabular-nums' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => s.showToast('Project submitted for review')} style={{ width: '100%', marginTop: 18, border: 0, borderRadius: 40, padding: 13, background: color.sky, color: color.ink, fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
                Submit for Review
              </button>
              <button onClick={() => s.showToast('Draft saved to My Projects')} style={{ width: '100%', marginTop: 8, border: '1px solid rgba(228,237,244,.3)', borderRadius: 40, padding: 12, background: 'transparent', color: color.sky, fontSize: 15.5, cursor: 'pointer' }}>
                Save draft
              </button>
              <button
                onClick={() =>
                  s.openModal({
                    title: 'Discard this draft?',
                    body: 'Everything entered on this screen is deleted, including uploaded photos. This cannot be undone.',
                    ok: 'Discard draft',
                    tone: 'danger',
                    run: () => {
                      s.showToast('Draft discarded');
                      navigate('/developer-portal/projects');
                    },
                  })
                }
                style={{ width: '100%', marginTop: 8, border: 0, borderRadius: 40, padding: 11, background: 'transparent', color: '#C9A0A0', fontSize: 15.5, cursor: 'pointer' }}
              >
                Discard draft
              </button>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.edge, marginTop: 12 }}>
                Drafts live in My Projects until you submit them. Leaving this screen with unsaved edits will ask first.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DevPortalLayout>
  );
}

function FeatureChips() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
      {FEATURES.map((f) => (
        <label key={f} style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 15.5, border: '1px solid rgba(32,90,135,.18)', borderRadius: 20, padding: '6px 12px', background: '#fff', cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: color.ink, width: 14, height: 14 }} />
          {f}
        </label>
      ))}
    </div>
  );
}

function MediaGroup({ label, hint, cta, files }: { label: string; hint: string; cta: string; files: Array<{ ext: string; name: string; meta: string }> }) {
  const showToast = useAppStore((st) => st.showToast);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 9 }}>
        <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 14, color: color.muted2 }}>{hint}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {files.map((f) => (
          <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#FFFFFF', border: `1px solid ${line(0.12)}`, borderRadius: 7, padding: '10px 12px' }}>
            <span style={{ flex: 'none', fontFamily: font.mono, fontSize: 11, letterSpacing: '.06em', color: color.dim, background: color.sky, borderRadius: 3, padding: '4px 6px' }}>{f.ext}</span>
            <span style={{ flex: 1, minWidth: 0, fontSize: 15.5, color: color.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
            <span style={{ flex: 'none', fontSize: 13.5, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{f.meta}</span>
            <button onClick={() => showToast(`${f.name} removed`)} style={{ flex: 'none', border: 0, background: 'transparent', color: color.faint, fontSize: 16.5, cursor: 'pointer', padding: '0 2px' }}>
              ×
            </button>
          </div>
        ))}
        <button onClick={() => showToast('A file picker opens here — pick a file from your device')} style={dashedCta}>
          {cta}
        </button>
      </div>
    </div>
  );
}

const dashedCta = {
  border: '1px dashed rgba(32,90,135,.3)',
  borderRadius: 40,
  padding: '11px 11px 11px 14px',
  background: '#FFFFFF',
  color: color.dim,
  fontSize: 15.5,
  cursor: 'pointer',
  textAlign: 'left',
} as const;

const cell = { padding: '11px 10px', borderBottom: '1px solid rgba(32,90,135,.08)' } as const;
