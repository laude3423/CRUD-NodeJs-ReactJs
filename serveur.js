import express, { json, response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const salt = 10;

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})
//livre
app.get("/livre", (req, res) => {
    const sql = "SELECT * FROM livre";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
});
app.get("/searchLivre/:search", (req, res) => {
    const sql = "SELECT * FROM livre WHERE titreLivre LIKE ?";
    const id = req.params.search;
    db.query(sql, ["%" + id + "%"], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
});

app.post("/insertLivre", (req, res) => {
    const sql = "INSERT INTO livre(`titreLivre`,`auteurLivre`,`editeurLivre`,`nombre`,`dateParution`) VALUES(?)";
    const values = [
        req.body.titreLivre,
        req.body.auteurLivre,
        req.body.editeurLivre,
        req.body.nombre,
        req.body.dateParution
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})
app.put('/updateLivre/:id', (req, res) => {
    const sql = "UPDATE livre SET `titreLivre`=?, `auteurLivre`=?,`editeurLivre`=?,`nombre`=?,`dateParution`=? WHERE idLivre=?";
    const id = req.params.id;
    db.query(sql, [req.body.titreLivre, req.body.auteurLivre, req.body.editeurLivre, req.body.nombre, req.body.dateParution, id], (err, result) => {
        if (err) return console.log(err);
        return res.json(result);
    })
})

app.delete('/deleteLivre/:id', (req, res) => {
    const sql = "DELETE FROM livre WHERE idLivre = ?";
    const id = req.params.id

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
//emprunteur
app.get("/emprunteur", (req, res) => {
    const sql = "SELECT * FROM emprunteur";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get("/searchEmprunteur/:search", (req, res) => {
    const sql = "SELECT * FROM emprunteur WHERE nomEmprunteur LIKE ?";
    const id = req.params.search;
    db.query(sql, ["%" + id + "%"], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
});
app.post("/insertEmprunteur", (req, res) => {
    const sql = "INSERT INTO emprunteur(`nomEmprunteur`,`prenomEmprunteur`,`telEmprunteur`,`adresseEmprunteur`) VALUES(?)";
    const values = [
        req.body.nomEmprunteur,
        req.body.prenomEmprunteur,
        req.body.telEmprunteur,
        req.body.adresseEmprunteur
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.put('/updateEmprunteur/:id', (req, res) => {
    const sql = "UPDATE emprunteur SET `nomEmprunteur`=?,`prenomEmprunteur`=?,`telEmprunteur`=?,`adresseEmprunteur`=? WHERE idEmprunteur=?";
    const id = req.params.id;
    db.query(sql, [req.body.nomEmprunteur, req.body.prenomEmprunteur, req.body.telEmprunteur, req.body.adresseEmprunteur, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })

})
app.delete('/deleteEmprunteur/:idEmprunteur', (req, res) => {
    const sql = "DELETE FROM emprunteur WHERE idEmprunteur = ?";
    const id = req.params.idEmprunteur;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
//emprunt
app.get("/emprunt", (req, res) => {
    const sql = "SELECT livre.titreLivre AS titre, emprunteur.nomEmprunteur AS nom, emprunt.qteEmprunt AS qte, emprunt.dateEmprunt AS date, emprunt.dateRetour AS retour FROM emprunt, emprunteur, livre WHERE emprunt.idLivre=livre.idLivre AND emprunt.idEmprunteur=emprunteur.idEmprunteur";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get("/searchDate", (req, res) => {
    const sql = "SELECT * FROM emprunt WHERE dateEmprunt BETWEEN ? AND ?";
    const id = req.body.date1;
    const id2 = req.body.date1;
    db.query(sql, [id, id2], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
});
app.post("/insertEmprunt", (req, res) => {
    const sql = "INSERT INTO emprunt(`idEmprunteur`,`idLivre`,`qteEmprunt`,`dateEmprunt`,`dateRetour`) VALUES(?)";
    const values = [
        req.body.idEmprunteur,
        req.body.idLivre,
        req.body.qteEmprunt,
        req.body.dateEmprunt,
        req.body.dateRetour
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
});
app.delete('/deleteEmprunt/:idEmprunt', (req, res) => {
    const sql = "DELETE FROM emprunt WHERE idEmprunt = ?";
    const id = req.params.idEmprunt

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.put('updateEmprunt/:idEmprunt', (req, res) => {
    const sql = "UPDATE emprunt SET `idEmprunteur`=?,`idEmprunteur`=?,`qteEmprunt`=?,`dateEmprunt`=?,`dateRetour`=? WHERE `idEmprunteur`=?";
    const id = req.params.idEmprunteur;
    db.query(sq, [req.body.idEmprunteur, req.body.idEmprunteur, req.body.qteEmprunt, req.body.dateEmprunt, req.body.dateRetour, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })

})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE Email=?";
    db.query(sql, [req.body.Email], (err, data) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        if (data.length > 0) {
            bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
                if (err) return res.json({ Message: "Erreur dans serveur" });
                if (response) {
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Mot de passe incorrect" });
                }
            })
        } else {
            return res.json({ Error: "Votre email n'existe pas" });
        }
    })
})

app.post("/register", (req, res) => {
    const sql = "INSERT INTO users(`Nom`, `Email`, `Password`) VALUES(?)";

    bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hassing password" });
        const values = [
            req.body.Nom,
            req.body.Email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json(err);
            return res.json(result);
        })
    })

})

app.get('/users/detail/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE ID = ?";
    const id = req.params.id

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})

app.put('/updateUser/:id', (req, res) => {
    const sql = "UPDATE users SET `Nom`=?, `Email`=?, `Password`=? WHERE ID=?";
    const id = req.params.id

    db.query(sql, [req.body.nom, req.body.email, req.body.password, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.delete('users/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE ID = ?";
    const id = req.params.id

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

//audit
app.get('/livre_audit', (req, res) => {
    const sql = "SELECT * FROM livre_audit";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get('/emprunt_audit', (req, res) => {
    const sql = "SELECT * FROM emprunt_audit";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.get('/emprunteur_audit', (req, res) => {
    const sql = "SELECT * FROM emprunteur_audit";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
//audit
app.post('/adminLogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE Email=?";
    db.query(sql, [req.body.Email], (err, data) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        if (data.length > 0) {
            bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
                if (err) return res.json({ Message: "Erreur dans serveur" });
                if (response) {
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Mot de passe incorrect" });
                }
            })
        } else {
            return res.json({ Error: "Votre email n'existe pas" });
        }
    })
})

app.listen(8081, () => {
    console.log("Listening");
})