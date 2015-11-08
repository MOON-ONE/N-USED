# #!/bin/sh

# git filter-branch --env-filter '

# OLD_EMAIL="phantom.there@gmail.com"
# CORRECT_NAME="Jinghan Wang"
# CORRECT_EMAIL="jinghan.w@outlook.com"

# if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
# then
#     export GIT_COMMITTER_NAME="$CORRECT_NAME"
#     export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
# fi
# if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
# then
#     export GIT_AUTHOR_NAME="$CORRECT_NAME"
#     export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
# fi
# ' --tag-name-filter cat -- --branches --tags

git filter-branch -f --commit-filter '
if [ "$GIT_COMMITTER_EMAIL" = "phantom.there@gmail.com" ];
then
        skip_commit "$@";
else
        git commit-tree "$@";
fi' HEAD