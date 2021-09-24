import { Header } from './header';
import { Hero } from './hero';
import { About, Education } from './about';
import { Experience } from './experience';
import { Skills } from './skills';
import cx from 'classnames';

export const Home = () => (
    <div>
        <Header />
        <main className={cx(
            "my-0 mx-auto max-w-screen-2xl",
            "pt-0 pb-8 px-6 sm:px-8 md:px-16 xl:px-32",
            "space-y-8",
            "text-sm"
        )}>
            <Hero />
            <About />
            <Education />
            <Experience />
            <Skills />
        </main>
    </div>
);
