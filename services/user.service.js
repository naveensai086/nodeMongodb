const db = require("../config/db.config");

exports.getUsers = (req, res) => {
  // var cursor = db.client
  //   .db("demoDb")
  //   .collection("studentData")
  //   .find();
  // cursor.each(function(err, doc) {
  //   console.log(doc);
  // });
  db.client
    .db("demoDb")
    .collection("studentData")
    .aggregate(
      [
        {
          $lookup: {
            from: "employee",
            localField: "name",
            foreignField: "name",
            as: "common_name"
          }
        }
      ],
      function(err, re) {
        if (err) res.send(err);
        re.each(function(err, doc,i) {
          if (err) res.send(err);
          console.log(doc);
        });
      }
    );
};

exports.insertuser = (req, res) => {
  let name = req.body.name;
  let city = req.body.city;
  db.client
    .db("demoDb")
    .collection("studentData")
    .insertOne({ name: name, city: city }, function(err, re) {
      if (err) console.log(err);
      res.status(200).send("success " + re.insertedCount.toString());
    });
};

exports.updateuser = (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  db.client
    .db("demoDb")
    .collection("employee")
    .updateOne(
      { name: name },
      {
        $set: { age: age },
        $currentDate: { lastModified: true }
      },
      {
        upsert: true
      },
      function(err, re) {
        if (err) console.log(err);
        res.send(re);
      }
    );
};

exports.deleteUsers = (req, res) => {
  let age = req.body.age;

  db.client
    .db("demoDb")
    .collection("studentData")
    .deleteMany({ age: age }, function(err, re) {
      if (err) console.log(err.message);
      res.status(200).send(re.deletedCount.toString());
    });
};
