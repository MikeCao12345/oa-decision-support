import React, { useMemo, useState } from "react";

const conditions = ["Osteoarthritis", "Migraine", "Pneumonia"];

const patientData = {
  Osteoarthritis: {
    name: "John Doe",
    age: 62,
    sex: "Male",
    condition: "Osteoarthritis",
    summary: "Chronic knee pain with reduced walking tolerance.",
    keyMetric: "Pain 7/10",
    details: {
      bp: "146/88",
      bmi: 31.4,
      extra: "Right knee OA, mild swelling, morning stiffness 20 min",
    },
  },
  Migraine: {
    name: "Jane Lee",
    age: 34,
    sex: "Female",
    condition: "Migraine",
    summary: "Recurrent unilateral headache with photophobia.",
    keyMetric: "Headache 8/10",
    details: {
      bp: "118/74",
      bmi: 23.6,
      extra: "Nausea + light sensitivity, 3 episodes this month",
    },
  },
  Pneumonia: {
    name: "Michael Chen",
    age: 71,
    sex: "Male",
    condition: "Pneumonia",
    summary: "Fever, cough, and shortness of breath.",
    keyMetric: "Temp 38.6°C",
    details: {
      bp: "124/76",
      bmi: 27.1,
      extra: "Productive cough, mild tachypnea, outpatient evaluation",
    },
  },
};

function getFocus(condition) {
  if (condition === "Osteoarthritis") {
    return [
      "🔴 Pain uncontrolled → prioritize exercise and symptom control",
      "🟡 BMI elevated → consider weight management",
      "🔵 Follow-up needed",
    ];
  }

  if (condition === "Migraine") {
    return [
      "🔴 Frequent headaches → review triggers and acute treatment",
      "🟡 Track medication overuse risk",
      "🔵 Follow-up needed",
    ];
  }

  return [
    "🔴 Assess severity and red flags",
    "🟡 Consider antibiotic need and escalation",
    "🔵 Recheck symptoms soon",
  ];
}

function getRecommendations(condition) {
  if (condition === "Osteoarthritis") {
    return [
      {
        id: "1",
        title: "Exercise and joint protection",
        detail: "First-line management for chronic OA symptoms.",
        reason: "Reduces pain and improves function.",
      },
      {
        id: "2",
        title: "Weight management",
        detail: "Lower knee load and symptom burden.",
        reason: "BMI is elevated.",
      },
      {
        id: "3",
        title: "Topical NSAID",
        detail: "Consider local pain relief first.",
        reason: "Can help reduce pain with lower systemic risk.",
      },
    ];
  }

  if (condition === "Migraine") {
    return [
      {
        id: "1",
        title: "Identify triggers",
        detail: "Review sleep, stress, dehydration, and food triggers.",
        reason: "Migraine often has avoidable triggers.",
      },
      {
        id: "2",
        title: "Acute treatment option",
        detail: "Consider an appropriate acute therapy plan.",
        reason: "Headaches are recurrent and severe.",
      },
      {
        id: "3",
        title: "Follow-up planning",
        detail: "Track frequency and response to treatment.",
        reason: "Need to monitor control and medication use.",
      },
    ];
  }

  return [
    {
      id: "1",
      title: "Assess severity",
      detail: "Check for respiratory distress, oxygen need, and red flags.",
      reason: "Pneumonia may require escalation.",
    },
    {
      id: "2",
      title: "Consider antibiotic therapy",
      detail: "Review whether antibiotics are appropriate.",
      reason: "Suspected bacterial infection.",
    },
    {
      id: "3",
      title: "Escalation / referral",
      detail: "Consider ED or specialist evaluation if severe.",
      reason: "Older patient with fever and shortness of breath.",
    },
  ];
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "#0f172a",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  input: {
    width: "100%",
    maxWidth: 320,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    outline: "none",
  },
  searchRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  filterRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 },
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
  recHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "start",
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  high: { background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3" },
  medium: {
    background: "#fffbeb",
    color: "#b45309",
    border: "1px solid #fde68a",
  },
  low: { background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1" },
  selectedBox: {
    background: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    border: "1px solid #e2e8f0",
  },
  list: { margin: "8px 0 0", paddingLeft: 18, color: "#475569" },
  logItem: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    background: "#fff",
    padding: 14,
    marginTop: 10,
  },
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
  return <span style={styles.badge}>{children}</span>;
}

