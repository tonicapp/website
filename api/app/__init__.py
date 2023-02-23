from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
login = LoginManager()
login.login_view = 'auth.login'
login.login_message = 'Please log in to access this page.'


def create_app() -> Flask:
    app = Flask(__name__)
    
    db.init_app(app)
    login.init_app(app)
    
    return app

from app import models