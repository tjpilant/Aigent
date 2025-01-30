from setuptools import setup, find_packages

setup(
    name="aigent",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "flask",
        "flask-cors",
        "gunicorn",
        "google-cloud-documentai",
        "pydantic"
    ],
)
