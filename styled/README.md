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

Let's walk through a call to `styled`:

So, you have a tag (either a React component or a valid HTML tag name), and you want to give it ***style***.
You take that bad boy and pass it to `styled`. This takes the tag and passes it straight to `constructWithOptions`, which has the following signature:

```ts
function constructWithOptions(
    componentConstructor: (tag: Target, options: Options, rules: RuleSet) => React.ComponentType,
    tag: Target,
    options: Options = {}
): (strings: TemplateStringsArray, ...args: Interpolation[]) => React.ComponentType;
```

Our tag is passed to the second arg, and the first arg is given a function called `createStyledComponent`, which we'll get to in a moment. The options are left alone. `constructWithOptions()` validates the tag, and then creates the template function that will be the main API for your styled component. This template function has this type:

```ts
interface StyledTemplateFunction {
    (strings: TemplateStringsArray, ...args: Interpolation[]): React.ComponentType;
    withConfig(config: Options): StyledTemplateFunction;
    attrs(attrs: Attrs): StyledTemplateFunction;
}
```

`withConfig` will reconstruct a new template function with the provided options overriding the current options. `attrs` will reconstruct a new template function with the provided attributes appended to the current `options.attrs`. While we're discussing options, here's the type:

```ts
interface Options {
    displayName?: string;
    componentId?: string;
    ParentComponent?: React.ComponentType;
    parentComponentId?: string;
    attrs?: Attrs;
}
```

We'll go over that more in a bit. So all that `constructWithOptions()` does is create that function, add the additional methods, and then return it. And that's it! That's all that `styled` does.

Well that's not very exciting. That's because the real action happens in the template function itself. Let's see how `constructWithOptions()` defines that:

```ts
const templateFunction = (...args) => componentConstructor(tag, options, css(...args));
```

Both the template strings array and the interpolation values are all passed into `css`, which is a function we'll look at in more detail in the next section. For now, let's just see its signature:

```ts
function css(styles: Styles, ...interpolations: Interpolation[]): RuleSet;
```

`Styles` is a union type, and one of the allowable values is a template strings array. `css` returns a `RuleSet`, which is a flattened list of style strings or injectables.

So when the template function is actually invoked, the template strings, interpolated values, tag, and options are all passed into the `componentConstructor`, which is, in our case, `createStyledComponent`. Let's take a look at that:

```ts
function createStyledComponent(target: Target, options: Options, rules: RuleSet): React.ComponentType;
```

This is where the magic happens. First, the options are extracted, with the following defaults:
* `displayName` is defaulted to a generated name. If `target` is an HTML tag, this is `styled.${target}`, otherwise it is `Styled(${getComponentName(target)})` (`getComponentName` follows the standard React naming conventions).
* `componentId` is defaulted to a generated component ID. This factors in the `displayName`, the `parentComponentId` (if provided), and an incrementing identifer, to ensure that every styled component has a unique ID.
* `ParentComponent` is defaulted to `StyledComponent`, which we'll cover in a bit.
* `attrs` is defaulted to an empty array.

A `styledComponentId` is then assembled. If the original options contained both a `displayName` and `componentId`, these are combined to produce this. If only a `componentId` was provided, that is used. Otherwise, this is the generated component ID from above. We then assemble the `attrs` array. If the `target` is already a styled component, its attributes are concatenated with the provided ones.

We then produce a `ComponentStyle` instance:

```ts
class ComponentStyle {
    isStatic: boolean;

    constructor(public rules: RuleSet, attrs: Attrs, public componentId: string);
    generateAndInjectStyles(executionContext: unknown, styleSheet: StyleSheet): string;
}
```

The provided `rules` are appended to the `target`'s existing rules if it is already a styled component. The `isStatic` property is set to true if hot module reloading is not currently active and the provided rules and attributes are determined to be static. This is determined by whether the rules or attributes require computation. If neither require this, then the style is considered static.

The `generateAndInjectStyles()` function is key here. This is what actually translates the styles passed to the template function into something that can be put in the DOM's style tag. The provided `StyleSheet` is the interface for this injection. The `executionContext` is the argument that is passed to any functions in the style rules for dynamic styles. The return value is the resulting class name that will be used for the component, and is computed from the hash of the component ID and the resulting styles.

