# How to set up venv for api

```
// Make sure you are in the api directory
$ cd api
$ python3 -m venv venv
$ source venv/bin/activate
    // Note that the above command is different on windows -> venv\Scripts\activate

(venv) $ pip install -r requirements.txt

Make sure to add 
venv
__pycache__
to your gitignore if it's not already there
```