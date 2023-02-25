# Tonic Website

## Running the website

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-api`
Runs the api on port 5000.\
[http://localhost:5000](http://localhost:5000)

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Backend Set-Up

```Bash
$ cd api
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ _

For windows:
$ python -m venv venv
$ venv\Scripts\activate
(venv) $ _

(venv) $ pip install -r requirements.txt
```
You should now be able to run the api


## GitHub Commits
Add the following to your `.gitignore`
```
venv
__pycache__
config.py
```
If you need access to the AWS buckets for testing, please contact an admin for a set of API keys.

You should always commit to your own branch. Commit using the following format:
```
git commit -m "[Issue worked on] #[status]"

examples:
git commit -m "Wallet ingration #complete"
git commit -m "Wallet ingration #in-progress"
```


Contact Nolan Amblard or Grant Rivera with any questions.
