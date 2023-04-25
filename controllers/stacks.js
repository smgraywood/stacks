const Stack = require("../models/stack");

function newStack(req, res) {
	res.render("stacks/new", { title: "Enter a New Stack" });
}

async function create(req, res) {
	try {
		// delete empty fields from req.body
		await Stack.create(req.body);
		res.redirect("/stacks");
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function index(req, res) {
	try {
		const stacks = await Stack.find();
		res.render("stacks/index", { stacks: stacks, title: "All Stacks" });
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function show(req, res) {
	try {
		const foundStack = await Stack.findById(req.params.id);
		res.render("stacks/show", {
			stacks: foundStack,
			title: "See Stack Details",
		});
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

module.exports = {
	new: newStack,
	create,
	index,
	show,
};
