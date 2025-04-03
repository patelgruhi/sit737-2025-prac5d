SIT737-2025-Prac5D: Deploying a Dockerized Application to Google Cloud

Overview

    In this project, a web application will be Dockerized and deployed to a Google Cloud private container registry.  A Dockerfile must be created, a Docker image must be built, pushed to the Google Artifact Registry, and the deployment must be tested.

1.Create a Private Container Registry
    Open Cloud Shell or PowerShell (Windows) with gcloud CLI.

2.Authenticate Docker with Google Cloud
    gcloud auth configure-docker australia-southeast2-docker.pkg.dev

3.Build and Tag the Docker Image

    docker build -t image1:latest .

    docker tag image1 australia-southeast2-docker.pkg.dev/sit737-25t1-patel-671e405/task5d/image1:latest

4.Push the Image to Google Cloud Registry
    
    docker push australia-southeast2-docker.pkg.dev/sit737-25t1-patel-671e405/task5d/image1:latest

Step 5: Verify and Run the Image

    docker run -p 4000:4000 australia-southeast2-docker.pkg.dev/sit737-25t1-patel-671e405/task5d/image1:latest

We successfully Dockered a web application in this practical job and deployed it to the private container registry on Google Cloud. The steps were to create a Dockerfile, build and tag the image, push the image to the Google Artifact Registry, and authenticate Docker with Google Cloud. Lastly, we tested and executed the deployed image to make sure it worked.
