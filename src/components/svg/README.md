# SVG Helper Components

The idea here is to implement a set of components that augment regular old SVG,
tailored toward people who want to write it by hand.

You should be able to plop these components into regular SVG, and also plop
regular SVG into these components.

The first idea I had for this was a component to build a `<path>` element in a
clean, readable way.

We could theoretically also add the ability to declare things that are usually
referenced (`<clipPath>`, `<filter>`, etc.), in an inline way.

I'm hoping to start making a lot of use out of SVG, so I'll just build things as
I go.

## Elements

### Animation

-   `<animate>`
-   `<animateMotion>`
-   `<animateTransform>`
-   `<discard>`
-   `<mpath>`
-   `<set>`

### Container Elements

-   `<a>`
-   `<defs>`
-   `<g>`
-   `<marker>`
-   `<mask>`
-   `<pattern>`
-   `<svg>`
-   `<switch>`
-   `<symbol>`

### Descriptive Elements

-   `<desc>`
-   `<metadata>`
-   `<title>`

### Filter Elements

-   `<filter>`
-   `<feBlend>`
-   `<feColorMatrix>`
-   `<feComponentTransfer>`
-   `<feComposite>`
-   `<feConvolveMatrix>`
-   `<feDiffuseLighting>`
-   `<feDisplacementMap>`
-   `<feDistantLight>`
-   `<feDropShadow>`
-   `<feFlood>`
-   `<feFuncA>`
-   `<feFuncB>`
-   `<feFuncG>`
-   `<feFuncR>`
-   `<feGaussianBlur>`
-   `<feImage>`
-   `<feMerge>`
-   `<feMergeNode>`
-   `<feMorphology>`
-   `<feOffset>`
-   `<fePointLight>`
-   `<feSpecularLighting>`
-   `<feSpotLight>`
-   `<feTile>`
-   `<feTurbulence>`

### Gradient Elements

-   `<linearGradient>`
-   `<radialGradient>`
-   `<stop>`

### Graphics Elements

-   `<clipPath>`
-   `<circle>`
-   `<ellipse>`
-   `<image>`
-   `<line>`
-   `<path>`
-   `<polygon>`
-   `<polyline>`
-   `<rect>`
-   `<use>` (reference?)

### Text Elements

-   `<text>`
-   `<textPath>`
-   `<tspan>`

### Miscellaneous Elements

-   `<foreignObject>`
-   `<script>`
-   `<style>`
-   `<view>`

### Experimental Elements

There will be no support for "experimental" elements as specified in the MDN
docs.

-   `<hatch>`
-   `<hatchpath>`

### Obsolete/Deprecated Elements

There will be no support for elements considered "obsolete" or "deprecated" as
specified in the MDN docs.

-   `<altGlyph>`
-   `<altGlyphDef>`
-   `<altGlyphItem>`
-   `<animateColor>`
-   `<cursor>`
-   `<font>`
-   `<font-face>`
-   `<font-face-format>`
-   `<font-face-name>`
-   `<font-face-src>`
-   `<font-face-uri>`
-   `<glyph>`
-   `<glyphRef>`
-   `<hkern>`
-   `<missing-glyph>`
-   `<tref>`
-   `<vkern>`

## Attributes

### Generic Attributes

#### Core Attributes

**`id`**

Same as HTML `id`.

Can be used with any SVG element.

-   Value: Any valid XML id
-   Defualt Value: _None_
-   Animatable: No

**`lang`**

Specifies the primary language used in contents and attributes containing text
content of particular elements. (Overridden by `xml:lang`.)

Can be used with any SVG element.

-   Value: Any valid language tag (e.g. `en-US`)
-   Default Value: _None_
-   Animatable: No

**`tabindex`**

Same as HTML `tabindex`.

Can be used with any SVG element.

-   Value: Any valid integer
-   Default Value: _None_
-   Animatable: No

**`xml:lang`**

Specifies the primary language used in contents and attributes containing text
content of particular elements. (Overrides `lang`.) This is required for all XML
dialects.

Can be used with any SVG element.

-   Value: Any valid language tag (e.g. `en-US`)
-   Default Value: _None_
-   Animatable: No

#### Style Attributes

**`class`**

Same as HTML `class`.

-   Categories: None
-   Value: Any valid list of class names
-   Animatable: Yes

**`style`**

Same as HTML `style`.

Can be used with any SVG element.

-   Value: Any valid CSS string
-   Default Value: _None_
-   Animatable: No

#### Conditional Processing Attributes

Used control when elements are processed. If on an isolated element, these
attributes operate as a simple "if" condition. If used on **direct** children of
a `<switch>` element, then the first child that matches the requirements of all
properties will be processed, and all others are ignored.

**`requiredExtensions`**

List of extensions that must be supported by the user agent.

-   Value: Any valid list of IRI references for extensions, separated by white
    space.
-   Default Value: Evaluates to true
-   Animatable: No

**`requiredFeatures`**

List of features (from the allowable feature strings in the SVG spec) that must
be supported by the user agent.

-   Value: Any valid list of feature strings, separated by white space.
-   Default Value: Evaluates to true
-   Animatable: No

**`systemLanguage`**

List of language names, one of which must match one of the user preferred
languages.

-   Value: Any valid list of language names, separated by commas.
-   Default Value: Evaluates to true
-   Animatable: No

### Presentation Attributes

