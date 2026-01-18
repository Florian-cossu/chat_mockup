import { NextRequest, NextResponse } from "next/server";
import { getRandomTheme } from "@/data/themes";

const GEMINI_MODEL = "gemini-3-flash-preview";
const LLM_API_KEY = process.env.LLM_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid or missing image file" },
        { status: 400 }
      );
    }

    const theme = getRandomTheme();
    const color1 = theme.color1;
    const color2 = theme.color2

    const NOW_ISO = new Date().toISOString();

    const PROMPT = `
    You are an OCR system specialized in chat conversation screenshots.

    The current date and time (UTC) is:
    ${NOW_ISO}

    From the provided image, return ONLY a valid JSON object,
    strictly matching the format below.
    Do NOT include explanations, markdown, or any text outside the JSON.

    # Expected format:

    {
      "contactName": string | null,
      "layout": "auto",
      "profilePicture": null,
      "color1": ${color1},
      "color2": ${color2},
      "conversation": [
        {
          "id": string,
          "direction": "in" | "out",
          "text": string,
          "timestamp": string | null,
          "repliesTo": string,
          "seen": boolean,
          "emoji": string
        }
      ],
      "showWatermark": true,
      "version": 1
    }

    # GENERAL RULES:
    - Output MUST be valid JSON only.
    - Use null if an information is not visible.
    - repliesTo must be an empty string ("") if the message is not a reply.
    - emoji must be an empty string ("") if no reaction is clearly visible.
    - All message IDs must be unique.
    - Timestamps must be in ISO 8601 UTC format: YYYY-MM-DDTHH:mm:ss.sssZ.

    # TIMESTAMP RULES:
    - If BOTH date and time are visible on a message, use them as-is.
    - If ONLY the time is visible on a message:
      - use (current date - 1 day)
      - combine with the detected time

    - Some chat applications display DATE SEPARATORS inside the conversation
      (e.g. "Today", "Yesterday", "Monday", "Jan 12", etc.).

      These date separators:
      - are NOT messages
      - must NOT appear in the conversation array
      - define the date to be used for the messages that FOLLOW them,
        until another date separator appears.

      When a date separator is visible:
      - apply its date to all subsequent messages
      - combine it with the message time if visible
      - if the time is not visible, infer a reasonable time
        that preserves chronological order

    - If NO date separator AND no time information are visible:
      - set timestamp to (current date - 1 day)
      - choose reasonable times that preserve message order

    Never invent a date or time that is not visually implied.

    # **REACTION (EMOJI) ATTRIBUTION RULES — VERY IMPORTANT**:
    - A reaction emoji belongs ONLY to the message it is visually attached to.
    - Attach an emoji to a message ONLY IF:
      - the emoji is directly below, above, or overlaid on that message bubble
      - AND clearly grouped with that bubble in the UI
    - NEVER attach a reaction to:
      - the closest message by text
      - the previous or next message by order
    - If multiple emojis react to the same message, include only the most visible one.
    - If there is ANY doubt about which message the emoji belongs to:
      - set "emoji" to an empty string ("") for ALL messages involved.

    # VISUAL CONSISTENCY RULES:
    - Preserve the visual top-to-bottom order of messages and assign their timestamps accordingly.
    - Do not merge separate messages into one.
    - Do not split a single bubble into multiple messages.

    # CHAT BUBBLE CONTENT RULES:
    - If a chat bubble contains ONLY a media attachment
      (image, video, animated image, or similar):
      - set the message text to "[MEDIA]"
    - If a chat bubble contains BOTH media AND readable text:
      - set the message text to:
        "[MEDIA]\n<readable text>"
    - **Never attempt to describe, interpret, or guess the media content**.
    - If a chat bubble is partially cut off but some text is clearly readable:
      - include ONLY the readable part
      - add "..." at the beginning or end where content is missing
    - If a chat bubble is fully unreadable:
      - omit the message entirely from the conversation array
    - Never guess or hallucinate unreadable or missing text.

    Return the JSON only.
    `;

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const geminiResponse = await fetch(
        `${GEMINI_ENDPOINT}?key=${LLM_API_KEY}`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            generationConfig: {
                response_mime_type: "application/json",
                temperature: 0,
            },
            contents: [
                {
                role: "user",
                parts: [
                    { text: PROMPT },
                    {
                    inline_data: {
                        mime_type: file.type,
                        data: base64Image,
                    },
                    },
                ],
                },
            ],
            }),
        }
        );


    if (!geminiResponse.ok) {
      const error = await geminiResponse.text();
      console.error(error);
      return NextResponse.json(
        { error: "Gemini API error", details: error },
        { status: 500 }
      );
    }

    const geminiData = await geminiResponse.json();

    const outputText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!outputText) {
      return NextResponse.json(
        { error: "Empty response from Gemini" },
        { status: 500 }
      );
    }

    try {
      const parsed = JSON.parse(outputText);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse LLM response", raw: outputText },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
