import { parse as babelParse } from '@babel/parser'
// https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler
// @ts-ignore
import {parseComponent} from 'vue-template-compiler';

const parseHandler = {
    template(raw: any) {},
    script(raw: any) {
        if (raw && raw.content) {
            return babelParse(raw.content, {
                sourceType: 'module',
            })
        }
        return {};
    },
    styles(raw: any) {},
    customBlocks(raw: any) {},
    errors(raw: any) {},
}

interface Result {
    template?: any;
    script?: any;
}

export function parserSFC(source: string) {
    const result: Result = {};
    if (!source) return;
    const sfc = parseComponent(source);
    const sfcTargets = Object.keys(sfc);
    if (sfcTargets.length) {
        sfcTargets.reduce((res: Result, key: string) => {
            // @ts-ignore
            res[key] = parseHandler[key](sfc[key]);
            return res;
        }, result);
    } 
    return result;
}
