import { FaRegEnvelope, FaLinkedinIn, FaGithub, FaRegFilePdf } from 'react-icons/fa';
import { size, fontSize, color } from '../styles/common';
import cx from 'classnames';

export default function Home() {
    return (
        <div>
            <Header />
            <StyledMain>
                <Hero />
                <About />
                <Education />
                <Experience />
                <Skills />
            </StyledMain>
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

const StyledHeader = styled.header`
    background-color: ${color.background};
`;

const Nav = () => (
    <StyledNav>
        <NavLink href="#about">ABOUT</NavLink>
        <NavLink href="#experience">EXPERIENCE</NavLink>
        <NavLink href="#skills">SKILLS</NavLink>
    </StyledNav>
);

const StyledNav = styled.nav`
    display: flex;
`;

const NavLink = styled.a`
    :not(:last-child) {
        margin-right: ${size.md_24};
    }
`;

const ContactLinks = () => (
    <StyledContactLinks>
        <StyledContactLink href="mailto:jchitel@gmail.com" target="_blank">
            <FaRegEnvelope />
        </StyledContactLink>
        <StyledContactLink href="https://www.linkedin.com/in/jacob-chitel-4a395858/" target="_blank">
            <FaLinkedinIn />
        </StyledContactLink>
        <StyledContactLink href="https://github.com/jchitel" target="_blank">
            <FaGithub />
        </StyledContactLink>
        <StyledContactLink href="javascript:alert('Resume not yet available. Check back soon!');">
            <FaRegFilePdf />
        </StyledContactLink>
    </StyledContactLinks>
);

const StyledContactLinks = styled.div`
    display: flex;
`;

const StyledContactLink = styled.a`
    :not(:first-child) {
        margin-left: ${size.md_24};
    }
`;

const StyledMain = styled.main`
    margin: 0 auto;
    padding: 0 ${size.xl_128};
    max-width: ${size.xxxxl_1600};
    font-size: ${fontSize.md_14};

    @media (max-width: ${size.xxxxl_1152}) {
        padding: 0 ${size.lg_64};
    }

    @media (max-width: ${size.xxxl_768}) {
        padding: 0 ${size.lg_32};
    }

    @media (max-width: ${size.xxl_512}) {
        padding: 0 ${size.md_24};
    }
`;

const Hero = () => (
    <StyledHero>
        <Name>Jake Chitel</Name>
        <PositionName>Software Engineer</PositionName>
        <Summary />
    </StyledHero>
);

const StyledHero = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Name = styled.div`
    font-size: clamp(${fontSize.xl_36}, 8vw, ${fontSize.xxl_72});
    font-weight: bold;
`;

const PositionName = styled.div`
    /* 5.33vw is relative to 8vw above so that Name and PositionName begin to scale at the same time. */
    font-size: clamp(${fontSize.lg_24}, 5.33vw, ${fontSize.xl_48});
    font-weight: bold;
    padding-bottom: ${size.lg_32};
`;

const Summary = () => (
    <>
        <SummaryPoint>I am a software engineer based in Milwaukee, Wisconsin.</SummaryPoint>
        <SummaryPoint>My expertise is in full-stack web development, where I am proficient in .NET and NodeJS stacks.</SummaryPoint>
        <SummaryPoint>I also have growing experience in native mobile development.</SummaryPoint>
        <SummaryPoint>I am driven by a thirst for crafting truly awesome user experiences.</SummaryPoint>
    </>
);

const SummaryPoint = styled.p`
    margin-top: 0;
`;

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
