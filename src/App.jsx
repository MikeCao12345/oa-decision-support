import React, { useMemo, useState } from "react";

const mockPatient = {
  id: "p-oa-1001",
  name: "John Doe",
  age: 62,
  sex: "Male",
  joint: "Right knee",
  severity: "Moderate",
  diagnoses: ["Osteoarthritis", "Hypertension"],
  allergies: ["Penicillin"],
  meds: ["Amlodipine", "Ibuprofen (occasional)"],
  symptoms: {
    pain: 7,
    stiffnessMinutes: 20,
    walkingLimit: "Pain worsens after more than 10 minutes of walking",
    swelling: "Mild",
  },
  vitals: { BP: "146/88", BMI: 31.4 },
  labs: { eGFR: 68, Creatinine: 1.0 },
};

function generateRecommendations(patient) {
  const recs = [];

  recs.push({
    id: "education-exercise",
    title: "Prioritize exercise and joint-protection education",
    priority: "high",
    category: "Non-pharmacologic",
    summary: "First-line OA care should start with exercise, function training, and lifestyle support.",
    reasons: ["Pain is limiting activity", "Walking tolerance is reduced", "Primary care is ideal for conservative care"],
    actions: ["Provide joint-protection advice", "Recommend low-impact exercise and strengthening", "Schedule follow-up in 2-6 weeks"],
    evidence: ["History is consistent with osteoarthritis", "No acute red flags identified"],
  });

  if (patient.vitals.BMI >= 30) {
    recs.push({
      id: "weight-loss",
      title: "Add a weight-loss goal",
      priority: "high",
      category: "Lifestyle",
      summary: "Elevated BMI increases knee load; weight loss can reduce symptoms.",
      reasons: ["BMI is 31.4", "Knee joint load is increased"],
      actions: ["Set a measurable weight-loss target", "Combine nutrition and exercise support", "Review progress at the next visit"],
      evidence: ["Body weight is strongly linked to knee OA symptoms"],
    });
  }

  recs.push({
    id: "topical-nsaid",
    title: "Consider a topical NSAID first",
    priority: "medium",
    category: "Medication",
    summary: "When appropriate, topical NSAIDs are a good option for knee OA symptom control.",
    reasons: ["Localized joint pain", "Lower systemic adverse-effect burden"],
    actions: ["Confirm intact skin", "Explain how to use it consistently", "Monitor efficacy and local irritation"],
    evidence: ["Localized symptoms can often be managed with local therapy first"],
  });

  recs.push({
    id: "care-gap",
    title: "Close the care gap: function assessment and follow-up plan",
    priority: "medium",
    category: "Follow-up",
    summary: "Track pain, function, and day-to-day impact over time.",
    reasons: ["Symptoms are affecting walking", "Need to monitor for worsening function"],
    actions: ["Record pain score and activity limitations", "Set a follow-up reminder", "Consider physical therapy referral if needed"],
    evidence: ["Primary care should monitor function over time"],
  });

  recs.push({
    id: "referral-check",
    title: "Referral prompt: consider orthopedics if conservative care fails",
    priority: "low",
    category: "Referral",
    summary: "When symptoms continue to affect quality of life and non-surgical care is insufficient, consider specialist evaluation.",
    reasons: ["Pain continues to worsen", "Functional limitation becomes substantial"],
    actions: ["Document conservative treatment failure", "Explain referral timing", "Share prior tests and medication history"],
    evidence: ["Advanced OA management may require surgical assessment"],
  });

  if (patient.labs.eGFR < 60) {
    recs.push({
      id: "nsaid-risk",
      title: "Use oral NSAIDs with caution: renal and GI risk review needed",
      priority: "high",
      category: "Medication safety",
      summary: "If oral NSAIDs are considered, renal function, GI risk, and cardiovascular risk should be reviewed first.",
      reasons: ["Lower kidney function increases risk", "Oral NSAIDs can increase adverse effects"],
      actions: ["Confirm indication for oral NSAIDs", "Use the lowest effective dose if needed", "Consider gastroprotection when appropriate"],
      evidence: ["Kidney function requires careful review before oral NSAID use"],
    });
  }

  return recs;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "#0f172a",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: 24,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gap: 20,
  },
  hero: {
    background: "white",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 20,
  },
  stack: { display: "grid", gap: 20 },
  card: {
    background: "white",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  pillRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  pill: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    marginTop: 16,
  },
  stat: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 12,
  },
  statLabel: { fontSize: 12, color: "#64748b" },
  statValue: { marginTop: 4, fontSize: 16, fontWeight: 700 },
  title: { margin: 0, fontSize: 28, lineHeight: 1.2 },
  subtitle: { marginTop: 8, color: "#475569", maxWidth: 800 },
  sectionTitle: { margin: 0, fontSize: 18 },
  smallTitle: { margin: 0, fontSize: 15 },
  searchRow: { display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" },
  input: {
    width: "100%",
    maxWidth: 320,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    outline: "none",
  },
  filterRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 },
  button: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontSize: 14,
  },
  buttonActive: {
    background: "#0f172a",
    color: "white",
    borderColor: "#0f172a",
  },
  recList: { display: "grid", gap: 12, marginTop: 16 },
  recCard: {
    borderRadius: 20,
    padding: 16,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
  },
  recSelected: { outline: "2px solid #94a3b8" },
  recHeader: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  high: { background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3" },
  medium: { background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" },
  low: { background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1" },
  selectedBox: { background: "#f8fafc", borderRadius: 16, padding: 16, border: "1px solid #e2e8f0" },
  list: { margin: "8px 0 0", paddingLeft: 18, color: "#475569" },
  logItem: { border: "1px solid #e2e8f0", borderRadius: 16, background: "#fff", padding: 14, marginTop: 10 },
  textarea: {
    width: "100%",
    minHeight: 92,
    resize: "vertical",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    padding: 12,
    fontFamily: "inherit",
    fontSize: 14,
    outline: "none",
  },
  actionRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  accept: { background: "#0f172a", color: "white", border: "1px solid #0f172a" },
};

function Pill({ children }) {
  return <span style={styles.pill}>{children}</span>;
}

function RecPriority({ priority }) {
  return <span style={{ ...styles.badge, ...styles[priority] }}>{priority === "high" ? "High priority" : priority === "medium" ? "Medium priority" : "Low priority"}</span>;
}

function Stat({ label, value }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 style={styles.smallTitle}>{title}</h3>
      {children}
    </div>
  );
}

export default function OsteoarthritisCareSupportUI() {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("all");
  const [selectedId, setSelectedId] = useState("education-exercise");
  const [note, setNote] = useState("");
  const [decisionLog, setDecisionLog] = useState([]);

  const patient = mockPatient;
  const recommendations = useMemo(() => generateRecommendations(patient), []);

  const filtered = recommendations.filter((r) => {
    const text = `${r.title} ${r.summary} ${r.category} ${r.reasons.join(" ")} ${r.actions.join(" ")} ${r.evidence.join(" ")}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesFocus = focus === "all" ? true : r.category === focus;
    return matchesQuery && matchesFocus;
  });

  const selected = filtered.find((r) => r.id === selectedId) || filtered[0];

  const addDecision = (status) => {
    if (!selected) return;
    setDecisionLog((prev) => [
      {
        id: `${selected.id}-${Date.now()}`,
        title: selected.title,
        status,
        note,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
    setNote("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>Primary care osteoarthritis support</div>
              <h1 style={styles.title}>{patient.name}&apos;s Osteoarthritis Support Panel</h1>
              <p style={styles.subtitle}>
                This demo highlights symptom review, non-pharmacologic care, medication safety, follow-up, and referral in primary care.
              </p>
            </div>
            <div style={styles.statGrid}>
              <Stat label="Age" value={`${patient.age} years`} />
              <Stat label="Joint" value={patient.joint} />
              <Stat label="Pain" value={`${patient.symptoms.pain}/10`} />
              <Stat label="BMI" value={patient.vitals.BMI} />
            </div>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.stack}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Patient Summary</h2>
              <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Diagnoses</div>
                  <div style={styles.pillRow}>{patient.diagnoses.map((item) => <Pill key={item}>{item}</Pill>)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Allergies</div>
                  <div style={styles.pillRow}>{patient.allergies.map((item) => <Pill key={item}>{item}</Pill>)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Current medications</div>
                  <div style={styles.pillRow}>{patient.meds.map((item) => <Pill key={item}>{item}</Pill>)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Symptom summary</div>
                  <div style={styles.pillRow}>
                    <Pill>Morning stiffness {patient.symptoms.stiffnessMinutes} min</Pill>
                    <Pill>{patient.symptoms.walkingLimit}</Pill>
                    <Pill>Swelling: {patient.symptoms.swelling}</Pill>
                    <Pill>Severity: {patient.severity}</Pill>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.searchRow}>
                <h2 style={styles.sectionTitle}>System Recommendations</h2>
                <input
                  style={styles.input}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recommendations, reasons, or actions"
                />
              </div>

              <div style={styles.filterRow}>
                {[
                  ["all", "All"],
                  ["Non-pharmacologic", "Non-pharmacologic"],
                  ["Lifestyle", "Lifestyle"],
                  ["Medication", "Medication"],
                  ["Follow-up", "Follow-up"],
                  ["Referral", "Referral"],
                  ["Medication safety", "Medication safety"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    style={{ ...styles.button, ...(focus === key ? styles.buttonActive : null) }}
                    onClick={() => setFocus(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div style={styles.recList}>
                {filtered.length === 0 ? (
                  <div style={{ color: "#64748b", padding: 12, border: "1px dashed #cbd5e1", borderRadius: 16 }}>
                    No matching recommendations.
                  </div>
                ) : (
                  filtered.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => setSelectedId(rec.id)}
                      style={{
                        ...styles.recCard,
                        ...(selected?.id === rec.id ? styles.recSelected : null),
                        background: rec.priority === "high" ? "#fff1f2" : rec.priority === "medium" ? "#fffbeb" : "#ffffff",
                      }}
                    >
                      <div style={styles.recHeader}>
                        <div>
                          <div style={{ marginBottom: 8 }}>
                            <Pill>{rec.category}</Pill>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{rec.title}</div>
                          <div style={{ marginTop: 8, color: "#475569", fontSize: 14 }}>{rec.summary}</div>
                        </div>
                        <RecPriority priority={rec.priority} />
                      </div>
                      <div style={styles.pillRow}>
                        {rec.actions.slice(0, 2).map((a) => (
                          <Pill key={a}>{a}</Pill>
                        ))}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div style={styles.stack}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Selected Recommendation</h2>
              {selected ? (
                <div style={{ marginTop: 12, display: "grid", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 20 }}>{selected.title}</h3>
                      <p style={{ marginTop: 8, color: "#475569" }}>{selected.summary}</p>
                    </div>
                    <RecPriority priority={selected.priority} />
                  </div>

                  <div style={styles.selectedBox}>
                    <Section title="Triggers">
                      <ul style={styles.list}>{selected.reasons.map((item) => <li key={item}>{item}</li>)}</ul>
                    </Section>
                  </div>

                  <div style={styles.selectedBox}>
                    <Section title="Suggested actions">
                      <ul style={styles.list}>{selected.actions.map((item) => <li key={item}>{item}</li>)}</ul>
                    </Section>
                  </div>

                  <div style={styles.selectedBox}>
                    <Section title="Evidence / rules">
                      <ul style={styles.list}>{selected.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                    </Section>
                  </div>

                  <div style={styles.selectedBox}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>Doctor note</div>
                    <textarea
                      style={styles.textarea}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add an explanation, revision, or follow-up plan"
                    />
                    <div style={styles.actionRow}>
                      <button style={{ ...styles.button, ...styles.accept }} onClick={() => addDecision("accepted")}>
                        Accept
                      </button>
                      <button style={styles.button} onClick={() => addDecision("rejected")}>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 12, color: "#64748b" }}>No recommendation selected.</div>
              )}
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Decision Log</h2>
              {decisionLog.length === 0 ? (
                <div style={{ marginTop: 12, color: "#64748b" }}>No records yet.</div>
              ) : (
                decisionLog.map((item) => (
                  <div key={item.id} style={styles.logItem}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.title}</div>
                        <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{item.time}</div>
                      </div>
                      <Pill>{item.status === "accepted" ? "Accepted" : "Rejected"}</Pill>
                    </div>
                    {item.note ? <div style={{ marginTop: 10, color: "#475569", fontSize: 14 }}>{item.note}</div> : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
