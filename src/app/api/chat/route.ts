import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = "You are an intelligent AI assistant for MedteCare, a premium clinical device risk intelligence platform. Be helpful, concise, and highly professional. Answer any questions the user has about the platform, medical devices, or risk assessments.";

// Fallback responses for when API key is not configured
function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes("risk") || msg.includes("assessment")) {
    return "MedteCare uses a **CatBoost ML model** to compute risk scores (0–100) for each medical device. Key SHAP drivers include previous recalls, safety notices, years in service, and adverse events. Devices scoring above 80 are flagged as **Critical Risk** and require mandatory human review.";
  }
  if (msg.includes("shap") || msg.includes("explain")) {
    return "**SHAP (SHapley Additive exPlanations)** reveals which features contributed most to the ML model's risk prediction. For example, a device with 1 prior recall gets a +0.42 SHAP contribution — meaning recalls are the dominant risk driver for that device.";
  }
  if (msg.includes("device") || msg.includes("equipment")) {
    return "MedteCare monitors a fleet of clinical devices including infusion pumps, MRI systems, ventilators, and dialysis machines. Each device is profiled with risk class (Class IIb, Class III, etc.), service age, recall history, and a real-time ML risk score.";
  }
  if (msg.includes("catboost") || msg.includes("model") || msg.includes("ml")) {
    return "MedteCare's **CatBoost ML pipeline** is trained on 1,250 historical medical device records. It outputs a future-event probability score. The model confidence typically ranges from 87–96%, and predictions are enriched via a **LangGraph RAG Agent** for contextual explanation.";
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! I'm the **MedteCare Assistant**. I can help you understand risk assessments, SHAP explainability, device profiles, and more. What would you like to know?";
  }
  if (msg.includes("human review") || msg.includes("review")) {
    return "Devices with a risk score above 60 require **human review** by a Biomedical Engineer before any maintenance or service action is taken. This ensures AI-generated risk signals are validated by domain experts before clinical decisions are made.";
  }
  return "I'm the **MedteCare Assistant**, here to help with questions about medical device risk intelligence, ML assessments, and platform features. Could you rephrase your question or ask about a specific device, risk score, or feature?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages?.findLast((m: { role: string; content: string }) => m.role === "user")?.content || "";

    // Try Groq API if key is available
    if (process.env.GROQ_API_KEY) {
      const result = streamText({
        model: groq('llama3-8b-8192'),
        system: SYSTEM_PROMPT,
        messages,
      });
      return result.toUIMessageStreamResponse();
    }

    // Fallback: return a contextual rule-based response as a stream
    const fallbackText = getFallbackResponse(lastUserMessage);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by sending the response in one chunk formatted as SSE
        const words = fallbackText.split(" ");
        let i = 0;
        const interval = setInterval(() => {
          if (i < words.length) {
            const chunk = (i === 0 ? words[i] : " " + words[i]);
            controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
            i++;
          } else {
            controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
            controller.close();
            clearInterval(interval);
          }
        }, 30);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
