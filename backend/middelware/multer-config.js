// gestion des fichiers : téléchargement d'images.
const multer = require('multer');

const MIME_TYPES = {
     'image/jpg' :'jpg',
     'image/jpeg': 'jpg',
     'image/png' : 'png'
};

// configuration du chemin de stockage des fichiers entrants.
const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{
       const name = file.originalname.split(' ').join('_');
       const extension = MIME_TYPES[file.mimetype];
       callback(null, name + Date.now() + '.' + extension);
    }
});

//capture les images.
module.exports = multer({ storage}).single('image');