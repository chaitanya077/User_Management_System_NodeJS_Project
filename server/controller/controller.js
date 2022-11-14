var Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate the request
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    department: req.body.department,
    salary: req.body.salary,
  });

  //save user details in the DB
  user
    .save(user)
    .then((data) =>{ 
      // res.send(data);
      res.redirect('/add-user');
    })
    // .catch((err) =>
    //   err.res.send(500).send({ message: err.message || "!!ERROR!!" })
    // );
};

//retrive and return all the users// return and retrive a single user
//if we create a new function then we need to create a new route.
exports.find = (req, res) => {

  if(req.query.id){
    const id = req.query.id;
    Userdb.findById(id).then(data=>{
      if(!data){
        res.status(404).send({message:`user not found with the id ${id}`})
      }else{
        res.send(data);
      }
    }).catch(err=>{
      res.status(500).send({message:"error fetching data with id="+id});
    })
  }else{
    Userdb.find()
    .then((data) => res.send(data))
    .catch((err) =>
      err.res.send(500).send({ message: err.message || "!!ERROR!!" })
    );
  }
  
};


//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `cannot update user with ${id}.Maybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error update user information" });
    });
};

//delete a user with specify user id
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .send(404)
          .send({
            message: `cannot delete with id ${id}.Maybe the id is wrong.`,
          });
      } else {
        res.send({
          message: "user is deleted",
        });
      }
    })
    .catch((err) => {
      res.send(500).send({
        message: `could not delete user with id=${id}`,
      });
    });
};
