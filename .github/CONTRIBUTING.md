# YALE

Contribution guidelines for the YALE Cybersecurity website. This is a Drupal 8 composer project.
https://cybersecurity.yale.edu

## General codebase

- Use composer to install all modules and libraries. Please consult with the team if you are having issues to install items correctly with this process. [read the official documentation on composer module installs.](https://www.drupal.org/docs/develop/using-composer/using-composer-to-manage-drupal-site-dependencies)
- Separate documentation as much as possible for better organization and to avoid the wall-o-text. Create links within root [README.md](https://github.com/yalesites-org/cybersecurity.yale.edu/blob/master/README.md) to additional documentation.

## Git workflow

- Create work off of the `master` branch which is the default branch.
- Keep your branches as lightweight as possible, restricting your pull requests to only the feature requirements necessary for the ticket you are working on.

### Branch naming conventions

- `master` The master branch is for code ready to be released to pantheon dev environment. Code should progress through the pantheon workflow from there.
- `YI-XX--short-description` `##` represents the Jira ticket number. Feature branches should branch from and merge back into the `master` branch. They contain code that is currently in development. When a story/feature is complete, a pull request should be created merging the feature branch into the `master` branch.
- `hotfix/short-description` Create a hotfix branch for quick fixes that need to bypass the `master` branch and get merged directly into `master`.

### Pull requests

- All pull requests need to go through a review process.
- Assign 1 or more `reviewers` to your pull request once it is ready for review.
- As a reviewer assign yourself as the `assignee` when you start work on the pull request.
- Add labels to your pull request. This will help to know the status of all the open pull requests at a glance. We review the labels below.
- Delete branches after merging.

#### Pull request template

Pull requests should be named with the full Jira ticket ID (if applicable) plus a brief description. Example:

> YI-10: Basic page content type

A pull request [template](https://github.com/yalesites-org/cybersecurity.yale.edu/blob/master/.github/PULL_REQUEST_TEMPLATE.md) has been created. Below is the general outline of the template. We have 5 sections that could be used for any given pull request

- Purpose: A clear description of what problem the pull request is meant to address
- JIRA: A list of links to relevant JIRA tickets
- Pull Request Deployment: A step by step process to make sure the reviewer is set-up with the correct assets so they can complete a functional review
- Functional Testing: A step by step process for testing the pull request functionality
- Notes: Additional notes for the reviewer for additional context if they need.

### Pull request labels

Here is a list of the labels we have identified that we will use for this project. Each is described for a use case.

**BLOCKER**
When you are blocked from merging the code/feature into the branch for the sake of deploy, make sure this label is set until after deploy, when you should remove it.

**HELP!**
If you need help with a task flag it with the HELP! label.

**Work in Progress**
If you create a PR before it is ready for review and it still needs additional work, flag it with the Work in Progress label.

**Needs Review**
If your work is complete and you are ready for a functional testing and code review, flag the PR with the Needs Review label

**Review in Progress**
If you have been assigned to review a large PR or if you began a review and you were pulled away, mark the PR with Review in Progress

**Question**
If you have a question that needs to be answered to continue your review flag it with the question label.

**Passes Code Review**
If the PR passes code review, flag it with the Passes Code Test label.

**Passes Functional Test**
If the PR passes the functional test, flag the PR with the Passes Functional Test label.

**Ship it!**
When the PR has passed all requirements and if it is ready to merge in to the develop branch or a specified sprint branch then flag it with the Ship it! label

## Additional pull request best practices

- Generally, pull requests should resolve a single Jira ticket. Try to avoid combining multiple tickets into a single pull request. There may be instances where it makes sense to do otherwise but please use discretion.
- Try to keep pull requests reasonably small and discrete. Following the one pull request per ticket paradigm should accomplish this by default. However, if you are beginning to work on a story and it feels like it will result in a giant pull request with lots of custom code, changes across many features, and lots of testing scenarios, think about how you might break down the story into smaller subtasks that could be incrementally developed and tested. Create subtasks or potentially even new stories within Jira. If you are unsure about how or are unable to do this, please reach out to the project Tech Lead, Product Owner, or Project Manager.

## Coding standards

Coding standards will be rigorously enforced on this project. Please save everybody time by checking for common syntax errors in your custom code and fixing them before you send your pull request into review.

All custom code on this project should:

- Adhere to [Drupal coding standards](https://www.drupal.org/coding-standards) and best practices.
- Use semantic naming for code readability.
- Employ [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principles.
- Be well commented and documented according to [Drupal standards](https://www.drupal.org/node/1354) for PHP and [JSDoc standards](http://usejsdoc.org) for Javascript.
