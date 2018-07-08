# Firebase JWT token validator middleware

This middleware can be used in Node.js environment to validate the requests coming from the client. 
Current version written in Typescript.
```sh
serviceAccountKey.json // "Replace this file's content with your firebase access keys"
```

How to use the middleware:

```sh
app.get("/user", validateFirebaseToken, (req: Request, res: Response) => {
    res.send({
        FirstName : "Poorna",
        LastName : "Jayasinghe"
    });
});
```



