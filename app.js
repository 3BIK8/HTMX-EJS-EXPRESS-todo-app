const express = require("express");
const app = express();
const port = 3000;

let tasks = [
	{
		text: "Sample Task",
		completed: false,
		tags: ["work", "urgent"], // Array of tags
		duration: 30, // Duration in minutes
	},
];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route to render the main page
app.get("/", (req, res) => {
	res.render("index", { tasks });
});

// Add new task
app.post("/add-task", (req, res) => {
	const { task, tags, duration } = req.body;
	const newTask = {
		text: task,
		completed: false,
		tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array
		duration: parseInt(duration, 10) || 0, // Convert duration to an integer
	};

	tasks.push(newTask);
	res.render("partials/task-list", { tasks }); // Render updated task list
});

// Mark task as complete
app.post("/toggle-task", (req, res) => {
	const { index } = req.body;
	if (tasks[index]) {
		tasks[index].completed = !tasks[index].completed;
	}
	res.render("partials/task-list", { tasks });
});

// Delete a task
app.post("/delete-task", (req, res) => {
	const { index } = req.body;
	tasks.splice(index, 1);
	res.render("partials/task-list", { tasks });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
