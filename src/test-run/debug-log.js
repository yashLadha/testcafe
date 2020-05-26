/* eslint-disable */
import { inspect } from 'util';
import debugLogger from 'debug';
import indentString from 'indent-string';

export default class TestRunDebugLog {
    constructor (userAgent) {
        this.driverMessageLogger = debugLogger(`testcafe:test-run:${userAgent}:driver-message`);
        this.commandLogger       = debugLogger(`testcafe:test-run:${userAgent}:command`);
    }

    static _addEntry (logger, data, options = {}) {
        try {
            const entry = data ?
                indentString(`\n${inspect(data, { compact: false })}\n`, ' ', 4) :
                '';

            logger(entry);
        }
        catch (e) {
            logger(e.stack ? e.stack : String(e));
        }
    }

    driverMessage (msg) {
        TestRunDebugLog._addEntry(this.driverMessageLogger, msg);
    }

    command (cmd, options = {}) {
        TestRunDebugLog._addEntry(this.commandLogger, cmd, options);
    }
}
