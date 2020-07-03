# YALE Cybersecurity

This documentation outlines the current deployment process for this project.


## Deployment workflow

CircleCI takes care of automated deployment to the `master` branch.

An automated deployment process is kicked off for the branches mentioned
above any time you push. You can monitor the progress of the build and deployment 
here: https://app.circleci.com/pipelines/github/yalesites-org/schwarzman.yale.edu

Code is automatically deployed to Pantheon once the build process is
complete.

### Server Environment and Branches

#### Pull Requests

This is the only valid method of commiting code to the project. Once a pull request is created a series of tasks will be handled with CircleCI to test and build the application into an new multidev environment on Pantheon. A link to the environment will be provided as a comment in the PR once the build and deployment is complete.

#### Dev

- master

Dev is the name of the environment on the Pantheon server and should always be set to use the **develop** branch.

#### Test

The test deployment workflow should be handled through the Pantheon Dashboard OR using teminus commands.

#### Live

The Live deployment workflow should be handled through the Pantheon Dashboard OR using teminus commands.
