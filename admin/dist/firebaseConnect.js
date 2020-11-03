var firebaseConfig = {
    apiKey: "AIzaSyBFZ2SXTM82PfF2tTsbYjtBCNB8zpY5hLQ",
    authDomain: "notereactfedu-3cb48.firebaseapp.com",
    databaseURL: "https://notereactfedu-3cb48.firebaseio.com",
    projectId: "notereactfedu-3cb48",
    storageBucket: "notereactfedu-3cb48.appspot.com",
    messagingSenderId: "493326734071",
    appId: "1:493326734071:web:b5cb46db895fb172"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var data = firebase.database();
const dbRef = firebase.database();

async function getDataAsync(name) {
    let response = await fetch(`https://notereactfedu-3cb48.firebaseio.com/${name}.json`);
    let data = await response.json()
    return data;
}