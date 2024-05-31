# yvees

> Searching for your tasks? Go to the [project board](https://github.com/users/arthur-fontaine/projects/5/views/3)

## Setup

First, clone this repository:

```bash
git clone https://github.com/arthur-fontaine/yvees.git
```

This project is using a [Dev Container](https://containers.dev/), so you don't need to install anything on your machine except Docker.

> [!NOTE]
> If you are developing on macOS, I recommend using [OrbStack](https://orbstack.dev/). It's a fast and lightweight alternative to Docker Desktop, optimized for the ARM-based Macs.

The next of this setup guide assumes you use VS Code, but you can use any
editor you want.

When you open the project in VS Code, you may see a notification to install the
recommended extensions. Click on "Install All" to install them. If you don't see
the notification, you surely have the extensions already installed.

Now, open the command palette (Cmd+Shift+P) and run the command
`"Dev Containers: Reopen in Container"`. This will build the development
container and open a new VS Code window inside it.

## Packages/Apps

I think we can consider that this project relies on 3 main things:

- [Bun](https://bun.dev/) for the runtime and package manager.
- [TypeScript](https://www.typescriptlang.org/) for the language.
- [Turborepo](https://turbo.build/repo) for managing the monorepo.

The following packages are available:

| Package/App | Description | Type |
| --- | --- | --- |
| [`ui`](./packages/ui/) | This is the component library. It's built with [Tamagui](https://tamagui.dev/) to create components that are compatible with React and React Native. | Package |
| [`dashboard`](./apps/dashboard/) | This is the dashboard app. It's built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/). | App |
| [`mobile`](./apps/mobile/) | This is the mobile app. It's built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). | App |

All the apps are using [Agrume](https://agrume.js.org/) for the backend. It allows you to create the backend directly in the frontend code.

## Linting

This project is using [ESLint](https://eslint.org/).

To lint the project, run the following command:

```bash
bun lint
```

To fix the linting issues, run the following command:

```bash
bun lint --fix
```

You can also see all the rules by running the following command:

```bash
bunx @eslint/config-inspector
```

## Development

To start to develop, just run the following command:

```bash
bun dev
```

It will start the development script for each package/app.

### How to code properly?

- **Dependency Injection**: Use [Diabolo](https://diabolo.js.org/) to inject dependencies. Read this [article](https://khalilstemmler.com/articles/tutorials/dependency-injection-inversion-explained/) to understand what is Dependency Injection.
- **Commit Messages**: The only convention we use is that the sentence `If applied, this commit will <your commit message>` should make sense. Read this [article](https://chris.beams.io/posts/git-commit/) to understand what is a good commit message.
- **Branch Naming**: First, create an issue on GitHub. Then, click on the
"Create branch" button on the issue page. It will create a branch properly
named.
