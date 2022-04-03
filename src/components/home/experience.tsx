import { Section, Box, Paragraph } from "./common";

export const Experience = () => (
    <Section anchor="experience" header="Experience">
        <Company location="Ventus Risk (Subsidiary of Arch Insurance), Remote">
            <Position
                title="Software Engineer IV, June 2021 - Present"
                description={
                    "I just recently started here at Ventus, so I don't have much yet to report. " +
                    "But I'm hoping to get some valuable experience here with React and Python."
                }
            />
        </Company>

        <Company location="Direct Supply, Milwaukee, Wisconsin">
            <Position
                title="Senior Software Engineer, April 2019 - June 2021"
                description={
                    "Since my promotion to Senior Engineer, I made significant contributions in " +
                    "a project to build a new mobile application from the ground up. " +
                    "This project leveraged modern native mobile technologies like Kotlin, Jetpack, Swift, " +
                    "and SwiftUI."
                }
            />
            <Position
                title="Software Engineer, September 2017 - April 2019"
                description={
                    "My initial tenure at Direct Supply saw a deepening of my skills in both React " +
                    "and C# server development. I have developed deep knowledge in code bases " +
                    "with over 20 years of legacy code, including Angular, jQuery, classic ASP, " +
                    "and VB6."
                }
            />
        </Company>

        <Company location="GE Healthcare, Waukesha, Wisconsin">
            <Position
                title="Software Engineer, April 2017 - September 2017"
                description={
                    "At GE Healthcare, I developed a log processor and UI used in a reliability platform " +
                    "for mobile X-Ray systems, utilizing PHP and JavaScript."
                }
            />
        </Company>

        <Company location="D+H (Now Finastra), Mequon, Wisconsin">
            <Position
                title="Software Engineer, July 2016 - April 2017"
                description={
                    "At D+H, I worked on a platform for online mortgage applications to be vended to banks " +
                    "and other mortgage lenders. This platform utilized a mix of modern AngularJS and ASP.NET, " +
                    "with some older VB.NET and vanilla JS."
                }
            />
        </Company>

        <Company location="Amazon, Seattle, Washington">
            <Position
                title="Software Development Engineer, June 2015 - June 2016"
                description={
                    "After being hired for full-time work at Amazon, I worked on the AWS Lambda Console stack, " +
                    "modernizing the frontend from AngularJS to React. The Java backend was a thin layer on top " +
                    "of the public AWS Lambda API, and also integrated with several other AWS services."
                }
            />
            <Position
                title="SDE Intern, May 2014 - August 2014"
                description={
                    "As an intern at Amazon, I worked in the hardlines division of the Amazon.com website, " +
                    "developing an aggregation tool for the Amazon Wireless mobile phone service. This project " +
                    "involved using Java and SQL."
                }
            />
        </Company>

        <Company location="Quad/Graphics, Sussex, Wisconsin">
            <Position
                title="Software Developer Intern, May 2013 - October 2013"
                description={
                    "My first ever internship at Quad/Graphics had me in a data-heavy environment, dealing with " +
                    "backend systems for warehouses. Here, I honed my C# and SQL skills, and got my first taste " +
                    "of working at a large company with many internal services communicating with each other."
                }
            />
        </Company>

        <Company location="GasDay Lab, Marquette University, Milwaukee, Wisconsin">
            <Position
                title="Software Developer, August 2011 - May 2015"
                description={
                    "The GasDay Lab provided my humble beginnings as a software developer. Here, I learned C# " +
                    "and SQL for the backend of a tool used by energy companies to forecast natural gas demand. " +
                    "The tool consisted of a database storing weather and gas flow data, interacting with " +
                    "a forecasting model maintained by Marquette University professors and grad students. " +
                    "Over time, I also worked on a new ASP.NET MVC Web UI for this tool (replacing a dated " +
                    "MS Excel macro), where I first learned HTML, JavaScript, and CSS."
                }
            />
        </Company>
    </Section>
);

const Company = ({
    location,
    children,
}: {
    location: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-2">
        <h4 className="text-xl pb-1 text-gray-400">{location}</h4>
        <Box className="space-y-2">{children}</Box>
    </div>
);

const Position = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div>
        <h5 className="font-bold">{title}</h5>
        <Paragraph>{description}</Paragraph>
    </div>
);
