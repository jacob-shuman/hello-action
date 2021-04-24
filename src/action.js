const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context } = github;
  const { issue } = context.payload;

  await octokit.issues.createComment({
    ...context.repo,
    issue_number: issue.number,
    body: `Hello ${
      issue?.user?.login ?? "Stranger"
    }! Thank you for creating an issue!`,
  });
}

run();
