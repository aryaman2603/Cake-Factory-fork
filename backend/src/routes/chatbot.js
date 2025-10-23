import express from "express";
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

const router = express.Router();

const client = new LexRuntimeV2Client({ region: "ap-southeast-1" });

router.post("/", async (req, res) => {
  const { text, sessionId = "frontend-session" } = req.body;

  const command = new RecognizeTextCommand({
    botId: "1FFTDI1ZZD",
    botAliasId: "TSTALIASID",
    localeId: "en_US",
    sessionId,
    text,
  });

  try {
    const response = await client.send(command);
    res.json(response);
  } catch (err) {
    console.error("Lex error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
