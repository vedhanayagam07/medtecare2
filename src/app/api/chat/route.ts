import { NextResponse } from "next/server";

// Smart contextual responses for MedteCare Assistant
function getResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greet")) {
    return "Hello! 👋 I'm the **MedteCare Assistant**. I can help you understand risk assessments, SHAP explainability, device profiles, CatBoost ML, and more. What would you like to know?";
  }
  if (msg.includes("shap") || msg.includes("shapley") || msg.includes("explain")) {
    return "**SHAP (SHapley Additive exPlanations)** reveals which features contributed most to the ML model's risk prediction.\n\nFor example, a device with 1 prior recall gets a **+0.42 SHAP** contribution — meaning recalls are the dominant risk driver. Previous safety notices contribute +0.28 SHAP, years in service +0.15, and adverse events +0.10.";
  }
  if (msg.includes("risk") && (msg.includes("score") || msg.includes("assess") || msg.includes("calculat"))) {
    return "MedteCare computes risk scores (0–100) using a **CatBoost ML model** trained on 1,250 historical device records.\n\n- **0–39**: Low Risk ✅\n- **40–59**: Moderate Risk 🟡\n- **60–79**: High Risk 🟠\n- **80–100**: Critical Risk 🔴\n\nDevices scoring above 80 require **mandatory human review** by a Biomedical Engineer.";
  }
  if (msg.includes("catboost") || msg.includes("ml") || msg.includes("machine learning") || msg.includes("model")) {
    return "MedteCare's **CatBoost ML pipeline** is trained on 1,250 historical medical device records. It outputs a future-event probability score (0.0–1.0).\n\nModel confidence typically ranges from **87–96%**, and predictions are enriched via a **LangGraph RAG Agent** for contextual explanation.";
  }
  if (msg.includes("device") || msg.includes("equipment") || msg.includes("inventory")) {
    return "MedteCare monitors a fleet of clinical devices including:\n- 💉 **Infusion Pumps** (Class IIb)\n- 🧲 **MRI Systems** (Class IIb)\n- 🫁 **Ventilators** (Class III)\n- 💧 **Dialysis Machines** (Class IIb)\n\nEach device is profiled with risk class, service age, recall history, and a real-time ML risk score.";
  }
  if (msg.includes("human review") || msg.includes("biomedical") || msg.includes("engineer")) {
    return "Devices with a risk score **above 60** require human review by a Biomedical Engineer before any maintenance action.\n\nThis ensures AI-generated risk signals are validated by domain experts before clinical decisions are made. The review queue is accessible from the **Human Review** dashboard page.";
  }
  if (msg.includes("recall") || msg.includes("safety notice") || msg.includes("adverse")) {
    return "**Historical safety metrics** are key risk drivers:\n\n- **Previous Recalls**: Highest SHAP impact (+0.42 per recall)\n- **Safety Notices**: Second highest (+0.28 per notice)\n- **Adverse Events**: Contributes +0.10 per event\n- **Years in Service**: +0.033 per year\n\nDevices with a history of recalls are significantly more likely to have future safety events.";
  }
  if (msg.includes("maintenance") || msg.includes("ticket") || msg.includes("repair")) {
    return "MedteCare auto-generates **maintenance tickets** when devices exceed risk thresholds. Each ticket includes:\n\n- Priority level (Critical/High/Medium/Low)\n- Assigned biomedical technician\n- Recommended inspection steps\n- Estimated timeframe\n\nYou can view and manage tickets from the **Fleet Management** page.";
  }
  if (msg.includes("deploy") || msg.includes("render") || msg.includes("vercel") || msg.includes("host")) {
    return "MedteCare is deployed on **Render** with a Node.js/Next.js frontend. The Python ML backend (FastAPI + uvicorn) runs as a separate service.\n\nThe live site is accessible at `medtecare2.onrender.com`. Note: free-tier instances may spin down after inactivity, causing a brief delay on first load.";
  }
  if (msg.includes("langgraph") || msg.includes("rag") || msg.includes("agent")) {
    return "MedteCare uses a **LangGraph RAG Agent** for contextual diagnostic reasoning. It retrieves relevant historical safety records from a vector database using BGE + BM25 hybrid search.\n\nThis enriches the CatBoost prediction with evidence-backed explanations from the Medical Device Global Safety Database.";
  }
  if (msg.includes("thank") || msg.includes("thanks")) {
    return "You're welcome! 😊 Feel free to ask me anything else about MedteCare's risk intelligence platform.";
  }
  return "I'm the **MedteCare Assistant**, here to help with questions about:\n\n- 📊 Risk assessment & scoring\n- 🔍 SHAP explainability\n- 🏥 Device profiles & inventory\n- 🤖 CatBoost ML pipeline\n- 👨‍⚕️ Human review workflows\n\nCould you rephrase your question or pick a topic above?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = (messages as { role: string; content: string }[])
      ?.filter(m => m.role === "user")
      ?.slice(-1)[0]?.content ?? "";

    const reply = getResponse(lastUserMessage);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ reply: "Sorry, I encountered an error. Please try again." }, { status: 500 });
  }
}
