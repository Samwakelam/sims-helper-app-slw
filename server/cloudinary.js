//  require Database

const cloudinary = require('cloudinary').v2;
// config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET, 
});

// sample uploader code
cloudinary.uploader.upload(
  'sample.jpg',
  { crop: 'limit', tags: 'samples', width: 3000, height: 2000 },
  function (result) {
    console.log(result);
  }
);

// sample image manipulation tag
cloudinary.image('sample', {
  crop: 'fill',
  gravity: 'faces',
  width: 300,
  height: 200,
  format: 'jpg',
});

// simple image upload
cloudinary.uploader.upload('my_image.jpg', function (error, result) {
  console.log(result, error);
});

// cloudinary.upload_stream
var fs = require('fs');
var stream = cloudinary.uploader.upload_stream(function(error, result) { console.log(result); });
var file_reader = fs.createReadStream('my_picture.jpg', {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
