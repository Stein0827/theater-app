# GitHub Guide
## Cloning
- `git clone <ssh-url>`

## Typical Git Workflow for Development
- Master branch should contain stable code only
- New branches should be made for bug fixes and development
	- `git checkout -b <new-branch>` This will simulateounsly create a new branch and navigate to that branch from the current head (which is typically master)
- Make your commits.
	- Checking status
		- `git status`
	- adding/staging code
		- `git add .` stages all files
		- `git add <file-name>` stages specific file
		- `git add <folder-name>` stages entire folder
		- `git reset HEAD <file name>` unstages a file
		- `git rm <file name>` when u delete a file, you will have to also stage it, this command removes the file and stages it for you.
		- `git add -p .` This lets you interactively determine which chunks of code you want to stage. 
			- You can edit chunks of code, by selecting e
	- commiting code
		- `git commit -m <message>` Commits all staged code with a subject message and no body
		- `git commit` lets you put a body and a subject
		- `git commit -am` stages all modified files and commits them. the `-a` does not stage new files.
		- `git commit --amend` adds staged code to previous commit
		- `git commit --amend -m <new commit message>` updated the previous commits commit message

- When code is ready to push, clean up using `rebase, ammend, or cherry-picking`
	- `git commit --amend` This basically puts your changes into the last commit you made, good if you found a small typo and keeps commit history clean. It also allows you to modify the commit message and replaces the new modified message with a new one.
	- `git rebase -i <HEAD~4>` This will show the last four commits and will allow you to,
		- pick = use commit
		- reword = use commit, but edit commit message
		- squash = uses commit, but merges it into previous commit
		- fixup = like squash but removes commits log message
		- edit = use commit but stop for ammending
		- exec = run command using shell
		- If you delete a line with one of the commits, that commit will be lost (careful)
- Push the code branch and create a PR
		- `git push origin <branch-name>` This will create a PR and show up on the remote repo.

## If multiple of us are working on a single branch
- Create a dev branch from master this dev branch could be named and is for a microservice or whatever, then we create another branch for every fix or enhancement. That way we can compartmentalize the branch the we are all working on.
	- `git checkout -b <new-branch> <dev-branch>`  This will simulateounsly create a new branch and navigate to that branch from the dev branch

## Commit messages
-   If applied, this commit will _your subject line here_ (use imperative form)
-  use body to explain what and why vs. how
- Specify type of commit:
	- feat: The new feature you're adding to a particular application
	-   fix: A bug fix
	-   style: Feature and updates related to styling
	-   refactor: Refactoring a specific section of the codebase
	-   test: Everything related to testing
	-   docs: Everything related to documentation
	-   chore: Regular code maintenance.[ You can also use emojis to represent commit types]
- Do not use any punctuation like periods or exclamations
- Seperate the body and the subject with a blank line
- Do not assume the reviewer understands the original problem, make sure to include it.