function RecPriority({ priority }) {
  const label =
    priority === "high"
      ? "High priority"
      : priority === "medium"
      ? "Medium priority"
      : "Low priority";

  return (
    <span style={{ ...styles.badge, ...styles[priority] }}>
      {label}
    </span>
  );
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

export default function App() {
  const [condition, setCondition] = useState("Osteoarthritis");
  const [selected, setSelected] = useState(null);
  const [log, setLog] = useState([]);
  const [note, setNote] = useState("");

  const patient = patientData[condition];
  const focus = getFocus(condition);
  const recs = useMemo(() => getRecommendations(condition), [condition]);

  const addLog = (status) => {
    if (!selected) return;
    setLog((prev) => [
      {
        text: selected.title,
        status,
        time: new Date().toLocaleTimeString(),
        note,
      },
      ...prev,
    ]);
    setNote("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
                Primary Care Decision Support System
              </div>
              <h1 style={styles.title}>Treatment Decision Interface</h1>
              <p style={styles.subtitle}>
                Supports multiple conditions: osteoarthritis, migraine, and pneumonia.
              </p>
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {conditions.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCondition(c);
                      setSelected(null);
                      setNote("");
                    }}
                    style={{
                      ...styles.button,
                      ...(c === condition ? styles.buttonActive : null),
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 12, color: "#475569" }}>
                <strong>Condition:</strong> {condition}
              </p>
            </div>

            <div style={styles.statGrid}>
              <Stat label="Age" value={`${patient.age} years`} />
              <Stat label="Sex" value={patient.sex} />
              <Stat label="BP" value={patient.details.bp} />
              <Stat label="Key" value={patient.keyMetric} />
            </div>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.stack}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Patient Summary</h2>
              <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Summary</div>
                  <div style={{ color: "#475569" }}>{patient.summary}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Details</div>
                  <div style={{ color: "#475569" }}>{patient.details.extra}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Condition</div>
                  <div style={styles.pillRow}>
                    <Pill>{patient.condition}</Pill>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Key metric</div>
                  <div style={styles.pillRow}>
                    <Pill>{patient.keyMetric}</Pill>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.searchRow}>
                <h2 style={styles.sectionTitle}>System Recommendations</h2>
              </div>

              <div style={styles.filterRow}>
                {["all", ...new Set(recs.map((r) => r.title.includes("follow") ? "Follow-up" : r.reason.includes("BMI") ? "Lifestyle" : r.reason.includes("antibiotic") ? "Medication" : "General"))].length > 0 && null}
                {["all", "General", "Lifestyle", "Medication", "Follow-up"].map((opt) => (
                  <button
                    key={opt}
                    style={{
                      ...styles.button,
                      ...(opt === "all" ? styles.button : null),
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div style={styles.recList}>
                {recs.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r)}
                    style={{
                      ...styles.recCard,
                      ...(selected?.id === r.id ? styles.recSelected : null),
                      background:
                        selected?.id === r.id
                          ? "#eef2ff"
                          : r.id === "1"
                          ? "#ffffff"
                          : "#fff",
                    }}
                  >
                    <div style={styles.recHeader}>
                      <div>
                        <div style={{ marginBottom: 8 }}>
                          <Pill>{r.id === "1" ? "Primary" : "Support"}</Pill>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{r.title}</div>
                        <div style={{ marginTop: 8, color: "#475569", fontSize: 14 }}>
                          {r.detail}
                        </div>
                      </div>
                      <RecPriority priority={condition === "Pneumonia" ? "high" : r.id === "1" ? "high" : "medium"} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.stack}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Today&apos;s Focus</h2>
              <div style={{ marginTop: 12 }}>
                {focus.map((f) => (
                  <div key={f} style={{ marginBottom: 8, color: "#475569" }}>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Selected Recommendation</h2>
              {selected ? (
                <div style={{ marginTop: 12, display: "grid", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 20 }}>{selected.title}</h3>
                      <p style={{ marginTop: 8, color: "#475569" }}>{selected.detail}</p>
                    </div>
                    <RecPriority priority="high" />
                  </div>

                  <div style={styles.selectedBox}>
                    <Section title="Reason">
                      <div style={{ color: "#475569", marginTop: 8 }}>{selected.reason}</div>
                    </Section>
                  </div>

                  <div style={styles.selectedBox}>
                    <Section title="Doctor note">
                      <textarea
                        style={styles.textarea}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add an explanation, revision, or follow-up plan"
                      />
                      <div style={styles.actionRow}>
                        <button style={{ ...styles.button, ...styles.accept }} onClick={() => addLog("Accepted")}>
                          Accept
                        </button>
                        <button style={styles.button} onClick={() => addLog("Rejected")}>
                          Reject
                        </button>
                      </div>
                    </Section>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 12, color: "#64748b" }}>Select a recommendation to see details.</div>
              )}
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Decision Log</h2>
              {log.length === 0 ? (
                <div style={{ marginTop: 12, color: "#64748b" }}>No records yet.</div>
              ) : (
                log.map((item, idx) => (
                  <div key={idx} style={styles.logItem}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.text}</div>
                        <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{item.time}</div>
                      </div>
                      <Pill>{item.status}</Pill>
                    </div>
                    {item.note ? (
                      <div style={{ marginTop: 10, color: "#475569", fontSize: 14 }}>
                        {item.note}
                      </div>
                    ) : null}
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