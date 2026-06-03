const { nanoid } = require("nanoid");
const Snippet = require("../models/snippet.model");
const {
    SNIPPET_EXPIRY_MIN,
    SNIPPET_EXPIRY_MAX,
    SNIPPET_EXPIRY_DEFAULT,
    SNIPPET_ID_LENGTH,
} = require("../config/constants");

// Create a new snippet
const createSnippet = async (req, res) => {
    try {
        const { title, content, language, expiryMinutes } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        const minutes = Math.min(
            Math.max(parseInt(expiryMinutes) || SNIPPET_EXPIRY_DEFAULT, SNIPPET_EXPIRY_MIN),
            SNIPPET_EXPIRY_MAX
        );
        const expiresAt = new Date(Date.now() + minutes * 60 * 1000);

        const snippetId = nanoid(SNIPPET_ID_LENGTH);

        const snippet = await Snippet.create({
            snippetId,
            title: title.trim(),
            content,
            language: language || "text",
            expiresAt,
        });

        res.status(201).json({
            success: true,
            data: {
                snippetId: snippet.snippetId,
                title: snippet.title,
                language: snippet.language,
                expiresAt: snippet.expiresAt,
                shareUrl: `/snippet/${snippet.snippetId}`,
            },
        });
    } catch (error) {
        console.log("Error creating snippet:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create snippet",
        });
    }
};

// Fetch a snippet by ID
const getSnippet = async (req, res) => {
    try {
        const snippet = await Snippet.findOne({ snippetId: req.params.id });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "This snippet has expired or does not exist",
            });
        }

        res.json({
            success: true,
            data: {
                snippetId: snippet.snippetId,
                title: snippet.title,
                content: snippet.content,
                language: snippet.language,
                expiresAt: snippet.expiresAt,
                createdAt: snippet.createdAt,
            },
        });
    } catch (error) {
        console.log("Error fetching snippet:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch snippet",
        });
    }
};

// Fetch raw content of a snippet
const getRawSnippet = async (req, res) => {
    try {
        const snippet = await Snippet.findOne({ snippetId: req.params.id });

        if (!snippet) {
            return res
                .status(404)
                .send("This snippet has expired or does not exist");
        }

        res.set("Content-Type", "text/plain");
        res.send(snippet.content);
    } catch (error) {
        console.log("Error fetching raw snippet:", error.message);
        res.status(500).send("Failed to fetch snippet");
    }
};

module.exports = {
    createSnippet,
    getSnippet,
    getRawSnippet,
};
