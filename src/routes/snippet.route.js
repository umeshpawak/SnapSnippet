const express = require("express");
const {
    createSnippet,
    getSnippet,
    getRawSnippet,
} = require("../controllers/snippet.controller");

const router = express.Router();

router.post("/", createSnippet);
router.get("/:id", getSnippet);
router.get("/:id/raw", getRawSnippet);

module.exports = router;
