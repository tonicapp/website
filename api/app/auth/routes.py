from app import db
from app.auth import bp
from app.auth.forms import LoginForm
from app.auth.models import User
from flask import redirect, url_for, flash
from flask_login import current_user
from werkzeug.urls import url_parse


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated():
        return redirect(url_for('core.explore'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None:
            flash('Invalid password')
            return redirect(url_for('auth.login'))