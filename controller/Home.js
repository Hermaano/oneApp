

const Home = (req, res) => {

    return res.json({
      login : true,
     email :  req.email,
     fullname : req.fullname
    });
  };


module.exports = Home;