const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '615b23fa2fb175947bd32dbb',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dncup3est/image/upload/v1633957938/YelpCamp/lff9m699ybbor2dokooz.jpg',
          filename: 'YelpCamp/lff9m699ybbor2dokooz'
        },
        {
          url: 'https://res.cloudinary.com/dncup3est/image/upload/v1633957962/YelpCamp/pitvpdr4wszf9nksmqau.jpg',
          filename: 'YelpCamp/pitvpdr4wszf9nksmqau'
        },
        {
          url: 'https://res.cloudinary.com/dncup3est/image/upload/v1633957967/YelpCamp/vtpndkvw8edvldpjczhv.jpg',
          filename: 'YelpCamp/vtpndkvw8edvldpjczhv'
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam incidunt totam sunt officiis nam a iusto facilis deleniti. Blanditiis nobis dolores amet obcaecati iure commodi necessitatibus quae suscipit est maiores.',
      price: price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})