const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context } = github;
  const { issue } = context.payload;

  const issueComments = await octokit.issues.listComments({
    ...context.repo,
    issue_number: issue.number,
  });

  const existingComment = issueComments.data.find(
    (c) => c.user.login === "github-actions[bot]"
  );

  if (existingComment) {
    await octokit.issues.deleteComment({
      ...context.repo,
      comment_id: existingComment.id,
    });
  }

  await octokit.issues.createComment({
    ...context.repo,
    issue_number: issue.number,
    body: `Hello ${
      issue && issue.user ? `@${issue.user.login}` : "Stranger"
    }! Thank you for creating an issue!`,
  });
}

run();
