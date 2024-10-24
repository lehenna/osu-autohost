# Osu Autohost

**Osu Autohost** is an open source tool that allows you to create and manage osu multiplayer lobbies! easily. Just download, modify the settings and run and you will have an osu bot! and a web list panel to use. We offer features such as rotating host system (optional), user ban, ban, room name and password change, and more.

---

## Features

- Rotating Host System (Optional): Allows you to automatically change the host of the lobby.
- Complete Administration: Ban users, kick, change host, change lobby name and password from the web portal.
- Interactive Web Panel: Intuitive and easy administration from the browser.

---

## Installation

### 1. Donwload

Go to the [releases](https://github.com/lehenna/osu-autohost/releases) section and look for the latest version.

### 2. Unzip the downloaded ZIP.

### 3. Customize

#### 3.1. Go to your osu [account settings](https://osu.ppy.sh/home/account/edit) page.

#### 3.2. Create a new OAuth client.

![image](/assets/create-oauth-client-1.PNG)
![image](/assets/create-oauth-client-2.PNG)

#### 3.3. Create API Key.

![image](/assets/create-api-key-1.PNG)
![image](/assets/create-api-key-2.PNG)

#### 3.4. Create IRC credentials.

![image](/assets/create-irc-credentials-1.PNG)
![image](/assets/create-irc-credentials-2.PNG)

#### 3.5. Use credentials.

In the unzipped folder you will find a `settings.json` file that you need to open and modify the fields with the previously created credentials.

```json
{
  "username": "lehenna",
  "apiKey": "xx********************",
  "password": "******",
  "oauth": {
    "clientId": 201792,
    "redirectUri": "http://localhost:5173/api/oauth/callback",
    "secret": "xx*******************"
  }
}
```

Just save the file and that's it.

### 4. Install [Bun.js](https://bun.sh/)

In order to run Osu Autohost you must have [Bun.js](https://bun.sh/) installed, which will be the runtime necessary to function.

Visit its documentation to be able to install it. Once you have it installed, go to the next step.

### 5. Install dependencies

Open a terminal or CMD and go to the previously unzipped folder.

```bash
cd /download/osu-autohost
```

Now run the following command to download the dependencies.

```bash
bun install
```

### 6. Run

- The above steps are only necessary for the first time you run Osu Autohost.
- You must navigate to the unzipped folder and then run the startup command.

```bash
cd /download/osu-autohost
bun start
```

Once initialized, navigate your browser to `http://localhost:5173` and start using Osu Autohost.

---

## Contribution

If you would like to contribute in any way to Osu Autohost, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/lehenna/osu-autohost.git
```

### 2. Select a Task

- Issues: View the list of issues on GitHub. Select one that interests you or create a new one if you have any ideas.
- Roadmap: Check out our roadmap for upcoming features and improvements.

### 3. Make the Changes

Create a new branch:

```bash
git checkout -b my-new-branch
```

- Make your changes: Make sure you follow the code style guides and write clear comments.
- Test your changes: Check that everything works correctly and that nothing has broken.

### 4. Submit your Contribution

- Commits: Make meaningful and clear commits.

```bash
git add .
git commit -m "Clear description of changes"
```

- Push: Upload your changes to your fork.

```bash
git push origin my-new-branch
```

- Pull Request: Open a pull request in the main repository.

### 5. Review and Feedback

- Review: The maintenance team will review your pull request and give you feedback.
- Changes: If changes are required, make the necessary modifications.
- Merge: Once approved, your code will be merged into the project.

---

## License

This project is open source and free. We do not allow the use of the code for commercial purposes. See the [license](/LICENSE.md) for more details.

---

With Osu Autohost, your osu multiplayer experience! It will be easier and more fun than ever! 🚀
