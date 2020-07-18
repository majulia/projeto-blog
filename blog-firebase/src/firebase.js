import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyDY9DuI3lsZpzszsxXkiJrwLOax68_VZnE",
    authDomain: "reactapp-9c54e.firebaseapp.com",
    databaseURL: "https://reactapp-9c54e.firebaseio.com",
    projectId: "reactapp-9c54e",
    storageBucket: "reactapp-9c54e.appspot.com",
    messagingSenderId: "1036142450606",
    appId: "1:1036142450606:web:e83de2a9bb825a027d5a3f",
    measurementId: "G-RS20LE1MES"
};

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
//Referenciando database
        this.app = app.database()
        this.storage = app.storage()
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }
 
    async register(nome, email, password){
      await app.auth().createUserWithEmailAndPassword(email, password)
        
      const uid = app.auth().currentUser.uid
      
      return app.database().ref('usuarios').child(uid).set({
          nome: nome
      })

    }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }


    async getUserName(callback){
        if (!app.auth().currentUser) {
            return null
        }
        const uid = app.auth().currentUser.uid
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback)
    }

}

export default new Firebase()