declare module '@parcel/core' {
    import { Stats } from 'fs';
    import { Readable } from 'stream';

    export default class Parcel {
        constructor(options: InitialParcelOptions);
        init(): Promise<void>;
        run(): Promise<BundleGraph>;
        watch(cb?: (err: Error | undefined, buildEvent?: BuildEvent) => unknown): Promise<AsyncSubscription>;
        build(startTime?: number): Promise<BuildEvent>;
    }

    export interface InitialParcelOptions {
        entries?: string | string[];
        rootDir?: string;
        config?: ResolvedParcelConfigFile;
        defaultConfig?: ResolvedParcelConfigFile;
        env?: { [key: string]: string };
        targets?: string | { readonly [name: string]: TargetDescriptor };
        disableCache?: boolean;
        cacheDir?: string;
        killWorkers?: boolean;
        mode?: BuildMode;
        minify?: boolean;
        scopeHoist?: boolean;
        sourceMaps?: boolean;
        hot?: ServerOptions | false;
        serve?: ServerOptions | false;
        autoinstall?: boolean;
        logLevel?: LogLevel;
        profile?: boolean;
        patchConsole?: boolean;
        inputFS?: unknown; // TODO: FileSystem
        outputFS?: unknown; // TODO: FileSystem
        workerFarm?: unknown; // TODO: WorkerFarm
        packageManager?: unknown; // TODO: PackageManager
        defaultEngines?: Engines;
        // contentHash
        // throwErrors
        // global?
        // detailedReport
    }

    export interface ResolvedParcelConfigFile {
        filePath: string;
        extends?: string | string[];
        resolvers?: string[];
        transforms?: { [glob: string]: string[] };
        bundler?: string;
        namers?: string[];
        runtimes?: { [envContext: string]: string[] };
        packagers?: { [glob: string]: string };
        optimizers?: { [glob: string]: string[] };
        reporters?: string[];
        validators?: { [glob: string]: string[] };
    }

    export interface TargetDescriptor extends PackageTargetDescriptor {
        distDir: string;
    }
    
    export interface PackageTargetDescriptor {
        context?: EnvironmentContext;
        engines?: Engines;
        includeNodeModules?: boolean | Array<string>;
        outputFormat?: OutputFormat;
        publicUrl?: string;
        distDir?: string;
        sourceMap?: TargetSourceMapOptions;
    }

    export type EnvironmentContext =
        | 'browser'
        | 'web-worker'
        | 'service-worker'
        | 'node'
        | 'electron-main'
        | 'electron-renderer';

    export interface Engines {
        browsers?: string | Array<string>;
        electron?: string;
        node?: string;
        parcel?: string;
    }

    export type OutputFormat =
        | 'esmodule'
        | 'commonjs'
        | 'global';

    export interface TargetSourceMapOptions {
        sourceRoot?: string;
        inline?: boolean;
        inlineSources?: boolean;
    }

    export type BuildMode =
        | 'development'
        | 'production';

    export type ServerOptions = {
        host?: string;
        port: number;
        https?: HTTPSOptions | boolean;
        publicUrl?: string;
    }
    
    export type HTTPSOptions = {
        cert: string;
        key: string;
    }

    export type LogLevel =
        | 'none'
        | 'error'
        | 'warn'
        | 'info'
        | 'verbose';

    export interface BundleGraph {
        getBundles(): Bundle[];
        getBundleGroupsContainingBundle(bundle: Bundle): BundleGroup[];
        getBundleGroupsReferencedByBundle(bundle: Bundle): Array<{
            bundleGroup: BundleGroup,
            dependency: Dependency
        }>;
        getBundlesInBundleGroup(bundleGroup: BundleGroup): Bundle[];
        getDependencies(asset: Asset): Dependency[];
        getIncomingDependencies(asset: Asset): Dependency[];
        getDependencyResolution(dependency: Dependency): Asset | undefined;
        isAssetInAncestorBundles(bundle: Bundle, asset: Asset): boolean;
        isAssetReferenced(asset: Asset): boolean;
        isAssetReferencedByAssetType(asset: Asset, type: string): boolean;
        hasParentBundleOfType(bundle: Bundle, type: string): boolean;
        resolveSymbol(asset: Asset, symbol: Symbol): SymbolResolution;
        getExportedSymbols(asset: Asset): SymbolResolution[];
        traverseBundles<TContext>(visit: GraphTraversalCallback<Bundle, TContext>): TContext | undefined;
        findBundlesWithAsset(asset: Asset): Bundle;
    }
    
    export interface Bundle {
        readonly id: string;
        readonly type: string;
        readonly env: Environment;
        readonly isEntry: boolean | undefined;
        readonly isInline: boolean | undefined;
        readonly target: Target;
        readonly filePath: string | undefined;
        readonly name: string | undefined;
        readonly stats: Stats;
        getEntryAssets(): Asset[];
        getMainEntry(): Asset | undefined;
        hasAsset(asset: Asset): boolean;
        hasChildBundles(): boolean;
        getHash(): string;
        traverseAssets<TContext>(visit: GraphVisitor<Asset, TContext>): TContext | undefined;
        traverse<TContext>(visit: GraphVisitor<BundleTraversable, TContext>): TContext | undefined;
    }
    
