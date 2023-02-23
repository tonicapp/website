from __future__ import annotations

from app import db, login
from flask import current_app
from flask_login import UserMixin


@login.user_loader
def load_user(public_key: str) -> User | None:
    return User.query.get(public_key)


class User(db.Model, UserMixin):
    public_key = db.Column(db.String(44), primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=True)
    password_hash = db.Column(db.String(128), nullable=True)
    web_two = db.Column(db.Boolean())
    
    def __repre__(self) -> str:
        return f'<User> {self.public_key}'
    