**`alignment-baseline`**

Specifies which baseline of this element is to be aligned with the corresponding
baseline of the parent.

-   Value:
    -   `auto` (deprecated)
    -   `baseline`
    -   `before-edge` (deprecated)
    -   `text-bottom`
    -   `text-before-edge`
    -   `middle`
    -   `central`
    -   `after-edge` (deprecated)
    -   `text-top`
    -   `text-after-edge`
    -   `ideographic`
    -   `alphabetic`
    -   `hanging`
    -   `mathematical`
    -   `top`
    -   `center`
    -   `bottom`
-   Default Value: `auto`
-   Animatable: Yes

**`baseline-shift`**

Allows repositioning the `dominant-baseline` relative to the `dominant-baseline`
of the parent text content element (e.g. subscript/superscript).

-   Value:
    -   Any valid length or percentage
    -   `sub`
    -   `super`
-   Default Value: `0`
-   Animatable: Yes

**`clip-path`**

**`clip-rule`**

**`color`**

**`color-interpolation`**

**`color-interpolation-filters`**

**`color-profile`**

**`color-rendering`**

**`cursor`**

**`direction`**

**`display`**

**`dominant-baseline`**

**`enable-background`**

**`fill`**

**`fill-opacity`**

**`fill-rule`**

**`filter`**

**`flood-color`**

**`flood-opacity`**

**`font-family`**

**`font-size`**

**`font-size-adjust`**

**`font-stretch`**

**`font-style`**

**`font-variant`**

**`font-weight`**

**`glyph-orientation-horizontal`**

**`glyph-orientation-vertical`**

**`image-rendering`**

**`kerning`**

**`letter-spacing`**

**`lighting-color`**

**`marker-end`**

**`marker-mid`**

**`marker-start`**

**`mask`**

**`opacity`**

**`overflow`**

**`pointer-events`**

**`shape-rendering`**

**`stop-color`**

**`stop-opacity`**

**`stroke`**

**`stroke-dasharray`**

**`stroke-dashoffset`**

**`stroke-linecap`**

**`stroke-linejoin`**

**`stroke-miterlimit`**

**`stroke-opacity`**

**`stroke-width`**

**`text-anchor`**

**`text-decoration`**

**`text-rendering`**

**`transform`**

**`transform-origin`**

**`unicode-bidi`**

**`vector-effect`**

**`visibility`**

**`word-spacing`**

**`writing-mode`**

### Filters Attributes

#### Filter Primitive Attributes

**`height`**

**`result`**

**`width`**

**`x`**

**`y`**

#### Transfer Function Attributes

**`type`**

**`tableValues`**

**`slope`**

**`intercept`**

**`amplitude`**

**`exponent`**

**`offset`**

### Animation Attributes

#### Animation Target Element Attributes

**`href`**

#### Animation Attribute Target Attributes

**`attributeType`**

**`attributeName`**

#### Animation Timing Attributes

**`begin`**

**`dur`**

**`end`**

**`min`**

**`max`**

**`restart`**

**`repeatCount`**

**`repeatDur`**

**`fill`**

#### Animation Value Attributes

**`calcMode`**

**`values`**

**`keyTimes`**

**`keySplines`**

**`from`**

**`to`**

**`by`**

**`autoReverse`**

**`accelerate`**

**`decelerate`**

#### Animation Addition Attributes

**`additive`**

**`accumulate`**

### Event Attributes

#### Animation Event Attributes

**`onbegin`**

**`onend`**

**`onrepeat`**

#### Document Event Attributes

**`onabort`**

**`onerror`**

**`onresize`**

**`onscroll`**

**`onunload`**

#### Global Event Attributes

**`oncancel`**

**`oncanplay`**

**`oncanplaythrough`**

**`onchange`**

**`onclick`**

**`onclose`**

**`oncuechange`**

**`ondblclick`**

**`ondrag`**

**`ondragend`**

**`ondragenter`**

**`ondragleave`**

**`ondragover`**

**`ondragstart`**

**`ondrop`**

**`ondurationchange`**

**`onemptied`**

**`onended`**

**`onerror`**

**`onfocus`**

**`oninput`**

**`oninvalid`**

**`onkeydown`**

**`onkeypress`**

**`onkeyup`**

**`onload`**

**`onloadeddata`**

**`onloadedmetadata`**

**`onloadstart`**

**`onmousedown`**

**`onmouseenter`**

**`onmouseleave`**

**`onmousemove`**

**`onmouseout`**

**`onmouseover`**

**`onmouseup`**

**`onmousewheel`**

**`onpause`**

**`onplay`**

**`onplaying`**

**`onprogress`**

**`onratechange`**

**`onreset`**

**`onresize`**

**`onscroll`**

**`onseeked`**

**`onseeking`**

**`onselect`**

**`onshow`**

**`onstalled`**

**`onsubmit`**

**`onsuspend`**

**`ontimeupdate`**

**`ontoggle`**

**`onvolumechange`**

**`onwaiting`**

#### Graphical Event Attributes

**`onactivate`**

**`onfocusin`**

**`onfocusout`**

### Deprecated Attributes

-   `xml:base`
-   `xml:space`
-   `xlink:href`
-   `xlink:type`
-   `xlink:role`
-   `xlink:arcrole`
-   `xlink:title`
-   `xlink:show`
-   `xlink:actuate`
-   `clip`
