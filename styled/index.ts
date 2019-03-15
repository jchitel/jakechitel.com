import React from 'react';
import { DomKey, domElements } from './dom-elements';


type StyledFactories = {
    [P in DomKey]: StyledConstructor<JSX.IntrinsicElements[P]>
};

type Styled = StyledFactories & {
    createNew: <P>(tag: React.ComponentType<P>) => StyledConstructor<P>
};

const createNew = <P>(tag: string | React.ComponentType<P>) => {
    return (strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>) => {
        const styles = css(strings, ...interpolations);
    }
};

const styled: Styled = { createNew };

for (const el of domElements) {
    styled[el] = createNew(el);
}

type StyledConstructor<P> = (strings: TemplateStringsArray, ...interpolations: Interpolation<P>[]) => React.ComponentType<P>;


const css = <P>(strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>) => {
    const interleaved: Array<string | Interpolation> = [strings[0], ...strings.slice(1).reduce<string[]>((arr, curr, i) => [...arr, curr, interpolations[i]], [])]
}

type Interpolation<P> = string | ((props: P) => Interpolation<P>);
