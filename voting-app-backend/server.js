const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/votingApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Define Schema & Model
const pollSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ✅ Unique Poll ID
  question: { type: String, required: true },
  options: { type: [String], required: true },
  votes: { type: Map, of: Number, default: {} },
});

const Poll = mongoose.model("Poll", pollSchema);

// ✅ Create a Poll (POST)
app.post("/api/polls", async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options.length) {
      return res.status(400).json({ error: "❌ Question and options are required" });
    }

    const votes = options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {});
    const poll = new Poll({ question, options, votes });

    await poll.save();
    res.status(201).json({ pollId: poll._id, question, options, votes });
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// ✅ Get All Polls (GET)
app.get("/api/polls", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// ✅ Get Poll by ID (GET)
app.get("/api/polls/:pollId", async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);

    if (!poll) return res.status(404).json({ error: "❌ Poll not found" });

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// ✅ Vote on a Poll (POST)
app.post("/api/vote/:pollId", async (req, res) => {
  try {
    const { pollId } = req.params;
    const { option } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "❌ Poll not found" });

    if (!poll.options.includes(option)) {
      return res.status(400).json({ error: "❌ Invalid option" });
    }

    poll.votes.set(option, (poll.votes.get(option) || 0) + 1);
    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// ✅ Delete a Poll (DELETE)
app.delete("/api/polls/:pollId", async (req, res) => {
  try {
    const { pollId } = req.params;
    const deletedPoll = await Poll.findByIdAndDelete(pollId);

    if (!deletedPoll) return res.status(404).json({ error: "❌ Poll not found" });

    res.json({ message: "✅ Poll deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
