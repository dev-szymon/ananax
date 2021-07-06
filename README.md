Ingredients and recipes app.

The app uses typescript, react, firebase, react query and chakra ui. For backend it utilizes nextjs api routes.

## What’s In This Document

- [Technologies used](#technologies-used)
- [Live preview](#walk-through)
- [Run locally](#run-locally)

## <a name="technologies-used">Technologies used</a>

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [ChakraUI](https://chakra-ui.com/)
- [React Query](https://react-query.tanstack.com/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)

## <a name="live-preview">Live preview</a>

## <a name="run-locally">Run locally</a>

You need the following enviromental variables to run this project

```
NEXT_PUBLIC_API_KEY="firebase Web API Key"
NEXT_PUBLIC_AUTH_DOMAIN="{{firebase Project ID}}.firebaseapp.com"
NEXT_PUBLIC_PROJECT_ID="firebase Project ID"
FIREBASE_PRIVATE_KEY="firebase Private Key, generate in Project settings > service accounts"
FIREBASE_CLIENT_EMAIL="firebase service account email, from project settings > service accounts"
CLOUDINARY_NAME=dq104qc4m
CLOUDINARY_API_KEY=717158453188245
CLOUDINARY_API_SECRET=PTH9ueHkeA5MRGgwy_wWae_MnQk
```

1. **Clone the repository**

   ```
   git clone https://github.com/dev-szymon/ananax.git
   ```

2. **Install dependencies**

   ```
   yarn
   ```

3. **Run the react app**
   In another terminal window you can start react app.

   ```
   yarn dev
   ```
