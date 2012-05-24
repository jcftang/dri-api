var config = {
    "uploadDirectory": "/tmp/uploads/" /*Local directory to store media files*/
  , "publicDirectory": "http://strife.tchpc.tcd.ie/~mvanwamb/uploads/" /*public URL to the directory where media files are stored*/
  , "fedoraURL": "howest-server.tchpc.tcd.ie" /*URL to the Fedora instance*/
  , "fedoraPort": 9191 /*Port on which Fedora runs*/
  , "fedoraAuth": "fedoraAdmin:admin" /*Authentification info for Fedora*/
  , "fedoraNamespace": "8FedoraLib" /*Namespace to be used for the Fedora objects*/
}
module.exports = config