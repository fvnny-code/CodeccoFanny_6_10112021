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
       const name = file.originalname.split(' ').join('_'); // élimination d'eventuels espaces dans le nom du fichier original, et remplacement par des underscore
       const extension = MIME_TYPES[file.mimetype]; // génèrer l'extension du nom du fichier à partir du dictionnaire MIME_TYPES.
       callback(null, name + Date.now() + '.' + extension);
    }
});

//capture des images et enregistrement dans le système de fichiers du serveur, grâce à storage configuré.
module.exports = multer({ storage}).single('image');