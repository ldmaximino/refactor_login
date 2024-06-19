//Third party imports
import express from "express";
import "dotenv/config";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

//Local imports
import products_router from "./routes/product_router.js";
import carts_router from "./routes/cart_router.js";
import users_router from "./routes/user_router.js";
import views_router from "./routes/views_router.js";
import { errorHandler } from "./middlewares/error_handler.js";
import { __dirname } from "./utils.js";
import { initMongoDB } from "./daos/mongodb/connection.js";
import { initSocketServer } from "./socket_server.js";
import passport from 'passport';
import './passport/local_strategy.js';
import './passport/github_strategy.js';


//PORT definition
const PORT = process.env.PORT || 5003;

//Store Config definition
const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.URI_MONGODB,
    crypto: { secret: process.env.SECRET_KEY },
    ttl: 180,
    autoRemove: "interval",
    autoRemoveInterval: 5, //delete expired sessions in mongodb every 5 minutes
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};

//app express
const app = express();

//Middlewares
app.use(express.static(__dirname + "/public"));
app.use('/cart', express.static(__dirname + '/public')); // I had to add this middleware so that the /cart/:cid path takes the css file. If you comment on this line you will see that the cart css does not work
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));


//Handlebars Engine Definition
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use("/api/products", products_router);
app.use("/api/carts", carts_router);
app.use("/users", users_router);
app.use("/", views_router);

//Manage Errors
app.use(errorHandler);

//Connect to MongoDB if PERSISTENCE = MONGODB
if (process.env.PERSISTENCE === "mongodb") initMongoDB();

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀🚀🚀🚀`);
});

// Initialize socket server
initSocketServer(httpServer);
