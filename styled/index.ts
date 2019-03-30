import React from 'react';
import { DomKey, domElements } from './dom-elements';


interface ClassNameProps {
    className?: string;
}

type StyledFactories = {
    [P in DomKey]: StyledConstructor<JSX.IntrinsicElements[P]>
};

type Styled = StyledFactories & {
    of: <P extends ClassNameProps>(tag: React.ComponentType<P>) => StyledConstructor<P>
};

type StyledConstructor<P extends ClassNameProps> = (strings: TemplateStringsArray, ...interpolations: Interpolation<P>[]) => React.ComponentType<P>;

type Interpolation<P extends ClassNameProps> = string | ((props: P) => Interpolation<P>);

const styledOf = <P extends ClassNameProps>(tag: string | React.ComponentType<P>): StyledConstructor<P> => {
    return (strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>): React.ComponentType<P> => {
        const styles = css(strings, ...interpolations);
    }
};

const styled = { of: styledOf } as Styled;

for (const el of domElements) {
    styled[el] = styledOf(el) as StyledConstructor<any>;
}

const css = <P extends ClassNameProps>(strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>) => {
    const interleaved = [strings[0], ...strings.slice(1).reduce((arr, curr, i) => [...arr, curr, interpolations[i]], [])];
}
