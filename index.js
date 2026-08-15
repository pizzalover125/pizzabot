// require dotenv to have .env vars
require("dotenv").config();

// installs
const { App } = require("@slack/bolt");
const axios = require("axios");

// initalize the app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// define commands

// ping command
app.command("/pizzabot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `pizzaBot is alive!\nLatency: ${latency}ms` });
});

// help command
app.command("/pizzabot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/pizzabot-ping - Check bot latency
/pizzabot-help - Show available commands
/pizzabot-recipe - Get a basic pizza recipe
/pizzabot-ingredients - List ingredients for a basic pizza
/pizzabot-joke - Get a random joke`,
  });
});

// recipe command
app.command("/pizzabot-recipe", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Basic Pizza Recipe:
1. Preheat oven to 220°C (425°F).
2. Stretch 1 pizza dough ball into a round.
3. Spread 2-3 tbsp pizza sauce.
4. Add 1 1/2 cups shredded mozzarella.
5. Top with your favorite ingredients.
6. Bake for 10-15 minutes until crust is golden.
7. Finish with basil or chili flakes and enjoy!`,
  });
});

// ingredients command
app.command("/pizzabot-ingredients", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Ingredients for a Basic Pizza:
- 1 pizza dough ball
- 2-3 tbsp pizza sauce
- 1 1/2 cups shredded mozzarella
- Your favorite toppings`,
  });
});

// joke command
app.command("/pizzabot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://icanhazdadjoke.com/search", {
      headers: { Accept: "application/json" },
      params: { term: "pizza" },
    });

    const jokes = response.data.results || [];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    await respond({
      text: joke
        ? joke.joke
        : "No pizza jokes found right now. Try again later!",
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a pizza joke." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
