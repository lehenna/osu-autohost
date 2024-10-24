import { spawn } from "bun";
import {
  copy as copyDir,
  copyFile,
  ensureDir,
  readdir,
  readFile,
  stat,
  writeFile,
} from "fs-extra";
import { join } from "path";
import { createWriteStream } from "fs";
import archiver from "archiver";

import packageData from "./package.json";

const WEBSITE_DIR = join(__dirname, "website");
const SERVER_DIR = join(__dirname, "server");
const MIGRATIONS_DIR = join(__dirname, "server", "drizzle");
const PROJECT_DIR = join(__dirname, "dist");

async function websiteBuild(): Promise<void> {
  return await new Promise((resolve) => {
    spawn({
      cmd: ["bun", "run", "build"],
      cwd: WEBSITE_DIR,
      onExit: () => {
        resolve();
      },
    });
  });
}

async function serverBuild(): Promise<void> {
  return await new Promise((resolve) => {
    spawn({
      cmd: ["bun", "run", "build"],
      cwd: SERVER_DIR,
      onExit: () => {
        resolve();
      },
    });
  });
}

async function build() {
  await websiteBuild();
  await serverBuild();
}

const SETTINGS = {
  username: "",
  apiKey: "",
  password: "",
  oauth: {
    clientId: 0,
    redirectUri: "",
    secret: "",
  },
};
const PACKAGE_JSON = {
  name: "osu-autohost",
  version: packageData.version,
  scripts: {
    start: "bun run src/index.js",
  },
  dependencies: {
    irc: "^0.5.2",
    "rosu-pp-js": "^1.1.0",
  },
};

async function createProject() {
  await ensureDir(PROJECT_DIR);
  await copyDir(join(WEBSITE_DIR, "dist"), join(PROJECT_DIR, "public"));
  await copyDir(MIGRATIONS_DIR, join(PROJECT_DIR, "drizzle"));
  await writeFile(
    join(PROJECT_DIR, "package.json"),
    JSON.stringify(PACKAGE_JSON, null, 1)
  );
  await writeFile(
    join(PROJECT_DIR, "settings.json"),
    JSON.stringify(SETTINGS, null, 1)
  );
  await ensureDir(join(PROJECT_DIR, "src"));
  await copyFile(
    join(SERVER_DIR, "dist/index.js"),
    join(PROJECT_DIR, "src/index.js")
  );
}

interface ZipFile {
  name: string;
  content: Buffer;
}

async function createZip(files: ZipFile[], outPath: string) {
  const output = createWriteStream(`${outPath}.zip`);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise<void>((resolve, reject) => {
    output.on("close", () => {
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    files.forEach((file) => {
      archive.append(file.content, { name: file.name });
    });

    archive.finalize();
  });
}

async function getFiles(dir: string, root: string = "") {
  const zipFiles: ZipFile[] = [];
  const files = await readdir(dir);
  for (const fileName of files) {
    const fileDir = join(dir, fileName);
    const fileStat = await stat(fileDir);
    const name = root + fileName;
    if (fileStat.isDirectory()) {
      zipFiles.push(...(await getFiles(fileDir, `${name}/`)));
      continue;
    }
    const content = await readFile(fileDir);
    zipFiles.push({
      name,
      content,
    });
  }
  return zipFiles;
}

const RELEASES_FOLDER = join(__dirname, "releases");
const RELEASE_FILENAME = `Osu Autohost [v${packageData.version}]`;

async function createRelease() {
  const zipFiles = await getFiles(PROJECT_DIR);
  await ensureDir(RELEASES_FOLDER);
  createZip(zipFiles, join(RELEASES_FOLDER, RELEASE_FILENAME));
}

(async () => {
  await build();
  await createProject();
  await createRelease();
})();
