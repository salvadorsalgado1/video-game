const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
//Get Publishers and Developer and Sales and Genre Information based on title_id
const sqlGetSomeInfo = "SELECT PUBLISHERS.publisher_name, DEVELOPERS.developer_name, SALES.na_sales, SALES.eu_sales, SALES.jp_sales, GENRES.genre FROM GAMINGDB.PUBLISHERS INNER JOIN GAMINGDB.DEVELOPERS INNER JOIN GAMINGDB.SALES ON PUBLISHERS.title_id = DEVELOPERS.title_id = SALES.title_id INNER JOIN GAMINGDB.GENRES ON PUBLISHERS.title_id = GENRES.title_id AND PUBLISHERS.title_id = 1";
//Get Publishers and Developer information based on title_id
const sqlGetDevPub = "SELECT PUBLISHERS.publisher_name, DEVELOPERS.developer_name FROM GAMINGDB.PUBLISHERS INNER JOIN GAMINGDB.DEVELOPERS ON PUBLISHERS.title_id = DEVELOPERS.title_id AND PUBLISHERS.title_id = 1;"


const db = mysql.createConnection({
    host:'us-cdbr-east-02.cleardb.com',
    user:'b3ae855bc7261a',
    password:'3f3f50cd',
    database:'heroku_2d1f98aa112f6da'
});

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.get('/api/get/max', (req, res)=>{
    const sqlGetAll = "SELECT\
                        max(TITLES.title_id) AS titleID,\
                        max(PUBLISHERS.publisher_id) AS publisherID,\
                        max(DEVELOPERS.developer_id) AS developerID\
                        FROM GAMINGDB.TITLES\
                        INNER JOIN GAMINGDB.PUBLISHERS\
                        ON TITLES.title_id = PUBLISHERS.title_id \
                        INNER JOIN GAMINGDB.DEVELOPERS\
                        on TITLES.title_id = DEVELOPERS.title_id;";
    db.query(sqlGetAll, (err, result)=>{
        res.send(result);
    });
})


app.get('/api/more/:id', (req,res)=>{
    const id = req.params.id
    const moreINFO = 'SELECT TITLES.title_id AS id,\
    TITLES.title_name as title,\
    TITLES.console_name as console,\
    TITLES.rating as rating,\
    TITLES.year_release year,\
    PUBLISHERS.publisher_name as publisher,\
    DEVELOPERS.developer_name as developer,\
    GENRES.genre as genre,\
    SALES.na_sales,\
    SALES.eu_sales,\
    SALES.jp_sales,\
    SALES.other_sales,\
    SALES.global_sales,\
    SCORES.critic_score,\
    SCORES.user_score,\
    MEDIAS.media_url\
    FROM GAMINGDB.TITLES\
    INNER JOIN GAMINGDB.PUBLISHERS ON TITLES.title_id = PUBLISHERS.title_id\
    INNER JOIN GAMINGDB.DEVELOPERS ON TITLES.title_id = DEVELOPERS.title_id\
    INNER JOIN GAMINGDB.GENRES ON TITLES.title_id = GENRES.title_id\
    INNER JOIN GAMINGDB.SALES ON TITLES.title_id = SALES.title_id\
    INNER JOIN GAMINGDB.SCORES ON TITLES.title_id = SCORES.title_id\
    INNER JOIN GAMINGDB.MEDIAS ON TITLES.title_id = MEDIAS.title_id and TITLES.title_id = ?;';
    db.query(moreINFO, id, (err, result)=>{
        res.send(result);
    })
    console.log(id)
})


app.get('/api/get/:id', (req, res)=>{
    const id  = req.params.id;
    db.query(sqlGetDevPub, id, (err, result)=>{
        res.send(result);
    });
})

app.get('/api/search/:letter', (req, res)=>{
    const letter = req.params.letter;
    const sqlTest = `SELECT * FROM GAMINGDB.TITLES WHERE title_name LIKE '${letter}%' LIMIT 100;`;
    db.query(sqlTest,  (err, result)=>{
        console.log(letter)
        res.send(result);
        
    });
})
app.get('/api/search/:search', (req, res)=>{
    const search = req.params.search;
    const sqlTest = `SELECT * FROM GAMINGDB.TITLES WHERE title_name LIKE '${search}%' LIMIT 5;`;
    db.query(sqlTest,  (err, result)=>{
        console.log(search)
        res.send(result);
        
    });
})
app.get('/api/get', (req, res)=>{
    const sqlGetAll = "SELECT * FROM heroku_2d1f98aa112f6da.titles LIMIT 5;";
    db.query(sqlGetAll, (err, result)=>{
        res.send(result);

    });
})



