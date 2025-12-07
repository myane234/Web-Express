import { Router } from "express";
import { AskAI } from "../handlers/AIHandlers.js";

const router = Router();

router.post('/ask', async (req, res) => {
    const { question } = req.body;
    try {

        console.log("BODY MASUK:", req.body);

    if (!question) {
        return res.status(400).json({ error: "question kosong" });
    }
        const jawaban = await AskAI(question);
        res.json({ answer: jawaban });
    } catch (err) {
        res.status(500).json({ error: 'Error dari AI' });
    }
})


export default router;