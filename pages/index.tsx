import { FaRegEnvelope, FaLinkedinIn, FaGithub, FaRegFilePdf } from 'react-icons/fa';
import cx from 'classnames';

export default function Home() {
    return (
        <div>
            <Header />
            <main className={cx(
                "my-0 mx-auto max-w-screen-2xl",
                "py-0 px-6 sm:px-8 md:px-16 xl:px-32",
                "text-sm"
            )}>
                <Hero />
                <About />
                <Education />
                <Experience />
                <Skills />
            </main>
        </div>
    )
}

const Header = () => (
    <header className={cx(
        "h-16 w-full px-8",
        "fixed flex justify-between items-center",
        "bg-gray-900",
        "font-bold tracking-widest"
    )} >
        <Nav />
        <ContactLinks />
    </header>
);

const Nav = () => (
    <nav className="flex space-x-6">
        <a href="#about">ABOUT</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#skills">SKILLS</a>
    </nav>
);

const ContactLinks = () => (
    <div className="flex space-x-6">
        <a href="mailto:jchitel@gmail.com" target="_blank">
            <FaRegEnvelope />
        </a>
        <a href="https://www.linkedin.com/in/jacob-chitel-4a395858/" target="_blank">
            <FaLinkedinIn />
        </a>
        <a href="https://github.com/jchitel" target="_blank">
            <FaGithub />
        </a>
        <a href="javascript:alert('Resume not yet available. Check back soon!');">
            <FaRegFilePdf />
        </a>
    </div>
);

const Hero = () => (
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

const About = () => (
    <>
        <h3 id="about">About</h3>
        <ul>
            <li>Email: jchitel@gmail.com</li>
            <li>LinkedIn: https://www.linkedin.com/in/jacob-chitel-4a395858/</li>
            <li>GitHub: https://github.com/jchitel</li>
            <li>Resume: TODO</li>
        </ul>
    </>
)

const Education = () => (
    <>
        <h3>Education</h3>
        <p>Marquette University - Milwaukee, Wisconsin</p>
        <p>August 2011 - May 2015</p>
        <p>Bachelor of Science - Computer Engineering</p>
    </>
)

const Experience = () => (
    <>
        <h3 id="experience">Experience</h3>

        <Company location="Direct Supply, Milwaukee, Wisconsin">
            <Position
                title="Senior Software Engineer, April 2019 - Present"
                description={'Since my promotion to Senior Engineer, I have made significant contributions in '
                    + 'a project to build a new mobile application from the ground up. '
                    + 'This project has leveraged modern native mobile technologies like Kotlin, Jetpack, Swift, '
                    + 'and SwiftUI.'}
            />
            <Position
                title="Software Engineer, September 2017 - April 2019"
                description={'My initial tenure at Direct Supply saw a deepening of my skills in both React '
                    + 'and C# server development. I have developed deep knowledge in code bases '
                    + 'with over 20 years of legacy code, including Angular, jQuery, classic ASP, '
                    + 'and VB6.'}
            />
        </Company>

        <Company location="GE Healthcare, Waukesha, Wisconsin">
            <Position
                title="Software Engineer, April 2017 - September 2017"
                description={'At GE Healthcare, I developed a log processor and UI used in a reliability platform '
                    + 'for mobile X-Ray systems, utilizing PHP and JavaScript.'}
            />
        </Company>

        <Company location="D+H (Now Finastra), Mequon, Wisconsin">
            <Position
                title="Software Engineer, July 2016 - April 2017"
                description={'At D+H, I worked on a platform for online mortgage applications to be vended to banks '
                    + 'and other mortgage lenders. This platform utilized a mix of modern AngularJS and ASP.NET, '
                    + 'with some older VB.NET and vanilla JS.'}
            />
        </Company>

        <Company location="Amazon, Seattle, Washington">
            <Position
                title="Software Development Engineer, June 2015 - June 2016"
                description={'After being hired for full-time work at Amazon, I worked on the AWS Lambda Console stack, '
                    + 'modernizing the frontend from AngularJS to React. The Java backend was a thin layer on top '
                    + 'of the public AWS Lambda API, and also integrated with several other AWS services.'}
            />
            <Position
                title="SDE Intern, May 2014 - August 2014"
                description={'As an intern at Amazon, I worked in the hardlines division of the Amazon.com website, '
                    + 'developing an aggregation tool for the Amazon Wireless mobile phone service. This project '
                    + 'involved using Java and SQL.'}
            />
        </Company>

        <Company location="Quad/Graphics, Sussex, Wisconsin">
            <Position
                title="Software Developer Intern, May 2013 - October 2013"
                description={'My first ever internship at Quad/Graphics had me in a data-heavy environment, dealing with '
                    + 'backend systems for warehouses. Here, I honed my C# and SQL skills, and got my first taste '
                    + 'of working at a large company with many internal services communicating with each other.'}
            />
        </Company>

        <Company location="GasDay Lab, Marquette University, Milwaukee, Wisconsin">
            <Position
                title="Software Developer, August 2011 - May 2015"
                description={'The GasDay Lab provided my humble beginnings as a software developer. Here, I learned C# '
                    + 'and SQL for the backend of a tool used by energy companies to forecast natural gas demand. '
                    + 'The tool consisted of a database storing weather and gas flow data, interacting with '
                    + 'a forecasting model maintained by Marquette University professors and grad students. '
                    + 'Over time, I also worked on a new ASP.NET MVC Web UI for this tool (replacing a dated '
                    + 'MS Excel macro), where I first learned HTML, JavaScript, and CSS.'}
            />
        </Company>
    </>
)

interface ICompanyProps {
    location: string;
    children: React.ReactNode;
}

const Company = ({ location, children }: ICompanyProps) => (
    <>
        <h4>{location}</h4>
        {children}
    </>
)

interface IPositionProps {
    title: string;
    description: string;
}

const Position = ({ title, description }: IPositionProps) => (
    <>
        <h5>{title}</h5>
        <p>{description}</p>
    </>
)

const Skills = () => (
    <>
        <h3 id="skills">Skills</h3>
        <ul>
            <li>Frontend</li>
            <ul>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>React</li>
                <li>Webpack</li>
                <li>Jest</li>
                <li>Next.js</li>
                <li>Angular 1.0</li>
            </ul>
            <li>Backend</li>
            <ul>
                <li>NodeJS</li>
                <li>C# (ASP.NET, .NET Core)</li>
                <li>SQL (SQL Server, PostgreSQL)</li>
                <li>RabbitMQ</li>
                <li>AWS (Lambda, ECS, RDS, S3, DynamoDB, ...)</li>
                <li>Java</li>
            </ul>
            <li>Mobile</li>
            <ul>
                <li>Swift</li>
                <li>SwiftUI</li>
                <li>UIKit</li>
                <li>Kotlin</li>
                <li>Jetpack</li>
                <li>Coroutines</li>
                <li>RxJava</li>
                <li>SQLite</li>
            </ul>
            <li>Concepts</li>
            <ul>
                <li>Agile Methodologies</li>
                <li>CI/CD</li>
                <li>Testing (Unit, Integration, UI)</li>
                <li>API Design</li>
            </ul>
        </ul>
    </>
)
