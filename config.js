var config = {
    "uploadDirectory": __dirname + "/tmp/uploads/" /*Local directory to store media files, __dirname gives the location of this file*/
  , "publicDirectory": "http://localhost:4000/uploads/" /*public URL to the directory where media files are stored*/
  , "fedoraURL": "localhost" /*URL to the Fedora instance*/
  , "fedoraPort": 9191 /*Port on which Fedora runs*/
  , "fedoraAuth": "username:password" /*Authentification info for Fedora*/
  , "fedoraNamespace": "test" /*Namespace to be used for the Fedora objects*/
  , "mongoDBURL": "mongodb://localhost/dri4" /*URL to the mongoDB instance*/
}
module.exports = config