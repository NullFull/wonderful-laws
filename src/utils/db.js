import admin from 'firebase-admin'


const getDB = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                "type": "service_account",
                "project_id": "wonderful-law",
                "private_key_id": process.env.FIREBASE_PKEY_ID,
                "private_key": process.env.FIREBASE_PKEY,
                "client_email": process.env.FIREBASE_EMAIL,
                "client_id": process.env.FIREBASE_CLIENT_ID,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nqr4j%40call21st-works.iam.gserviceaccount.com"
            })
        })
    }

    return admin.firestore()
}


export {
    getDB,
}
