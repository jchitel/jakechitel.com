import { Header } from './header';
import { Hero } from './hero';
import { About, Education } from './about';
import { Experience } from './experience';
import { Skills } from './skills';
import cx from 'classnames';

const OldHome = () => (
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

export const Home = () => {
    return (
        <div className="relative bg-gray-50 overflow-hidden">
            <Background />
            <div className="relative pt-6 pb-16 sm:pb-24">
                
            </div>
        </div>
    )
}

const Background = () => {
    return (
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
            <div className="relative h-full max-w-7xl mx-auto">
                <svg
                    className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                    width={404}
                    height={784}
                    fill="none"
                    viewBox="0 0 404 784"
                >
                    <defs>
                        <pattern
                            id="pattern1"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(pattern1)" />
                </svg>
                <svg
                    className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                    width={404}
                    height={784}
                    fill="none"
                    viewBox="0 0 404 784"
                >
                    <defs>
                        <pattern
                            id="pattern2"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(pattern2)" />
                </svg>
            </div>
        </div>
    )
}