app.post("/api/insert", (req, res)=>{
    res.send("Insert");
    const title = req.body.title;
    const console = req.body.console;
    const year = req.body.releaseYear;
    const rating = req.body.rating;
    const publisher = req.body.publisher;
    const developer = req.body.developer;
    const maxTitle = req.body.maxTitle;
    const maxPublisher = req.body.maxPublisher;
    const maxDeveloper = req.body.maxDeveloper;

    const insertTitle = "INSERT INTO GAMINGDB.TITLES\
    (title_id, title_name, console_name, year_release, rating)\
    VALUES (14663,?,?,?,?);";
 
    // title_name, console_name, year_release, rating,
    db.query(insertTitle, [title, console, year, rating],(err, result)=>{
      
    })
    const insertPublishers = "INSERT INTO GAMINGDB.PUBLISHER \
    (publisher_id, title_id, publisher_name)\
    VALUES (29324,?,?);";
    
    db.query(insertPublishers, [ maxTitle, publisher],(err, result)=>{
      
    })
    const insertDevelopers = "INSERT INTO GAMINGDB.DEVELOPERS\
    (developer_id, title_id, developer_name)\
    VALUES (43989,?,?);";
    db.query(insertDevelopers, [maxTitle, developer],(err, result)=>{
      
    })

    
})


app.delete("/api/delete/:id", (req, res)=>{
    const id  = req.params.id;
    const sqlDelete = "DELETE FROM GAMINGDB.TITLES WHERE title_id = ?";
    db.query(sqlDelete, id, (err, result)=>{
        if(err){
            console.log(err);
        }

    })
})

app.put("/api/update", (req, res)=>{
    const id  = req.body.id;
    const title = req.body.title;
    const rating = req.body.rating;
    const year = req.body.year;
    const console = req.body.console;
    const publisher = req.body.publisher;
    const developer = req.body.developer;

    const sqlUpdateTitle = "UPDATE GAMINGDB.TITLES SET title_name = ? WHERE title_id = ?;"
    db.query(sqlUpdateTitle, [title, id], (err, result)=>{
        if(err){
            console.log(err);
        }

    })
    const sqlUpdateConsole = "UPDATE GAMINGDB.TITLES SET console_name = ? WHERE title_id = ?;"

    db.query(sqlUpdateConsole, [console, id], (err, result)=>{
        if(err){
            console.log(err);
        }

    })
    const sqlUpdateRating = "UPDATE GAMINGDB.TITLES SET rating = ? WHERE title_id = ?;"

    db.query(sqlUpdateRating, [rating, id], (err, result)=>{
        if(err){
            console.log(err);
        }

    })

    const sqlUpdateDeveloper = "UPDATE GAMINGDB.DEVELOPERS SET developer_name = ? WHERE title_id = ?;"

    db.query(sqlUpdateDeveloper, [developer, id], (err, result)=>{
        if(err){
            console.log(err);
        }

    })
    const sqlUpdatePublisher = "UPDATE GAMINGDB.PUBLISHERS SET publisher_name = ? WHERE title_id = ?;"

    db.query(sqlUpdatePublisher, [publisher, id], (err, result)=>{
        if(err){
            console.log(err);
        }

    })
    
    
})




app.listen(8081, ()=>{
    console.log("Running on port 8081");
})


/*

DELIMITER //
CREATE PROCEDURE
insert_record(
IN titleName varchar(170),
IN console varchar(20),
IN yearRelease int(4),
IN ratings varchar(1),
IN publisher varchar(70),
IN developer varchar(100),
IN genre varchar(45),
IN naSales FLOAT, 
IN euSales FLOAT,
IN jpSales FLOAT, 
IN otherSales FLOAT, 
IN globalSales FLOAT,
IN criticScore INT(3),
IN userScore FLOAT,
IN mediaURL varchar(250)
)

BEGIN
SET @maxTitleID = (SELECT max(title_id)+1 FROM GAMINGDB.TITLES);
INSERT INTO GAMINGDB.TITLES (title_id, title_name, console_name, year_release, rating) 
VALUES (@maxTitleID, titleName, console, yearRelease, ratings);

SET @maxPubID = (SELECT max(publisher_id)+2 FROM GAMINGDB.PUBLISHERS);
INSERT INTO GAMINGDB.PUBLISHERS (publisher_id, title_id, publisher_name) 
VALUES (@maxPubID, @maxTitleID, publisher);

SET @maxDevID = (SELECT max(developer_id)+3 FROM GAMINGDB.DEVELOPERS);
INSERT INTO GAMINGDB.DEVELOPERS (developer_id, title_id, developer_name)
VALUES (@maxDevID, @maxTitleID, developer);

SET @maxGenreID = (SELECT max(genre_id)+11 FROM GAMINGDB.GENRES);
INSERT INTO GAMINGDB.GENRES (genre_id, title_id, genre)
VALUES (@maxGenreID, @maxTitleID, genre);

SET @maxSaleID = (SELECT max(sale_id)+1 FROM GAMINGDB.SALES);
INSERT INTO GAMINGDB.SALES
(sale_id, title_id, na_sales, eu_sales, jp_sales, other_sales, global_sales)
VALUES (@maxSaleID, @maxTitleID, na_sales, eu_sales, jp_sales, other_sales, global_sales);

SET @maxScoreID = (SELECT max(sale_id)+5 FROM GAMINGDB.SCORES);
INSERT INTO GAMINGDB.SCORES (score_id, title_id, critic_score, user_score)
VALUES (@maxScoreID, @maxTitleID, criticScore, userScore);

SET @maxMediaID = (SELECT max(media_id)+8 FROM GAMINGDB.MEDIAS);
INSERT INTO GAMINGDB.MEDIAS (media_id, title_id, media_url)
VALUES (@maxMediaID, @maxTitleID, mediaURL);
END //
DELIMITER ;

*/