Now, we actually create the wrapper component that will be returned. This component is a ref-forwarded function component that renders `ParentComponent`, which, if you remember, is `StyledComponent` by default. All props are passed directly into this component. We'll look at `StyledComponent` in a moment.

After the component is created, the following are attached to it as static fields:
* `attrs`: the final attributes array from the options
* `componentStyle`: the `ComponentStyle` instance we just made.
* `displayName`: the display name from the options, or the generated display name
* `foldedComponentIds`: this combines this component's `styledComponentId` with any component IDs on the target, if it is itself a styled component.
* `styledComponentId`: just this component's `styledComponentId`.
* `target`: the passed target. If that is a styled component, then that component's target is used.
* `withComponent()`: a method that allows the tag to be swapped out with a different one.
* `toString()`: renders the component ID as a class selector
All static properties on the underlying `target` are hoisted up to the wrapper component, if the target is a class.

So that's the component that will be rendered. It looks like this:

```tsx
const Wrapper = React.forwardRef((props, ref) => (
    <ParentComponent {...props} forwardedComponent={Wrapper} forwardedRef={ref} />
));
```

You can see that the wrapper itself is passed as a prop to the actual component, because that is the component that contains the actual properties.

Let's look at `StyledComponent` now. This is the big one:

```tsx
class StyledComponent extends React.Component<unknown> {
    styleSheet: StyleSheet;
    attrs = {};

    render() {
        return <StyleSheetConsumer>{this.renderOuter}</StyleSheetConsumer>;
    }

    renderOuter = (styleSheet: StyleSheet = StyleSheet.master) => {
        this.styleSheet = styleSheet;

        // if we determined the styles to be static, just go directly to the actual render
        if (this.props.forwardedComponent.componentStyle.isStatic) return this.renderInner();

        return <ThemeConsumer>{this.renderInner}</ThemeConsumer>;
    }

    renderInner = (theme?: Theme) => {
        const {
            componentStyle, defaultProps, displayName, foldedComponentIds, styledComponentId, target
        } = this.props.forwardedComponent;

        const generatedClassName = this.generateAndInjectStyles(/* some stuff */);

        const elementToBeCreated = this.props.as || this.attrs.as || target;
        const computedProps = { ...this.attrs, ...this.props };
        const propsForElement = { /* some stuff */ };
        propsForElement.className = [
            ...foldedComponentIds,
            this.props.className,
            styledComponentId,
            this.attrs.className,
            generatedClassname,
        ].filter(Boolean).join(' ');

        return React.createElement(target, propsForElement);
    }
}
```

So, we don't have any lifecycle methods, which certainly makes things simpler. Our `render()` returns a `<StyleSheetConsumer>` with `renderOuter` as a render prop. `StyleSheetConsumer` is simply a context consumer for the `StyleSheetContext`, which is managed by the `StyleSheetManager`. Let's grab a look at that real quick:

```tsx
interface StyleSheetManagerProps {
    children: React.Element<unknown>;
    sheet?: StyleSheet;
    target?: HTMLElement;
}

class StyleSheetManager extends React.Component<StyleSheetManagerProps> {
    render() {
        const { children, sheeet, target } = this.props;
        const context = sheet || (target ? new StyleSheet(target) : null);
        if (!context) throw new Error('...');

        return <StyleSheetContext.Provider value={context}>{children}</StyleSheetContext.Provider>;
    }
}
```

The `StyleSheetManager` must be passed either an existing `StyleSheet` or an element to use for a new `StyleSheet`. Let's take a look at `StyleSheet`:

```ts
class StyleSheet {
    id: number = sheetRunningId++;
    target?: HTMLElement;
    tagMap: { [key: string]: Tag } = {};
    deferred: { [key: string]: string[] } = {};
    rehydratedNames: { [key: string]: boolean } = {};
    ignoreRehydratedNames: { [key: string]: boolean } = {};
    tags: Tag[] = [];
    importRuleTag: Tag;
    capacity: number = 1;
    clones: StyleSheet[] = [];

    constructor(
        target: HTMLElement = IS_BROWSER ? document.head : null,
        public forceServer = false
    ) {
        this.target = forceServer ? null : target;
    }
}
```

