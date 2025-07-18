# Security Policy

## Supported Versions

| Version  | Supported          | Supported Until               |
| -------- | ------------------ | ----------------------------- |
| >= 5.x.x | :white_check_mark: | Next major version + 6 months |
| >= 4.x.x | :white_check_mark: | 2026-01-18                    |
| >= 3.0.0 | :x:                | 2022-06-01                    |
| <= 3.0.0 | :x:                | N/A                           |

## Reporting a Vulnerability

To report a security vulnerability, please follow these steps:

1. **For non-critical issues**:
   [Open a new issue](https://github.com/p5-wrapper/react/issues/new) and select
   the "Bug Report" template. Add the `security` label to your issue.
2. **For critical vulnerabilities**: Please report them by tagging the core
   maintainers directly (see the [Contacts section](#contacts) below).

Security issues are a priority, and we aim to resolve them within 48 hours. If
we cannot resolve a security vulnerability in the wrapper itself, we will raise
the issue upstream with relevant parties such as 3rd party package maintainers
where possible.

## Security Updates

We regularly update our dependencies to patch security vulnerabilities. We use
Dependabot to automate this process, which creates pull requests for security
updates monthly.

## Contacts

For **critical** security issues, please tag:

- James Robb ([@jamesrweb](https://github.com/jamesrweb))
- Eugene Dyko ([@yevdyko](https://github.com/yevdyko))

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the vulnerability and determine its impact
2. Develop a fix and release it according to severity
3. Publish a security advisory if necessary

We appreciate your help in keeping
[@p5-wrapper/react](https://github.com/p5-wrapper/react) secure!
