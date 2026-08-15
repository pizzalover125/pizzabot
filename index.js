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
/pizzabot-joke - Get a random joke
/pizzabot-toppings - List popular pizza toppings
/pizzabot-fact - Get a random pizza fact
`,
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

// toppings command
app.command("/pizzabot-toppings", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Popular Pizza Toppings:
- Pepperoni
- Sausage
- Mushrooms
- Onions
- Bell Peppers
- Olives
- Pineapple
- Bacon
- Ham
- Chicken
- Spinach
- Tomatoes
- Garlic
- Anchovies
- Jalapeños
- Basil
- Fresh Mozzarella
- Feta Cheese
- Ricotta`,
  });
});

app.command("/pizzabot-fact", async ({ ack, respond }) => {
  await ack();

  const facts = [
    "Pizza originated in Naples, Italy, in the 18th century.",
    "Margherita pizza was named after Queen Margherita of Italy.",
    "The world's largest pizza measured over 13,000 square feet.",
    "Americans eat billions of pizzas each year.",
    "Mozzarella is the most popular cheese used on pizza.",
    "The word 'pizza' has uncertain origins, possibly from Greek or Hebrew.",
    "Pepperoni is the most popular pizza topping in America.",
    "In Naples, traditional pizza must be made with specific ingredients to be authentic.",
    "The pizza emoji 🍕 is one of the most used emojis worldwide.",
    "Pizza is consumed in over 350 different variations globally.",
    "It takes about 3 minutes to cook a traditional Neapolitan pizza.",
    "The tomato wasn't added to pizza until the 18th century.",
    "Basil on pizza represents the Italian flag colors.",
    "Pizza hut was founded in 1958 in Wichita, Kansas.",
    "Domino's Pizza is the largest pizza delivery company worldwide.",
    "Americans spend over $145 billion on pizza annually.",
    "The average American eats about 350 slices of pizza per year.",
    "Pizza comes in over 100 different toppings varieties.",
    "The world's most expensive pizza costs over $12,000.",
    "Frozen pizza was first mass-produced in 1957.",
    "A typical pizza takes 2-3 hours to make from scratch.",
    "The first pizza restaurant opened in Naples in 1738.",
    "Mozzarella cheese melts at a lower temperature than other cheeses.",
    "Fresh basil should be added to pizza after cooking to preserve flavor.",
    "Pizza boxes are designed with air holes for ventilation.",
    "The largest pizza chain operates in over 190 countries.",
    "Thin crust pizza became popular in New York in the early 1900s.",
    "Chicago deep-dish pizza is actually a casserole, not a pizza.",
    "Pineapple on pizza is controversial due to its sweetness.",
    "Anchovies have been a pizza topping since the medieval times.",
    "A pizza's crust contains three main ingredients: flour, water, and yeast.",
    "Sourdough is the oldest form of pizza dough.",
    "Pizza dough needs to rise for at least 8-24 hours for best flavor.",
    "The average pizza contains about 250-300 calories per slice.",
    "Oregano is the most common seasoning on pizza after salt.",
    "Pizza was once considered food for the poor in Naples.",
    "Mozzarella was originally made from buffalo milk.",
    "A wood-fired oven can reach temperatures over 900°F.",
    "The first pizzeria in America opened in New York in 1905.",
    "Pizza is considered a complete meal with carbs, protein, and vegetables.",
    "Ricotta cheese is used in some specialty pizzas for creaminess.",
    "Garlic on pizza was historically considered medicinal.",
    "The perfect pizza ratio is often 1:3 sauce to cheese.",
    "Italy consumes over 5 million pizzas per week.",
    "Pizza night generates about 500 million searches annually.",
    "Fresh mozzarella should be added to pizza after cooking.",
    "Pizza is the most ordered food in the United States.",
    "A typical pizza serves 2-4 people depending on size.",
    "The oldest known pizza recipe was documented in 1652.",
    "Pizza dough can be frozen for up to 3 months.",
    "Cooking pizza upside down creates a crispier crust.",
  ];

  const fact = facts[Math.floor(Math.random() * facts.length)];
  await respond({ text: `🍕 Pizza Fact: ${fact}` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