There's a lot more to this class, but we're just looking at what happens when we create a `StyleSheet` at the moment. So, one of these `StyleSheetManager`s can be used in order to control where the resulting styles get injected, but this is not absolutely essential because `StyledComponent` will default to using `StyleSheet.master`.

The render prop that we pass to the `StyleSheetConsumer` is `renderOuter`, which will determine if the styles are static, and then call `renderInner`. If the styles are static, `renderInner` is called directly. Otherwise, it is passed to a `ThemeConsumer`, which is another context consumer. A "theme" in styled-components can be any object that allows dynamic styles to render a specific way. We see why `ThemeConsumer` is only used when the styles are dynamic, because static styles are not at all dependent on the theme. The process here is fairly self-explanatory. One thing to note is that themes are merged in the case of multiple `ThemeProvider`s. A `ThemeProvider` will first check to see if there is an existing theme context, and attempt to merge that with its own provided them, so any downstream components will get a merged result of both themes.

Now we arrive at `renderInner`. What we see above is a heavily simplified version of what actually happens, but it covers all the important points. First, we generate and inject the styles to get a resulting class name. This calls the `generateAndInjectStyles()` method, but there are a few cases that will call it differently:
* If the styles are static, `generateAndInjectStyles()` is called with an empty object as the execution context (because there are no dynamic styles).
* If the styles are dynamic and the `ThemeConsumer` provided a theme, the execution context is determined based on the provided props, the provided theme, and the default props. If there was a theme in the props and it is NOT equal to the theme from the default props, then that is used. If there was no theme in the props OR the props theme is equal to the default theme, then the context theme is used. If there was no props them OR the props theme is equal to the default theme AND there is no context theme, the default theme is used.
* If the styles are dynamic and there was no context theme, then the execution context is the props theme, defaulting to an empty object.

The `generateAndInjectStyles` method will call `ComponentStyle.generateAndInjectStyles` with `this.styleSheet`, with the following cases:
* If the styles are static and there are no attributes, pass an empty object as the execution context.
* Otherwise built the execution context from the determined theme, the props, and the attributes. This will call `buildExecutionContext`.

`buildExecutionContext` will first build a context by adding the determined theme to the props object. If there are no attributes, this is returned. If there were attributes, then we iterate over all of them. If an attribute is a function, the context is passed to it to get the resolved attribute definition. Otherwise it is treated as an object. In either case, the resulting object is merged into the context, and then the context is returned.

We then go into `ComponentStyle.generateAndInjectStyles`. This does a final resolution of the entire rule set using the provided execution context, and then merges all of the rules into one string. The component ID is prepended and the whole thing is hashed to produce the class name. If that class name does not currently exist for that component ID in the style sheet, then it is injected. First, the rules are stringified using a function called `stringifyRules`:

```ts
function stringifyRules(
    rules: Interpolation[],
    selector: string,
    prefix?: string,
    componentId = '&'
): string;
```

This assembles the styles into a valid Stylis style definition, and then passes that string into the Stylis compiler, which spits out valid CSS. In this case, the `selector` is the generated class name, and the component ID is our component's ID. That component ID is used by custom Stylis plugins to handle special styled-components logic.

Then, the component ID, the compiled styles, and the generated class name are passed into `StyleSheet.inject()`. The basic process here is that the style tag for this component is resolved, and the rules are inserted into that tag. This may involve creating a new tag, as there is an optimal size for style tags to ensure the browser doesn't have to do too much reprocessing. We won't go into this because the process is fairly self-explanatory and very detailed.

After all that, `renderInner` has a generated class name, and the corresponding styles exist in the DOM. We then determine the element to render and the props to pass to it. The element to render is determined by the `as` prop, which can also come from an `as` attribute. If neither are specified, the `target` that we passed to `styled` is used.

We then determine the props. Everything in the props and attrs is merged into one object. We then filter out `forwardedComponent` and `as`, as those are used only by `StyledComponent`. The `forwardedRef` prop is translated to `ref`, and all other props are taken as is. Any `style` value found in props and attrs are merged together.

