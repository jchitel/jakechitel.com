import cx from 'classnames';

export const Hero = () => (
    <div className="h-screen flex flex-col justify-center">
        <div className={cx("text-4xl md:text-5xl lg:text-6xl xl:text-7xl", "font-bold")}>Jake Chitel</div>
        <div className={cx("text-2xl md:text-3xl lg:text-4xl xl:text-5xl", "font-bold", "pb-8")}>Software Engineer</div>
        <Summary />
    </div>
);

const Summary = () => (
    <>
        <p>I am a software engineer based in Milwaukee, Wisconsin.</p>
        <p>My expertise is in full-stack web development, where I am proficient in .NET and NodeJS stacks.</p>
        <p>I also have growing experience in native mobile development.</p>
        <p>I am driven by a thirst for crafting truly awesome user experiences.</p>
    </>
);
