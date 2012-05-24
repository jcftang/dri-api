var config = {
    "uploadDirectory": __dirname+"/publib/uploads/" /*Local directory to store media files*/
  , "publicDirectory": "http://ceres.tchpc.tcd.ie:4000/uploads/" /*public URL to the directory where media files are stored*/
  , "fedoraURL": "howest-server.tchpc.tcd.ie" /*URL to the Fedora instance*/
  , "fedoraPort": 9191 /*Port on which Fedora runs*/
  , "fedoraAuth": "fedoraAdmin:admin" /*Authentification info for Fedora*/
  , "fedoraNamespace": "8FedoraLib" /*Namespace to be used for the Fedora objects*/
  , "mongoDBURL": "mongodb://localhost/dri" /*URL to the mongoDB instance*/
}
module.exports = config