We then compute the final className, in this order:
* the folded component IDs (from any parent styled components)
* a className that may have been passed in the props
* the computed `styledComponentId` from `createStyledComponent`
* a className that may have been passed in the attrs
* the className generated by `ComponentStyle` based on the rules

And then we finally call `React.createElement(element, props)`!.

And that's it! Many of the complexities in this process surrounded optimizations (such as static vs. dynamic styles) and extra features like attrs and the ability to override properties through the whole process. We won't carry over many of these. Additionally, there were a lot of wrapper components and deep component trees involved. We'll be working with function components and hooks to simplify a lot of this.

## `css` Constructor

`css` is a template function with the following signature:

```ts
function css(styles: Styles, ...interpolations: Interpolation[]): RuleSet;
```

`Styles` can be a template strings array, but it can also be an object, or a function that returns an `Interpolation`. The flow types unfortunately do not make this very clear, so we'll explore what happens when you call this guy.

If `styles` is a function or an object, it is passed to `interleave` and then `flatten`, as so:

```ts
return flatten(interleave([], [styles, ...interpolations]));
```

If it is a regular template strings array, it is passed like this:

```ts
return flatten(interleave(styles, interpolations));
```

We've seen these functions before, but let's inspect them in greater detail.

`interleave` is a function that combines template strings with interpolations as they are laid out at definition. JavaScript will natively put the strings in their own array, and then provide the interpolations as rest args after that array. styled-components prefers to have them interleaved together.

```ts
function interleave(strings: string[], interpolations: Interpolation[]): Array<string | Interpolation> {
    return [strings[0], ...interpolations.reduce((array, interpolation, i) => [...array, interpolation, strings[i + 1]], [])];
}
```

This produces a single array with all strings and interpolations laid out as they are defined.

`flatten` is a bit more complicated. It takes an array of style strings or interpolations, or just one of these things, and turns it into something that can be processed by further steps, sort of a normalization. Here is the signature:

```ts
function flatten(chunk: unknown, executionContext?: unknown, styleSheet?: StyleSheet): RuleSet;
```

This isn't entirely accurate because the `chunk` has to be a bit more narrow than `unknown`, but there are a lot of things it can take. Here are the cases and how they are handled:
* If `chunk` is an array, then `flatten` is called on each element of the array. If the result is null, it is ignored. If the result is another array, it is spread into a results array. Any other result is treated as a single item and added to the results array. The whole results array is then returned.
* If `chunk` is falsish (null, undefined, false, or an empty string), `null` is returned.
* If `chunk` is a styled component, then a class selector is returned for the component's ID. Effectively, this allows a component to be interpolated into a style string to use that component in a selector.
* If `chunk` is a function and `executionContext` is provided, then first it is determined whether the `chunk` is a non-styled-component. If this is the case, an error is thrown. Otherwise, it is treated as a regular function. The `executionContext` is provided to this function, and the result is passed into `flatten`, the result of which is returned.
* If `chunk` is a function and `executionContext` is not provided, then execution of the function is deferred until the `executionContext` is available, and the function is returned unchanged.
* If `chunk` is a `Keyframes` instance and the `styleSheet` is provided, that instance is injected into the style sheet and the name of the instance is returned.
* If `chunk` is a `Keyframes` instance and the `styleSheet` is not provided, the instance is returned as is, so the execution will be deferred until the style sheet is available.
* If `chunk` is an object, it is converted to a CSS string. The process for this takes any key-value pair with a non-object value and converts it to a single rule, and key-value pairs with object values have the key treated as a nested selector, and the value treated as a set of rules. This can be nested arbitrarily deep.
* Any other chunks are converted to strings via `.toString()`.

What this means is that the return value of `flatten` (in the case of a `css` call) will always be an array containing either strings, functions (deferred dynamic styles), or `Keyframes` instances (deferred keyframes). If `flatten` is called with an execution context and a style sheet, then the array will always be just strings.

And the result returned from `flatten` is returned directly from `css`, so that's it!

## `keyframes` Constructor

`keyframes` is yet another constructor, with the following signature:

