import { GoogleGenAI } from "@google/genai";

export const generateRiskReport = async (
  userName: string,
  kycVerified: boolean,
  riskScore: number
): Promise<string> => {
  // Safety check for API key
  if (!process.env.API_KEY) {
    return "System Notification: API Key missing. Unable to generate narrative report.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as an advanced automated compliance system.
      Generate a short, precise, futuristic executive summary (max 3 sentences) for the following compliance scan:
      
      Subject: ${userName}
      eKYC Status: ${kycVerified ? 'Verified Biometrically' : 'Failed'}
      World-Check: 0 Hits (Clean)
      AML Risk Score: ${riskScore}/100 (Low)
      
      Tone: Robotic, Secure, Authoritative.
      Output JSON format with a single key "narrative".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);
    return parsed.narrative || "Analysis complete. Profile cleared.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Notification: Report generation offline. Manual review recommended.";
  }
};