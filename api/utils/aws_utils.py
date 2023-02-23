import os
import boto3
from mutagen.mp3 import MP3
from io import BytesIO
import sys
import utils.nft_json_maker
sys.path.append('..')
import config


path = os.getcwd()
# file Upload
UPLOAD_FOLDER = os.path.join(path, 'temp-uploads')

# create the AWS S3 client with your access key ID and secret access key
s3 = boto3.client(
  's3',
  aws_access_key_id=config.key_id,
  aws_secret_access_key=config.secret_key
)


def upload_file(key:str, file_path:str, file_type: str):
    """
    Uploads the edited mp3 file to AWS.
    @param key The key to be used in the database
    @param file_path The path to the mp3 file
    @param file_type The type of file to be uploaded
    """
    match file_type:
        case 'mp3':
            bucket = config.s3_mp3_storage
        case 'image':
            bucket = config.s3_cover_art_storage
    s3.upload_file(
        Bucket=bucket,
        Filename=file_path,
        Key=key
    )


def upload_json(key:str, obj):
    s3.Bucket(config.s3_json_storage).put_object(Body=obj,  Key=f'{key}.json')


# def get_full_contents():
#     result = s3.list_objects(Bucket=config.s3_bucket)
#     return result.get('Contents', [])


# def get_mp3_files_from_s3(bucket_name):
#     result = s3.list_objects(Bucket=bucket_name)
#     files = [content["Key"] for content in result.get("Contents", []) if content["Key"].endswith(".mp3")]
#     return files


# def get_mp3_full_from_bucket(bucket_name):
#     response = s3.list_objects_v2(Bucket=bucket_name)
#     files = []
#     for object in response.get("Contents"):
#         key = object.get("Key")
#         if key.endswith('.mp3'):
#             obj = s3.get_object(Bucket=bucket_name, Key=key)
            
#             mp3_file = obj['Body'].read()
#             audio = MP3(BytesIO(mp3_file))
            
#             if(audio == None):
#                 continue
            
#             files.append(audio)
#     return files


# def get_presigned_url(filename, duration: int = 86400):
#     """
#     Generates a presigned url of a designated length for a file.
#     @param filename the name of the key in the S3 bucket
#     @param duration the duration of the url. Default is one day
#     @returns the presigned url
#     """
#     # Generate a pre-signed URL for the MP3 file
#     bucket_name = config.s3_bucket
#     url = s3.generate_presigned_url(ClientMethod='get_object', 
#                                      Params={'Bucket': bucket_name, 'Key': filename},
#                                      ExpiresIn=duration) # URL will be valid for <duration> seconds
#     return url
