// Create express server
const sqlite3 = require('sqlite3');
const express = require('express');
const server = express();
server.use(express.json());

//Start server
server.listen(3000, () => console.log("Running on port 3000"));

// Init DB
const db = new sqlite3.Database('./src/db/films.sqlite', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run(`CREATE TABLE movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            year INTEGER
        )`, (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO movies (title, year) VALUES (?, ?)';
            db.run(insert, ["Iron Man", 2008]);
            db.run(insert, ["Thor", 2011]);
            db.run(insert, ["Avengers: Infinity War", 2018]);
        });

        db.run(`CREATE TABLE spectators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            last_name TEXT
        )`, (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO spectators (name, last_name) VALUES (?, ?)';
            db.run(insert, ["Clark", "Kant"]);
            db.run(insert, ["Jose", "Oliveira"]);
            db.run(insert, ["Jane", "Fonda"]);
        });

        db.run(`CREATE TABLE views (
            id INTEGER PRIMARY KEY,
            id_movies INTEGER,
            id_spectators INTEGER
        )`, (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO views (id_movies, id_spectators) VALUES (?, ?)';
            db.run(insert, [1, 2]);
            db.run(insert, [1, 3]);
            db.run(insert, [2, 1]);
            db.run(insert, [3, 1]);
        });
    }
});

//Get movies
server.get("/movies", (req, res, next) => {
    db.all("SELECT * FROM movies", [], (err, movies) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ movies });
    });
});

//Get movie
server.get("/movies/:id", (req, res, next) => {
    db.get(`SELECT * FROM movies WHERE id = ?`, [req.params.id], (err, movie) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ movie });
    });
});

// Post Movie
server.post("/movies/", (req, res, next) => {
    const { title, year } = req.body;
    db.run(`INSERT INTO movies (title, year) VALUES (?, ?)`,
        [title, year],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "title": title,
                "year": year,
                "id": this.lastID
            })
        });
});

//Get spectators
server.get("/spectators", (req, res, next) => {
    db.all("SELECT * FROM spectators", [], (err, spectators) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ spectators });
    });
});

//Get spectator
server.get("/spectator/:id", (req, res, next) => {
    db.get(`SELECT * FROM spectators WHERE id = ?`, [req.params.id], (err, spectator) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ spectator });
    });
});

// Post Spectator
server.post("/spectators/", (req, res, next) => {
    const { name, last_name } = req.body;
    db.run(`INSERT INTO spectators (name, last_name) VALUES (?, ?)`,
        [name, last_name],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "name": name,
                "last_name": last_name,
                "id": this.lastID
            })
        });
});

// Spectator view a movie
server.post("/view/", (req, res, next) => {
    const { id_spectators, id_movies } = req.body;
    db.run(`INSERT INTO views (id_spectators, id_movies) VALUES (?, ?)`,
        [id_spectators, id_movies],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "id": this.lastID
            })
        });
});


//Get Views Movies and Spectators
server.get("/views", (req, res, next) => {
    db.all("SELECT * FROM views INNER JOIN movies ON views.id_movies = movies.id INNER JOIN spectators ON views.id_spectators = spectators.id",
        [], (err, views) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({ views });
        });
});

//Get Spectator x Movies
server.get("/views_spectator/:id", (req, res, next) => {
    db.all(`SELECT * FROM views INNER JOIN movies ON views.id_movies = movies.id INNER JOIN spectators ON views.id_spectators = spectators.id WHERE id_spectators = ?`, [req.params.id], (err, spectator) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ spectator });
    });
});

//Get Movies x Spectator
server.get("/views_movies/:id", (req, res, next) => {
    db.all(`SELECT * FROM views INNER JOIN spectators ON views.id_spectators = spectators.id INNER JOIN movies ON views.id_movies = movies.id WHERE id_movies = ?`, [req.params.id], (err, spectator) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ spectator });
    });
});


// Root endpoint
server.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

