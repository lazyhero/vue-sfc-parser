import fs from 'fs';
import path from 'path';
import {parserSFC} from './index';

const source = fs.readFileSync(path.resolve(__dirname, './test.vue'), 'utf-8');
console.log(parserSFC(source));
