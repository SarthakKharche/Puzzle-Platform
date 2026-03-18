import fs from "node:fs";
import path from "node:path";

/**
 * Parse QUESTIONS.md file and extract questions with answers
 * Format: 
 * 1. Question text...
 *    **Answer:** answer_text
 */
export function parseQuestionsFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const questions = [];

  let currentQuestion = null;
  let currentNumber = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    // Match question number and text: "1. Question text"
    const questionMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (questionMatch) {
      if (currentQuestion && currentQuestion.text) {
        questions.push(currentQuestion);
      }
      currentNumber = parseInt(questionMatch[1], 10);
      currentQuestion = {
        number: currentNumber,
        text: questionMatch[2],
        answer: null
      };
      continue;
    }

    // Match answer: "**Answer:** answer_text"
    const answerMatch = trimmed.match(/^\*\*Answer:\*\*\s*(.+)$/i);
    if (answerMatch && currentQuestion) {
      currentQuestion.answer = answerMatch[1].trim();
      continue;
    }
  }

  // Add last question if exists
  if (currentQuestion && currentQuestion.text) {
    questions.push(currentQuestion);
  }

  return questions.filter((q) => q.text && q.answer);
}

/**
 * Create puzzle objects from parsed questions
 * Each question becomes a text-mode puzzle with trivia-style validation
 */
export function createPuzzlesFromQuestions(questions, options = {}) {
  const basePoints = options.basePoints || 100;
  const timeLimit = options.timeLimit || 300;

  return questions.map((q, idx) => ({
    puzzle_id: `TRIVIA_${(idx + 1).toString().padStart(3, "0")}`,
    puzzle_text: q.text,
    correct_answer: q.answer,
    submission_mode: "text",
    validation_mode: "content",
    expected_file_name: null,
    time_limit_sec: timeLimit,
    points: basePoints,
    asset_files: [],
    source_folder: null,
    source_root: null
  }));
}

export function getQuestionsFilePath(puzzleBankDir) {
  return path.join(puzzleBankDir, "QUESTIONS.md");
}

/**
 * Load questions from QUESTIONS.md in puzzle bank
 * This replaces the trivia puzzles from the database
 */
export function loadQuestionsAsPuzzles(puzzleBankDir, options = {}) {
  const questionsFile = getQuestionsFilePath(puzzleBankDir);
  const parsed = parseQuestionsFile(questionsFile);
  return createPuzzlesFromQuestions(parsed, options);
}
