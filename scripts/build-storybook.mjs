import { cp, mkdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = repoRoot.includes('#') ? await createTemporaryWorkspace(repoRoot) : repoRoot;

try {
  if (workspaceRoot !== repoRoot) {
    await run(['install', '--frozen-lockfile'], workspaceRoot);
  }

  await run(['--filter', 'storybook', 'build'], workspaceRoot);

  if (workspaceRoot !== repoRoot) {
    await copyStorybookOutput(workspaceRoot, repoRoot);
  }
} finally {
  if (workspaceRoot !== repoRoot) {
    await rm(workspaceRoot, { recursive: true, force: true });
  }
}

async function createTemporaryWorkspace(sourceRoot) {
  const digest = createHash('sha1').update(sourceRoot).digest('hex').slice(0, 10);
  const targetRoot = join(tmpdir(), `hud-kit-storybook-build-${digest}`);

  await rm(targetRoot, { recursive: true, force: true });
  await mkdir(targetRoot, { recursive: true });
  await cp(sourceRoot, targetRoot, {
    recursive: true,
    filter(source) {
      const pathParts = relative(sourceRoot, source).split(/[\\/]/).filter(Boolean);
      const excluded = new Set([
        '.git',
        '.turbo',
        'coverage',
        'dist',
        'node_modules',
        'storybook-static',
      ]);

      return !pathParts.some((part) => excluded.has(part)) && !source.endsWith('.tsbuildinfo');
    },
  });

  return targetRoot;
}

async function copyStorybookOutput(sourceRoot, targetRoot) {
  const source = resolve(sourceRoot, 'apps/storybook/storybook-static');
  const target = resolve(targetRoot, 'apps/storybook/storybook-static');

  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
}

function run(args, cwd) {
  const command = process.platform === 'win32' ? 'cmd.exe' : 'pnpm';
  const commandArgs = process.platform === 'win32'
    ? ['/d', '/s', '/c', `pnpm ${args.join(' ')}`]
    : args;

  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, commandArgs, {
      cwd,
      stdio: 'inherit',
      env: {
        ...process.env,
        STORYBOOK_DISABLE_TELEMETRY: '1',
      },
    });

    child.on('error', rejectRun);
    child.on('exit', (code, signal) => {
      if (signal) {
        process.kill(process.pid, signal);
        return;
      }

      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 1}`));
    });
  });
}
