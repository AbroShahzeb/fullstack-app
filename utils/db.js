const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Add other fields as needed
});

const Article = mongoose.model("Article", articleSchema);

app.get("/post-article", async (req, res) => {
  const article = new Article({
    title: "Article title",
    content: "Article content",
  });
  await article.save();
  res.json({ message: "Article inserted" });
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("home", { articles: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Unable to fetch articles" });
  }
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
