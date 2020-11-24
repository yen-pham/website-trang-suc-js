var firebaseConfig = {
    apiKey: "AIzaSyAnJWbxhV3QNmF2suiCAIeH_o79wnx4CXQ",
    authDomain: "website-trang-suc-havyb-js.firebaseapp.com",
    databaseURL: "https://website-trang-suc-havyb-js.firebaseio.com",
    projectId: "website-trang-suc-havyb-js",
    storageBucket: "website-trang-suc-havyb-js.appspot.com",
    messagingSenderId: "310761880594",
    appId: "1:310761880594:web:cf38b27fbe3209f108accb",
    measurementId: "G-HGSN4LVXZM"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var data = firebase.database();
const dbRef = firebase.database();

async function getDataAsync(name) {
    let response = await fetch(`https://website-trang-suc-havyb-js.firebaseio.com/${name}.json`);
    let data = await response.json()
    return data;
}