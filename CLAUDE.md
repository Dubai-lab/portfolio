# Notes for Claude

Handover notes written on 2026-10-06, before the owner (Emmanuel) wiped Windows and moved this laptop to EndeavourOS. Earlier conversation history and memory did not survive the move; this file is the record. `README.md` describes the architecture for human readers.

## State of the project

Everything below is deployed and was verified working on 2026-10-06.

- AWS site: https://d25ggs8kflzmtl.cloudfront.net
- Vercel copy: https://portfolio-pied-beta-46.vercel.app (auto-deploys from `main`; `vercel.json` points it at `site/`)
- Counter API: `POST https://2zf3eccymh.execute-api.eu-north-1.amazonaws.com/visits`, hardcoded as `VISITS_API` in `site/js/main.js`
- CloudFormation stack `portfolio-crc` in `eu-north-1`, defined by `template.yaml`. It already exists: `sam deploy` updates it, do not create a second one.
- AWS Budget `portfolio-monthly-1usd` ($1 per month, email alert). Created with the CLI, not in the template.
- GitHub Actions runs `backend/tests` on every push (`.github/workflows/test.yml`). It does not deploy.

## First job on the new OS

`deploy.ps1` is PowerShell and was written for Windows. On EndeavourOS:

1. Check the tools are installed: `aws` (v2), `sam`, `gh`, `git`, Python 3.13 or newer.
2. Recreate the AWS profile. It was named `myprofile`, Region `eu-north-1`, and signs in with `aws login --profile myprofile`. Confirm with `aws sts get-caller-identity --profile myprofile`.
3. Add a `deploy.sh` that does the same three steps as `deploy.ps1` (`sam deploy`, `aws s3 sync site/ ... --delete`, CloudFront invalidation of `/*`), reading the bucket name and distribution ID from the stack outputs. Update the "Deploying" section of `README.md` to match. Ask before deleting `deploy.ps1`.
4. Run `sam validate --lint` and the tests before the first deploy from the new system.

## Account restrictions (as observed on 2026-10-06)

The AWS account is on the Free plan inside an AWS-managed Organization that the owner cannot edit.

- A service control policy denies `iam:CreateOpenIDConnectProvider`, so GitHub Actions cannot sign in to AWS with OIDC. `cicd/github-oidc.yaml` is the ready template for that and is not deployed. Re-test before assuming this still holds.
- CloudFormation in `us-east-1` returned AccessDenied. A custom domain would need an ACM certificate there.
- `AWS::Budgets::Budget` is not available to CloudFormation in `eu-north-1`.

## Decisions the owner made

- Do not redesign the site. The only change to it was the visit count in the footer.
- Work in phases and stop for approval after each one. Give the estimated cost before creating anything in AWS, and stay inside the free tier where possible.
- Explain each step in simple words, with a short version the owner can say in a job interview.
- Commit or push only when asked.
- No long-lived AWS access keys in GitHub secrets. Until OIDC is possible, deployment runs from the owner's machine.
- The counter counts page loads, not unique visitors, and the Vercel site is allowed to call it too (see `AllowOrigins` in `template.yaml`), so both sites share one number.

## Things that are easy to get wrong

- Calling the counter API to test it adds to the real count.
- If the stack is ever deleted and recreated, the CloudFront address and API URL change. Update `VISITS_API` in `site/js/main.js`, the links in `README.md`, and this file.
- Vercel preview deployments sit behind a Vercel login, so they cannot be checked with `curl`; ask the owner to open them.
- Do not leave `__pycache__` in `backend/counter/` before `sam deploy` without `sam build`, or it is packaged into the Lambda.