```ts
function keyframes(strings: Styles, ...interpolations: Interpolation[]): Keyframes;
```

Again, `Styles` can be a template strings array or a few other things, effectively the same things as `Interpolation`s.

The implementation passes everything straight to `css`, and then produces a name from the hash of the resulting rule set.

That name, and the rules, are then passed to `stringifyRules`, which we saw in `styled` as the function that compiles the style strings into actual CSS. Let's take a closer look at this function:

```ts
function stringifyRules(
    rules: Interpolation[],
    selector: string,
    prefix?: string,
    componentId: string = '&'
): string[] {
  const flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

  const cssStr = selector && prefix ? `${prefix} ${selector} { ${flatCSS} }` : flatCSS;

  _componentId = componentId;
  _selector = selector;
  _selectorRegexp = new RegExp(`\\${_selector}\\b`, 'g');

  return stylis(prefix || !selector ? '' : selector, cssStr);
}
```

So, if there is a prefix and a selector, then the string is wrapped in a `${prefix} ${selector} { ${css} }` block, otherwise it is left as is. If there is a prefix or NO selector, then an empty string is provided as a selector, otherwise the provided selector is used. Since a selector is required, this basically means that if a prefix is provided, it is injected into the string before compilation, with no selector provided to the compiler.

`stylis` is an instance of the Stylis class. Its type is:

```ts
function stylis(namescope: string, input: string): string;
```

The provided `namescope` is the selector that the provided `input` styles are attached to. Any loose styles not under a selector are associated with this, and any `&` is associated with this selector. The return value is valid CSS that can be injected into the DOM.

In `keyframes`, we call `stringifyRules(rules, name, '@keyframes')`. Because a prefix is provided, this means the provided rules will be wrapped in a `@keyframes ${name} { ... }`, and there will be no selector passed to Stylis. This will compile the provided styles as-is, wrapped in the keyframes block. The name and the compiled styles are then passed to the `Keyframes` constructor:

```ts
class Keyframes {
    id: string;

    constructor(public name: string, public rules: string[]) {
        this.id = `sc-keyframes-${name}`;
    }

    inject = (styleSheet: StyleSheet) => {
        if (!styleSheet.hasNameForId(this.id, this.name)) {
            styleSheet.inject(this.id, this.rules, this.name);
        }
    };
}
```

What this means is that, for keyframes, a unique ID is generated separate from any component. This allows a keyframes instance to be used for several components. The keyframes instance can be passed into a `styled` template string, and we've seen that if a style sheet is passed into `flatten`, then the keyframes will be injected into that style sheet at that time. The resulting name is then returned.

## `createGlobalStyle` Constructor

Our last constructor is `createGlobalStyle`. It has a similar signature to the others:

```ts
function createGlobalStyle(strings: TemplateStringsArray, ...interpolations: Interpolation[]): GlobalStyleComponent;
```

Just like with `keyframes`, the arguments are passed straight to `css` to get a rule set. That rule set is then used to generate an ID from a hash. The rules and the ID are then passed to a `GlobalStyle` instance:

```ts
class GlobalStyle {
    isStatic: boolean;
    constructor(public rules: RuleSet, public componentId: string) {
        this.isStatic = isStaticRules(rules);
        if (!StyleSheet.master.hasId(componentId)) {
            StyleSheet.master.deferredInject(componentId, []);
        }
    }

    createStyles(executionContext: unknown, styleSheet: StyleSheet): void;
    removeStyles(styleSheet: StyleSheet): void;
    renderStyles(executionContext: unknown, styleSheet: StyleSheet): void;
}
```

This is effectively a simpler version of `ComponentStyle` used by `styled`. `createStyles` simply `flatten`s the rules, then compiles them, then injects them into the style sheet. `removeStyles` removes the styles from the style sheet. `renderStyles` does a remove and a create, assumedly to refresh them.

After the `GlobalStyle` instance is created, a `GlobalStyleComponent` is created and then returned. This component stores the `GlobalStyles` instance and the ID as component state. The amount of components rendering those styles is tracked, and the styles are removed from the page when that number reaches 0.

