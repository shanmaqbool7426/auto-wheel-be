const express = require("express");
const router = express.Router();
const { create, list, read, update, remove, reorder } = require("./controller");

router.post("/", create);
router.get("/", list);
router.get("/:slug", read);
router.put("/:slug", update);
router.delete("/:slug", remove);
router.post("/reorder", reorder);

module.exports = router;
