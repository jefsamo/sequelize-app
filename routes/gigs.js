const express = require("express");
const db = require("../config/database");
const Gig = require("../models/Gig");
const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;

const router = express.Router();

router.get("/", async (req, res) => {
  const gigs = await Gig.findAll();
  console.log(gigs);
  res.render("gigs", {
    gigs,
  });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", async (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = [];

  if (!title) {
    errors.push({ text: "Please add a title!" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies!" });
  }
  if (!description) {
    errors.push({ text: "Please add a description!" });
  }
  //   if (!budget) {
  //     errors.push({ text: "Please add a budget!" });
  //   }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email!" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    // to insert table

    try {
      if (!budget) {
        budget = "Unknown";
      } else {
        budget = `$${budget}`;
      }

      technologies = technologies.toLowerCase().replace(/, /g, ",");
      const newGig = await Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email,
      });

      console.log(newGig);

      res.redirect("/gigs");
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/search", async (req, res) => {
  try {
    const { term } = req.query;
    const gigs = await Gig.findAll({
      where: { technologies: { [Op.like]: "%" + term + "%" } },
    });

    res.render("gigs", {
      gigs,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
