import express, { json } from 'express';
import mysql from 'mysql';
import cors from 'cors';

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
app.post("/insertLivre", (req, res) => {
    const sql = "INSERT INTO livre(`titreLivre`,`auteurLivre`,`editeurLivre`,`dateParution`) VALUES(?)";
    const values = [
        req.body.titreLivre,
        req.body.auteurLivre,
        req.body.editeurLivre,
        req.body.dateParution
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})
app.put("/updateLivre/:idLivre", (req, res) => {
    const sql = "UPDATE livre SET `titreLivre=?`, `auteurLivre`=?,`editeurLivre`=?,`dateParution`=? WHERE idLivre=?";
    const id = req.body.idLivre;
    db.query(sql, [req.body.titreLivre, req.body.auteurLivre, req.body.auteurLivre, req.body.editeurLivre, req.body.dateParution, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.delete('/deleteLivre/:idLivre', (req, res) => {
    const sql = "DELETE FROM livre WHERE idLivre = ?";
    const id = req.params.idLivre

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
//emprunteur
app.get("emprunteur", (req, res) => {
    const sql = "SELECT * FROM emprunteur";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.post("/insertEmprunteur", (req, res) => {
    const sql = "INSERT INTO emprunteur(`nomEmprunteur`,`prenomEmprunteur`,`telEmprunteur`,`adresseEmprunteur`) VALUES(?)";
    const values = [
        req.body.nomEmprunteur,
        req.body.nomEmprunteur,
        req.body.telEmprunteur,
        req.body.adresseEmprunteur
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})
app.put('updateEmprunteur/:idEmprunteur', (req, res) => {
    const sql = "UPDATE emprunteur SET `nomEmprunteur`=?,`prenomEmprunteur`=?,`telEmprunteur`=?,`adresseEmprunteur`=? WHERE `idEmprunteur`=?";
    const id = req.body.idEmprunteur;
    db.query(sq, [req.body.nomEmprunteur, req.body.prenomEmprunteur, req.body.telEmprunteur, req.body.adresseEmprunteur, idEmprunteur], (err, result) => {
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
    const sql = "SELECT * FROM emprunt";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})
app.post("/insertEmprunt", (err, result) => {
    const sql = "INSERT INTO emprunt(`idExemplaire`,`idEmprunteur`,`dateEmprunt`,`dateRetour`) VALUES(?)";
    const values = [
        req.body.idExemplaire,
        req.body.idEmprunteur,
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
    const sql = "UPDATE emprunt SET `idEmprunteur`=?,`idEmprunteur`=?,`nombreEmprunt`=?,`dateEmprunt`=?,`dateRetour`=? WHERE `idEmprunteur`=?";
    const id = req.body.idEmprunteur;
    db.query(sq, [req.body.idEmprunteur, req.body.idEmprunteur, req.body.nombreEmprunt, req.body.dateEmprunt, req.body.dateRetour, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })

})
//exemplaire
app.get("/exemplaire", (req, res) => {
    const sql = "SELECT * FROM exemplaire";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    });
});
app.post("/inserstExemplaire", (err, result) => {
    const sql = "INSERT INTO exemplaire(`idLivre`, `nombreExemplaire`) VALUES(?)";
    const values = [
        req.body.idLivre,
        req.body.nombreExemplaire
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.put('updateEmemplaire/:idExemplaire', (req, res) => {
    const sql = "UPDATE exemplaire SET `idLivre`=?,`nombreExemplaire`=? WHERE `idExemplaire`=?";
    const id = req.body.idExemplaire;
    db.query(sq, [req.body.idLivre, req.body.nomExemplaire, id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    });
});
app.delete('/deleteExemplaire/:idExemplaire', (req, res) => {
    const sql = "DELETE FROM exemplaire WHERE idExemplaire = ?";
    const id = req.params.idExemplaire

    db.query(sql, [id], (err, result) => {
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

app.post('/users', (req, res) => {
    const sql = "INSERT INTO users(`Nom`, `Email`, `Password`) VALUES(?)";
    const values = [
        req.body.nom,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.get('users/detail/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE ID = ?";
    const id = req.params.id

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Erreur dans serveur" });
        return res.json(result);
    })
})

app.put('users/update/:id', (req, res) => {
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

app.listen(8081, () => {
    console.log("Listening");
})