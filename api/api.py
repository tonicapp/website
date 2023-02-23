import os
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename
from utils import aws_utils
from utils.nft_json_maker import create_nft_json
from utils.mp3Editor import editData, delete_temp_music_files
import config # TODO add tis with your aws credentials



path = os.getcwd()
app = Flask(__name__)
ALLOWED_SONG_EXTENSIONS = set(['mp3'])
UPLOAD_FOLDER = os.path.join(path, 'temp-uploads')
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_SONG_EXTENSIONS


@app.route('/api/time')
def get_current_time():
    return {'time': "testing"}


@app.route('/api/uploadsong', methods=['POST'])
def upload_music_asset():
    if request.method == 'POST':
        if 'music_file' not in request.files:
            return {"msg": "no file part"}
        music_file = request.files['music_file']        
        if music_file.filename == '':    
            return {"msg": "no file selected"}
        if music_file and allowed_file(music_file.filename):
            song_filename = secure_filename(music_file.filename)
            music_file.save(os.path.join(app.config['UPLOAD_FOLDER'], 'songs', song_filename))
            artist = request.form.get('artist')
            album = request.form.get('album')
            title = request.form.get('title')
            release_date = request.form.get('release_date')
            genre = request.form.get('genre') if request.form.get('genre') != 'select' else None
            song_image = request.files.get('song_image')
            image_filename = secure_filename(song_image.filename)
            if song_image:
                song_image.save(os.path.join(app.config['UPLOAD_FOLDER'], 'img', image_filename))

            db_filename:str = editData(filename=song_filename, artist=artist, album=album, title=title, release_date=release_date,
                genre=genre, image=image_filename)

            if db_filename != 'EYED3 ERROR FOUND':
                # Upload mp3 and jpg to respective s3 buckets
                song_file_path = os.path.join(path, 'temp-uploads', 'songs', song_filename)
                aws_utils.upload_file(key=db_filename + '.mp3', file_path=song_file_path, file_type='mp3')
                image_file_path = os.path.join(path, 'temp-uploads', 'img', image_filename)
                aws_utils.upload_file(key=db_filename + '.jpg', file_path=image_file_path, file_type='image')
                # Use links from mp3 and jpg uploads to create and upload nft json to s3 bucket
                mp3_uri = f'https://tonic-mp3s.s3.us-east-2.amazonaws.com/{db_filename}.mp3'
                image_uri = f'https://tonic-cover-arts.s3.us-east-2.amazonaws.com/{db_filename}.jpeg'
                aws_utils.upload_json(key=db_filename, obj=create_nft_json(songname=title, genre=genre, release_date=release_date, mp3_uri=mp3_uri, image_uri=image_uri))
                delete_temp_music_files(song_filename=song_filename,image_filename=image_filename)
                return {"msg": "upload success"}
            else:
                delete_temp_music_files(song_filename=song_filename,image_filename=image_filename)
                return {"msg": "upload failure"}

        else:
            return {"msg": "invalid file"}

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=False)