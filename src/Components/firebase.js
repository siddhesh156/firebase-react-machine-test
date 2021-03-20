import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import "firebase/storage";

const config = {
    apiKey: "AIzaSyBetMjR9nisDFqpNqSEwOIwAoiDTteSD8w",
    authDomain: "react-firebase-mt.firebaseapp.com",
    projectId: "react-firebase-mt",
    storageBucket: "react-firebase-mt.appspot.com",
    messagingSenderId: "637902249033",
    appId: "1:637902249033:web:1524e42263dd32095f3398"
}


class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name,email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_machine_test/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	addUserData(name,lname,age,phone,address,url ) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_machine_test/${this.auth.currentUser.uid}`).set({
			name,lname,
			age,phone,address,url
		})
	}

	updateUserData(name,lname,age,phone,address,url ) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_machine_test/${this.auth.currentUser.uid}`).set({
			name,lname,
			age,phone,address,url
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_machine_test/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}

	async getCurrentUserData() {
		const data = await this.db.doc(`users_machine_test/${this.auth.currentUser.uid}`).get()
		
		let obj=[]
		obj.name=data.get('name')
		obj.lname = data.get('lname')
		obj.age = data.get('age')
		obj.phone=data.get('phone')
		obj.address= data.get('address')
		obj.url=data.get('url')
		return obj
	}

	
}

export default new Firebase()

export const storage = app.storage();