    export interface Environment {
        readonly context: EnvironmentContext;
        readonly engines: Engines;
        readonly includeNodeModules: boolean | string[];
        readonly outputFormat: OutputFormat;
        readonly isLibrary: boolean;
        
        isBrowser(): boolean;
        isNode(): boolean;
        isElectron(): boolean;
        isIsolated(): boolean;
        matchesEngines(minVersions: VersionMap): boolean;
    }
    
    export interface VersionMap {
        [name: string]: string;
    }
    
    export interface Target {
        readonly distEntry: string | undefined;
        readonly distDir: string;
        readonly env: Environment;
        readonly sourceMap: TargetSourceMapOptions | undefined;
        readonly name: string;
        readonly publicUrl: string | undefined;
    }
    
    export interface Asset {
        readonly ast: AST | undefined;
        readonly env: Environment;
        readonly fs: unknown; // TODO: FileSystem
        readonly filePath: string;
        readonly id: string;
        readonly meta: Meta;
        readonly isIsolated: boolean;
        readonly isInline: boolean;
        readonly isSource: boolean;
        readonly type: string;
        readonly symbols: Map<Symbol, Symbol>;
        readonly sideEffects: boolean;
        readonly uniqueKey: string | undefined;
        readonly outputHash: string;
        readonly stats: Stats;
    
        getCode(): Promise<string>;
        getBuffer(): Promise<Buffer>;
        getStream(): Readable;
        getMap(): Promise<unknown | undefined>; // TODO: SourceMap
        getIncludedFiles(): readonly File[];
        getDependencies(): readonly Dependency[];
        getConfig(
            filePaths: string[],
            options: {
                packageKey?: string,
                parse?: boolean,
            } | undefined
        ): Promise<any>;
        getPackage(): Promise<PackageJSON | null>;
    }
    
    export interface AST {
        type: string;
        version: string;
        program: any;
        isDirty?: boolean;
    }
    
    export interface Meta {
        [key: string]: JSONValue;
        // globals?: Map<string, { code: string, deps?: Array<string> } | undefined>;
    }
    
    export type JSONValue =
        | null
        | boolean
        | number
        | string
        | JSONValue[]
        | { [key: string]: JSONValue };
    
    export interface File {
        filePath: string;
        hash?: string;
    }
    
    export interface Dependency {
        readonly id: string;
        readonly moduleSpecifier: string;
        readonly isAsync: boolean;
        readonly isEntry: boolean;
        readonly isOptional: boolean;
        readonly isURL: boolean;
        readonly isWeak: boolean | undefined;
        readonly loc: SourceLocation | undefined;
        readonly env: Environment;
        readonly meta: Meta;
        readonly target: Target | undefined;
        readonly sourceAssetId: string | undefined;
        readonly sourcePath: string | undefined;
        readonly symbols: Map<Symbol, Symbol>;
        readonly pipeline: string | undefined;
    }
    
    export type SourceLocation = {
        filePath: string;
        start: {
            line: number,
            column: number,
        };
        end: {
            line: number,
            column: number,
        };
    }
    
    export type GraphVisitor<TNode, TContext> =
        | GraphTraversalCallback<TNode, TContext>
        | {
            enter?: GraphTraversalCallback<TNode, TContext>,
            exit?: GraphTraversalCallback<TNode, TContext>
        };
    
    export type GraphTraversalCallback<TNode, TContext> = (
        node: TNode,
        context: TContext | undefined,
        actions: TraversalActions
    ) => TContext | undefined;
    
    export interface TraversalActions {
        skipChildren(): void;
        stop(): void;
    }
    
    export type BundleTraversable =
        | { readonly type: 'asset', value: Asset }
        | { readonly type: 'dependency', value: Dependency };
    
    export interface BundleGroup {
        target: Target;
        entryAssetId: string;
    }
    
    export interface SymbolResolution {
        asset: Asset;
        exportSymbol: Symbol | string;
        symbol: void | Symbol;
    }

    export interface PackageJSON {
        name: string;
        version: string;
        main?: string;
        module?: string;
        browser?: string | { [path: string]: string | boolean };
        source?: string | { [path: string]: string };
        alias?: { [path: string]: string };
        browserslist?: Array<string>;
        engines?: Engines;
        targets?: {[name: string]: PackageTargetDescriptor };
        dependencies?: PackageDependencies;
        devDependencies?: PackageDependencies;
        peerDependencies?: PackageDependencies;
        sideEffects?: boolean | string | Array<string>;
    }
    
    export type PackageDependencies = {
        [packageName: string]: string
    }

    export type BuildEvent = BuildFailureEvent | BuildSuccessEvent;
    
    export interface BuildSuccessEvent {
        readonly type: 'buildSuccess';
        bundleGraph: BundleGraph;
        buildTime: number;
        changedAssets: Map<string, Asset>;
    }
    
    export interface BuildFailureEvent {
        readonly type: 'buildFailure';
        error: Error;
    }

    export interface AsyncSubscription {
        unsubscribe(): Promise<unknown>;
    }
}