import eyed3
from datetime import datetime
from werkzeug.utils import secure_filename
import os


def editData(filename: str, artist:str=None, album:str=None, album_artist:str=None,
    title:str=None,track_num:str=None, release_date:str=None, genre:str=None, image:str=None) -> str:
    """
    Edits the ID3 tag of an MP3 file with information about the song.
    @return filename of the edited file if editing ran
    """

    try:
        path = os.getcwd()
        if image:
            pathimg = os.path.join(path, 'temp-uploads', 'img', image)
            with open(pathimg, 'rb') as song_img:
                imagedata = song_img.read()  # Read the binary of an image file
        else:
            imagedata = None
    except FileNotFoundError as e:
        imagedata = None
        print(e)


    try:
        audiofile = eyed3.load(os.path.join(path, 'temp-uploads', 'songs', filename))
        audiofile.tag.clear()

        # Update tags
        audiofile.tag.artist =          artist
        audiofile.tag.album =           album
        audiofile.tag.album_artist =    album_artist
        audiofile.tag.title =           title
        audiofile.tag.track_num =       track_num
        if not release_date:
            release_date = datetime.now().strftime('%Y-%m-%d')
        audiofile.tag.release_date =    release_date
        audiofile.tag.genre =           genre
        if imagedata:
            audiofile.tag.images.set(3, imagedata, 'image/jpeg')
        audiofile.tag.save()
        return makeFileName(artist=artist, title=title)
    except FileNotFoundError:
        print("Music file not found error")
    except:
        print('Tag error')
    
    return 'EYED3 ERROR FOUND'


def makeFileName(artist:str, title:str) -> str:
    """
    Makes the filename to be used in the AWS bucket database for the song.
    @param artist The artist name
    @title The title of the song
    @return the filename
    """
    # TODO make this safer, i.e. check and verify that no bad names get through
    # also find a way to make sure that the inputted name isn't just a period? optional
    artist = artist.replace('.', '')
    title = title.replace('.', '')
    time_str = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
    return secure_filename(f"{artist}-{title}-{time_str}")


def delete_temp_music_files(song_filename:str=None, image_filename:str=None) -> None:
    """
    Deletes the song and image files stored locally during the editing process.
    @param song_filename The filename of the song (including extension)
    @param image_filename The filename of the image (including extension)
    """
    path = os.getcwd()
    if song_filename:
        os.remove(os.path.join(path, 'temp-uploads', 'songs', song_filename))
    if image_filename:
        # TODO Verify image extension
        os.remove(os.path.join(path, 'temp-uploads', 'img', image_filename))

