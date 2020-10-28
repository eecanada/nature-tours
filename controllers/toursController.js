const fs = require('fs')

//JSON parse turns json object to javascript object 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// custom middleware function
exports.checkID = (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

// custom middleware function
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing property',
    });
  }
  next();
};

// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours, // this is the tours simple
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  //loop through tours to find
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body, 'hit');
  const newId = tours[tours.length - 1].id++;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  //stringify turns javascript object to json object
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
