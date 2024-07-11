"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const db_js_1 = __importDefault(require("./config/db.js"));
const errorMiddleware_js_1 = require("./middleware/errorMiddleware.js");
const restaurantsRoutes_js_1 = __importDefault(require("./routes/restaurantsRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const app = (0, express_1.default)();
//Security HTTP headers
const scriptSrcUrls = ["https://api.tiles.mapbox.com/", "https://api.mapbox.com/"];
const styleSrcUrls = ["https://api.mapbox.com/", "https://api.tiles.mapbox.com/", "https://fonts.googleapis.com/"];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://www.youtube.com/",
];
const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [],
            frameSrc: ["self", "https://www.youtube.com/"],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: ["'self'", "blob:", "data:"],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    },
}));
//Body parser
app.use(express_1.default.json({ limit: "10kb" }));
//Data sanitization
app.use((0, express_mongo_sanitize_1.default)());
//CORS
app.use((0, cors_1.default)({
    credentials: true,
}));
//COOKIES
app.use((0, cookie_parser_1.default)());
//Limit request
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: "Too many request",
    validate: {
        trustProxy: true,
    },
});
app.use(limiter);
//DB connection
(0, db_js_1.default)();
//App routes
app.use("/api/restaurants", restaurantsRoutes_js_1.default);
app.use("/api/admin", userRoutes_js_1.default);
//Error middleware
app.use(errorMiddleware_js_1.errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`);
});