The render process follows a more simplified process of the one used by `StyledComponent`. A `StyleSheetConsumer` followed by a `ThemeConsumer` is used to get the style sheet and the theme (no theme is necessary when the styles are static). When a theme is used, it uses the same logic as before to build the execution context from the props, theme, and default props. The styles are then injected into the style sheet. However, instead of rendering something, `null` is returned from this `render` function, as all that is being rendered is some global styles.

## Themes

## Style Sheets



## Babel Plugin

In order to work correctly with server side rendering (among other things), styled-components requires a babel plugin.

This plugin adds the following visitors:
* For `JSXAttribute`
    * `transpileCssProp`
* For `CallExpression`
    * `displayNameAndId`
    * `pureAnnotation`
* For `TaggedTemplateExpression`
    * `minify`
    * `displayNameAndId`
    * `templateLiterals`
    * `pureAnnotation`
* For `VariableDeclarator`
    * `assignStyledRequired`

It has the following configuration options:
* `displayName` (default true)
* `ssr` (default true)
* `fileName` (default true)
* `minify` (default true)
* `transpileTemplateLiterals` (default true)
* `pure` (default false)
* `cssProp` (default true)

The only visitor that concerns us for server-side rendering is `displayNameAndId`:

### `displayNameAndId`

This visitor is used for both `CallExpression`s and `TaggedTemplateExpression`s.

This visitor is quite simple. It looks for all usages of the `styled` constructor and inserts a `withConfig` call with auto-generated `displayName` and `componentId` properties.

The `displayName` property can be turned off by setting the `displayName` option to false (it is true by default).

The `componentId` property can be turned off by setting the `ssr` option to false (it is true by default).

This is one of the visitors required for server-side rendering to work, so we'll go into a bit more detail on the `componentId` property.

If the `ssr` option is on (it is by default), the `getComponentId` function is called:

```js
const getComponentId = state => {
    return `${prefixLeadingDigit(getFileHash(state))}-${getNextId(state)}`;
}

const COMPONENT_POSITION = 'styled-components-component-position';
const separatorRegExp = new RegExp(`\\${path.sep}`, 'g');

const getFileHash = state => {
    const filename = state.file.opts.filename;
    // find module root directory
    const moduleRoot = findModuleRoot(filename);
    const filePath = path.relative(moduleRoot, filename).replace(separatorRegExp, '/');
    const moduleName = require(path.join(moduleRoot, 'package.json')).name;

    return hash(`${moduleName}${filePath || state.file.code}`);
}

const findModuleRoot = filename => {
    let dir = path.dirname(filename);
    if (fs.existsSync(path.join(dir, 'package.json'))) {
        return dir;
    } else if (dir !== filename) {
        return findModuleRoot(dir);
    } else {
        // Made it all the way to the root.
        // This shouldn't happen because a package.json was required to get this plugin.
        return null;
    }
}

const prefixLeadingDigit = str => str.replace(/^(\d)/, 'sc-$1');

const getNextId = state => {
    const id = state.file.get(COMPONENT_POSITION) || 0;
    state.file.set(COMPONENT_POSITION, id + 1)
    return id
}
```

We can see what this does:
1. First, we get a hash of the file. This is composed of the module name from the package.json and the path of the file relative to its module root. The hashing algorithm is a murmur hash, but that is irrelevant to this. If the module root was unable to be found, the module name will be null, and the file's code will be used instead for the hash. However, as usage of this plugin all but requires a package.json, we can safely assume that this won't happen.
2. Then, we ensure that if the hash starts with a number, it is prefixed with "sc-" so that it can be used as a class name.
3. Then, an ID is appended to this hash, with a "-" in between. This ID is tracked throughout the file, and incremented for each component in the file.

The result is that we get a unique ID for each component, using a hash of the module path and the component's position within the module. This is assumedly used in classname generation. When we provide an explicit ID for a component, that ID will always be the same on the client and the server.

This is how styled-components has opted to handle this. However, we can handle it in other ways.

### Conclusion

We can sidestep this solution by either requiring a unique component ID to be specified for each component (which would be obnoxious) or by simply ensuring that component IDs will always be computed the same way on the client and the server. There are many ways to handle this.
