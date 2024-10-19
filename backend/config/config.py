import os

def load_config():
    config = {
        'DEBUG': os.environ.get('DEBUG', 'True') == 'True',
        # Add other configuration variables here
    }
    return config
