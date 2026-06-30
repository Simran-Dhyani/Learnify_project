export const generateQuizFromAI = async ({ notes, videoTitle }) => {
  const prompt = `
You are an expert teacher.

Generate a quiz from the following learning content. The quiz must be directly based on the notes when notes are available. If notes are empty, generate the quiz from the video title.


RULES:
- Generate exactly 5 multiple-choice questions.
- Each question must have exactly 4 options.
- Each option must be the FULL option text.
- The "answer" field MUST contain the COMPLETE TEXT of the correct option.
- NEVER return "A", "B", "C", or "D" as the answer.
- The value of "answer" must exactly match one of the strings inside the "options" array.
- Use the notes as the primary source whenever notes are available.
- If notes are empty, generate the quiz from the video title.
- Return ONLY valid JSON.
- No markdown.
- No explanation text.

VIDEO TITLE:
${videoTitle}

NOTES:
${notes}

OUTPUT FORMAT:
{
  "quizTitle": "Introduction to React Quiz",
  "questions": [
    {
      "question": "What is React primarily used for?",
      "options": [
        "Building user interfaces",
        "Managing databases",
        "Creating operating systems",
        "Writing SQL queries"
      ],
      "answer": "Building user interfaces"
    }
  ]
}
IMPORTANT:
The "answer" value MUST be identical to one of the strings inside "options". Never return option letters like A, B, C, or D.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to generate quiz");
  }

  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("AI returned an empty quiz response");
  }

  const jsonText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(jsonText);
};
