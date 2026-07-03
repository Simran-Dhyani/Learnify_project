import { generateQuizFromAI } from "../services/groq.service.js";

export const generateQuiz = async (req, res) => {
  try {
    const { notes, videoTitle } = req.body;

    if (!notes?.trim() && !videoTitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Notes or video title are required to generate a quiz",
      });
    }

    const quiz = await generateQuizFromAI({
      notes: notes?.trim() || "",
      videoTitle: videoTitle?.trim() || "Untitled video",
    });

    res.json({
      success: true,
      quiz,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
