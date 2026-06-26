export const generateQuizFromAI = async ({ notes, videoTitle }) => {
  const prompt = `
You are an expert teacher.

Generate a quiz from the following learning content. The quiz must be directly based on the notes when notes are available. If notes are empty, generate the quiz from the video title.

RULES:
- 5 MCQ questions
- 4 options each
- only one correct answer
- use the notes as the primary source when they are available
- if notes are empty, use the video title as the source
- return ONLY valid JSON
- no markdown
- no explanation text

VIDEO TITLE:
${videoTitle}

NOTES:
${notes}

OUTPUT FORMAT:
{
  "quizTitle": "string",
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "string"
    }
  ]
}
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
