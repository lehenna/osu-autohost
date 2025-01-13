# Osu Autohost

> Create osu multiplayer rooms with auto host rotate system.

## Introduction

![Dashboard](/assets/dashboard.png)

Osu Autohost is a react and nodejs application that offers a web portal with which you can create and manage osu multiplayer rooms. In addition, the created rooms include an Autohost Rotate system along with different commands that create a pleasant gameplay.

### Preview (demo)

To see this application in action, you can do so [here](https://osu.lehenna.com/).

## Installation

### 1. Clone or download and unzip this repository.

```bash
git clone https://github.com/lehenna/osu-autohost.git
```

### 2. Install dependencies.

If you do not have [NodeJS](https://nodejs.org/) installed on your system, download and install it from its [official site](https://nodejs.org/en/download).

```bash
npm install
```

### 3. Create database.

```bash
npm run migrate
```

It will ask you to enter a name for the migrations, you can enter any name.

### 4. Build the application.

```bash
npm run build
```

### 5. Run the application.

The above steps are only necessary for the first time, after that you just need to start the application.

```bash
npm start
```

Now to view the application navigate to the following URL: `http://localhost:4173`

## Contribution

Contributions are welcome! Fork and push your changes and then request a pull.

## License

[MIT License](/LICENSE.md)
