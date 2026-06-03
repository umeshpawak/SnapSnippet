const mongoose = require("mongoose");
const {
    SNIPPET_CONTENT_MAX_LENGTH,
    SNIPPET_TITLE_MAX_LENGTH,
} = require("../config/constants");

const snippetSchema = new mongoose.Schema(
    {
        snippetId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [
                SNIPPET_TITLE_MAX_LENGTH,
                `Title cannot exceed ${SNIPPET_TITLE_MAX_LENGTH} characters`,
            ],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            maxlength: [
                SNIPPET_CONTENT_MAX_LENGTH,
                `Content cannot exceed ${SNIPPET_CONTENT_MAX_LENGTH} characters`,
            ],
        },
        language: {
            type: String,
            default: "text",
            trim: true,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 15 * 60 * 1000),
            index: { expires: 0 },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Snippet", snippetSchema);
