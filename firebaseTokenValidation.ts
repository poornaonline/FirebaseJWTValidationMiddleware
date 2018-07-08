import { NextFunction, Request, Response } from "express";
import admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xxxxxxxx.firebaseio.com"
});

async function validateFirebaseToken(request: Request, response: Response, next: NextFunction) {

    let userIdToken = request.headers['authorization'];
    if (typeof userIdToken == 'undefined' || userIdToken == null) {
        response.status(403).send({
            error: "AUTHORIZATION_TOKEN_VALIDATION_ERROR"
        })

    } else {
        const idTokenSplitArray = userIdToken.split(' ');
        if (idTokenSplitArray.length == 2) {
            userIdToken = idTokenSplitArray[1];
        } else {
            console.log("Authorization token error");
            response.status(403).send({
                error: "AUTHORIZATION_TOKEN_VALIDATION_ERROR"
            })
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(userIdToken);
            console.log(decodedToken);
            next();

        } catch (exception) {
            
            console.log(exception);
            console.log("Token authorization failed");
            response.status(403).send({
                error: "AUTHORIZATION_TOKEN_VALIDATION_ERROR",
                exception: exception
            })
        }
    }
}

export {
    validateFirebaseToken
}