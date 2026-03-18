import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

function normalizeOutput(value) {
  return `${value || ""}`.replace(/\r\n/g, "\n").trim();
}

function getRunner(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();

  if (ext === ".py") {
    return {
      command: process.env.PYTHON_CMD || "python",
      args: [relativePath]
    };
  }

  if (ext === ".js") {
    return {
      command: "node",
      args: [relativePath]
    };
  }

  return null;
}

export function runProgram({ cwd, relativePath, timeoutMs = 12000 }) {
  const runner = getRunner(relativePath);
  if (!runner) {
    return {
      ok: false,
      reason: "unsupported_runtime"
    };
  }

  const result = spawnSync(runner.command, runner.args, {
    cwd,
    encoding: "utf8",
    timeout: timeoutMs,
    windowsHide: true
  });

  if (result.error) {
    return {
      ok: false,
      reason: "execution_error",
      error: result.error.message
    };
  }

  if (result.status !== 0) {
    return {
      ok: false,
      reason: "non_zero_exit",
      exit_code: result.status,
      stdout: normalizeOutput(result.stdout),
      stderr: normalizeOutput(result.stderr)
    };
  }

  return {
    ok: true,
    stdout: normalizeOutput(result.stdout),
    stderr: normalizeOutput(result.stderr)
  };
}

export function evaluateSubmissionOutput({
  sourceRoot,
  sourceFolder,
  expectedFileName,
  submittedFilename,
  submittedContent,
  expectedOutput
}) {
  const requiredFile = `${expectedFileName || ""}`.trim();
  const providedFile = `${submittedFilename || ""}`.trim();

  if (!requiredFile) {
    return {
      ok: false,
      message: "Puzzle missing expected file metadata."
    };
  }

  if (requiredFile.toLowerCase() !== providedFile.toLowerCase()) {
    return {
      ok: false,
      message: `Expected file '${requiredFile}', but received '${providedFile || "(empty)"}'.`
    };
  }

  const puzzleBase = path.resolve(sourceRoot, sourceFolder);
  if (!fs.existsSync(puzzleBase)) {
    return {
      ok: false,
      message: "Puzzle source folder is not available on server."
    };
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "puzzle-submission-"));

  try {
    fs.cpSync(puzzleBase, tempDir, { recursive: true });

    const target = path.resolve(tempDir, requiredFile);
    if (!target.startsWith(path.resolve(tempDir))) {
      return {
        ok: false,
        message: "Invalid expected file path in puzzle metadata."
      };
    }

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${submittedContent || ""}`, "utf8");

    const execution = runProgram({
      cwd: tempDir,
      relativePath: requiredFile
    });

    if (!execution.ok) {
      return {
        ok: false,
        message: `Execution failed (${execution.reason}).`,
        details: execution
      };
    }

    const actual = normalizeOutput(execution.stdout);
    const expected = normalizeOutput(expectedOutput);

    if (actual !== expected) {
      return {
        ok: false,
        message: "Output mismatch.",
        details: {
          expected_output: expected,
          actual_output: actual
        }
      };
    }

    return {
      ok: true,
      message: "Output verified successfully.",
      details: {
        output: actual
      }
    };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

export function executeSubmissionPreview({
  sourceRoot,
  sourceFolder,
  expectedFileName,
  submittedFilename,
  submittedContent
}) {
  const requiredFile = `${expectedFileName || ""}`.trim();
  const providedFile = `${submittedFilename || ""}`.trim();

  if (!requiredFile) {
    return {
      ok: false,
      message: "Puzzle missing expected file metadata."
    };
  }

  if (requiredFile.toLowerCase() !== providedFile.toLowerCase()) {
    return {
      ok: false,
      message: `Expected file '${requiredFile}', but received '${providedFile || "(empty)"}'.`
    };
  }

  const puzzleBase = path.resolve(sourceRoot, sourceFolder);
  if (!fs.existsSync(puzzleBase)) {
    return {
      ok: false,
      message: "Puzzle source folder is not available on server."
    };
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "puzzle-preview-"));

  try {
    fs.cpSync(puzzleBase, tempDir, { recursive: true });

    const target = path.resolve(tempDir, requiredFile);
    if (!target.startsWith(path.resolve(tempDir))) {
      return {
        ok: false,
        message: "Invalid expected file path in puzzle metadata."
      };
    }

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${submittedContent || ""}`, "utf8");

    const execution = runProgram({
      cwd: tempDir,
      relativePath: requiredFile
    });

    if (!execution.ok) {
      return {
        ok: false,
        message: `Execution failed (${execution.reason}).`,
        details: execution
      };
    }

    return {
      ok: true,
      message: "Code executed successfully.",
      details: {
        stdout: execution.stdout,
        stderr: execution.stderr
      }
    };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
