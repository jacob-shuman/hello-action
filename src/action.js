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
      issue && issue.user ? `@${issue.user.login}` : "Stranger"
    }! Thank you for creating an issue!`,
  });

  const issueComments = await octokit.issues.listComments({
    ...context.repo,
    issue_number: issue.number,
  });

  core.info(
    "Authenticated Login: ",
    (await octokit.apps.getAuthenticated()).data
  );
  core.info("Existing Comments: ", issueComments.data);
  //   if(issueComments.data.some((c)=>c.user.login))
  //   await octokit.issues.deleteComment()
}

run();
