import * as fs from "fs";
import * as path from "path";
import * as log4js from "log4js";
import * as Updated from "./update";

interface RunModel {
    config :string,
    debug :boolean,
    loglevel :string,
    core :string,
    port: string,
    current: string,
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const argv :RunModel = require('yargs')
    .alias('c', 'config')
    .alias('l', 'log')
    .alias('d', 'debug')
    .alias('cv', 'current')
    .argv;
global.Project = {
    env: 'prod',
    loglevel: 'INFO',
    config : 'config.json',
    version: '',
    core: 'packages/core',
    currentVersion: '0',
    port: '8060'
};
if (argv.debug) {
    global.Project.env = 'dev';
    global.Project.loglevel = 'DEBUG';
}
if (argv.loglevel) {
    global.Project.loglevel = argv.loglevel;
}
if (argv.config) {
    global.Project.config = argv.config;
}
if (argv.core) {
    global.Project.core = argv.core;
}
if (argv.port) {
    global.Project.port = argv.port;
}
if (argv.current) {
    global.Project.currentVersion = argv.current;
}

async function run() {
    const logger = await log4js.getLogger('main');
    logger.level = global.Project.loglevel;
    global.Project.CoreJSON = JSON.parse((await fs.readFileSync(path.join(global.Project.core, 'package.json'))).toString());
    global.Project.log = {
        main: logger,
	}
	
    async function RunAll(packages, paths, type) {
        for (const pack in packages) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const runner = require(path.join(process.cwd(), paths, packages[pack]));
            runner.apply();
            logger.info(`${type} ${packages[pack]} Loaded.`);
        }
	}
	
    async function RunFile(pack, packname, type) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const runner = require(path.join(process.cwd(), pack));
        runner.apply();
        logger.info(`${type} ${packname} Loaded.`);
    }

    try {
        const files = await fs.readFileSync(global.Project.config);
        global.Project.config = JSON.parse(files.toString());
        const ServiceDir = await fs.readdirSync(path.join(global.Project.core, 'service'));
        await RunAll(ServiceDir, path.join(global.Project.core, 'service'), 'service');
        await Updated.run();
        await RunFile(path.join(global.Project.core, 'handle'), 'handle', 'handle');
        const Handler = await fs.readdirSync(path.join(global.Project.core, 'handler'));
        await RunAll(Handler, path.join(global.Project.core, 'handler	'), 'handler');
	} catch (err) {
        console.log(err);
	}

}

run();