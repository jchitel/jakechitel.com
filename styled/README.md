# styled-components

I am creating my own minimal version of styled-components so that I can support things like:
* Hooks

This is a description of the operation of styled-components internals so I know how to implement this.

## Top-Level API

The top-level API of styled-components is:

* `styled` (as default): The primary styled component constructor. By itself, it is a function used to create a constructor for an arbitrary component (e.g. `styled(MyComponent)`). However, it also includes built-in constructors for all HTML elements (e.g. `styled.div`). This function calls `constructWithOptions(StyledComponent, tag)` where tag is either the HTML element name or a component.
* `css`: A constructor for a compiled set of style rules. It takes styles (which can come in many forms) and a set of interpolations (as in template literal interpolations) and returns a rule set. More details on this below.
* `keyframes`: Another constructor used to build CSS keyframes for animations. This calls `css` internally and then builds a `Keyframes` instance. More details on this below.
* `createGlobalStyle`: Another constructor used to build globally defined stlyes. More details on this below.
* `isStyledComponent`: Returns whether a component type is a styled component.
* `ThemeConsumer`: The context consumer type for a theme. More details on this in the theme section.
* `ThemeContext`: The actual context type for themes. More details on this in the theme section.
* `ThemeProvider`: The context provider type for a theme. More details on this in the theme section.
* `withTheme`: A HOC for providing themes to a component. More details on this in the theme section.
* `ServerStyleSheet`: A utility type used for server-side rendering. More details on this in the style sheet section.
* `StyleSheetManager`: A component that exposes a style sheet context. More details on this in the style sheet section.

## `styled` Constructor

`styled` is a function and a namespace. The type of the function is (effectively):

```ts
const styled: (tag: Target) => (strings: TemplateStringsArray, ...args: Interpolation[]) => React.ComponentType;

type Target = string | React.ComponentType;
type Interpolation = ...; // we'll cover this in a bit
```

It's a higher-order function that returns a template literal function that creates a component.

`styled` is also a namespace that provides a template literal function for each HTML element type:

```ts
namespace styled {
    ...
    export const div: (strings: TemplateStringsArray, ...args: Interpolation[]) => React.ComponentType;
    ...
}
```

Let's look at the definition of `styled`:

```ts
const styled = (tag: Target) => constructWithOptions(StyledComponent, tag);

domElements.forEach(el => styled[el] = styled(el));

function constructWithOptions(
    componentConstructor: (tag: Target, options: Options, rules: RuleSet) => React.ComponentType,
    tag: Target,
    options: Options = {},
): (strings: TemplateStringsArray, ...args: Interpolation[]) => React.ComponentType {
    const templateFunction = (strings: TemplateStringsArray, ...args: Interpolation[]) => componentConstructor(tag, options, css(strings, ...args));

    templateFunction.withConfig = (config: Options) =>
        constructWithOptions(componentConstructor, tag, { ...options, ...config });

    templateFunction.attrs = (attrs: Attrs) =>
        constructWithOptions(componentConstructor, tag, {
            ...options,
            attrs: [...options.attrs, ...attrs].filter(Boolean)
        });
    
    return templateFunction;
}

interface Options {
    displayName?: string;
    componentId?: string;
    ParentComponent?: React.ComponenType;
    parentComponentId?: string;
    attrs?: Attrs;
}

function StyledComponent(target: Target, options: Options, rules: RuleSet): React.ComponentType {

}
```

## `css` Constructor

## `keyframes` Constructor

## `createGlobalStyle` Constructor

## Themes

## Style Sheets
