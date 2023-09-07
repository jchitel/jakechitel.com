export default function About() {
    return (
        <div className="max-w-prose mx-auto pt-20 pb-10">
            <h1 className="text-5xl">About Me!</h1>
            <p className="pb-6 text-slate-500 dark:text-slate-400">
                Last updated: 2023-09-07
            </p>

            <Paragraph>
                I was born and raised in Milwaukee, Wisconsin. I have always had
                a deep interest in math, science, and technology, which led me
                to enroll in{" "}
                <ExternalLink href="https://www.pltw.org/">
                    engineering classes
                </ExternalLink>{" "}
                in high school (thus breaking the fourth seal of STEM and
                fulfilling the prophecy). In my junior year I took a class on
                Digital Electronics, which gave me a solid foundation of how
                computer hardware works and pointed my interest solidly in the
                direction of computers. As a senior I taught myself Java to{" "}
                <span className="line-through">
                    start the next generation of enterprise software
                </span>{" "}
                learn how to make Minecraft mods. Learning how to code sealed my
                fate as a software junkie.
            </Paragraph>

            <Paragraph>
                I got a BS in Computer Engineering at Marquette University in
                Milwaukee (class of 2015). I was extremely fortunate at the
                beginning of my freshman year to get a job as a Software
                Developer at the GasDay Lab (now called{" "}
                <ExternalLink href="https://marquetteenergyanalytics.com/">
                    Marquette Energy Analytics
                </ExternalLink>
                ). It was here that I learned practical software development
                (C#, SQL, HTML, CSS, JavaScript, and even some good ol&apos;
                VB6) over the course of my 4 years in college, in parallel with
                learning theory (data structures, circuits, operating systems,
                computer hardware, networks, embedded systems, compilers, etc.)
                in my classes.
            </Paragraph>

            <Paragraph>
                My first summer internship was at{" "}
                <ExternalLink href="https://www.quad.com/">
                    Quad/Graphics
                </ExternalLink>{" "}
                in Sussex, WI, in 2013, where I continued to use a lot of the
                same tech that I was using at GasDay. I decided to shoot big for
                my last summer internship and landed a gig at{" "}
                <ExternalLink href="https://www.amazon.com/">
                    Amazon
                </ExternalLink>{" "}
                (yes, that Amazon) in Seattle, WA. As an intern at Amazon I
                worked on an ingestion system for{" "}
                <ExternalLink href="https://www.amazon.com/b?node=20429280011">
                    wireless plans
                </ExternalLink>
                , utilizing SQL, Java, and Ruby.
            </Paragraph>

            <Paragraph>
                My mad skills as an intern landed me a full-time position at{" "}
                <ExternalLink href="https://aws.amazon.com/">AWS</ExternalLink>{" "}
                after graduation, where I worked on the console (web UI) for the{" "}
                <ExternalLink href="https://aws.amazon.com/lambda/">
                    Lambda
                </ExternalLink>{" "}
                service. It was here that I was exposed to the wide and
                wonderful world of web development. I learned Angular (the old
                one), REST APIs, Grunt, and Gulp, and began a passionate tryst
                with JavaScript that has blossomed to a loving relationship
                today.
            </Paragraph>

            <Paragraph>
                I started getting into web development at the perfect time, as
                2015 was right when web tooling and frameworks underwent a
                complete overhaul. Our codebase started as a typical
                old-fashioned Angular app with manually managed vendor scripts
                and a large Gulpfile. By the time I left AWS just a year later,
                I had seen the entire app converted to ES2015, React with Redux,
                NPM for managing dependencies, and NodeJS, Babel, and Webpack
                for builds. My team was among the first AWS console teams to
                embrace React, and our project set the stage for other teams to
                adopt it not long after. I learned more than I can possibly list
                while working at AWS, and my short time there established my
                still-growing passion for web development.
            </Paragraph>

            <Paragraph>
                After attempting to set my own roots on the other side of the
                country, I decided that my home was still Milwaukee, so I moved
                back in June 2016. I was unable to take the AWS job with me, but
                I absolutely would have if given the opportunity (if I had left
                in 2020, things would likely have gone quite differently...). It
                took a while to find my footing in MKE, and I tried a few
                different companies (D+H, now called{" "}
                <ExternalLink href="https://www.finastra.com/">
                    Finastra
                </ExternalLink>
                , and{" "}
                <ExternalLink href="https://www.gehealthcare.com/">
                    GE HealthCare
                </ExternalLink>
                ). It was at{" "}
                <ExternalLink href="https://www.directsupply.com/">
                    Direct Supply
                </ExternalLink>{" "}
                (my current employer) that I found a good fit. I was brought
                back to my .NET roots, and was introduced to TypeScript (as the
                adage goes, I cannot go back).
            </Paragraph>

            <Paragraph>
                Over the course of the last few years, I have been able to
                mature as an engineer. I have faced significant challenges and
                have grown from them. I have built confidence as a team member.
                I have had the opportunity to provide mentorship to junior
                engineers. Perhaps the most significant project I have worked on
                at Direct Supply was a complete rewrite of a legacy mobile
                application, which provided many learning opportunities, both
                technical and non-technical.
            </Paragraph>

            <Paragraph>
                As I look to the future of my career, I plan to deepen my web
                development skills, try new technologies, work with people from
                all walks of life, engage more in open source, and continue to
                grow as an engineer and as a person. Look for big things from me
                and those with whom I work!
            </Paragraph>

            <h2 className="text-3xl pt-4">Work History</h2>
            <p className="pb-6 text-slate-500 dark:text-slate-400">
                (Most Recent First)
            </p>

            <WorkHistoryItem
                title="Staff Software Engineer"
                timeRange="June 2022 - Present"
                company="Direct Supply"
                location="Milwaukee, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Engineer IV"
                timeRange="June 2021 - June 2022"
                company="Arch Capital Group"
                location="Remote"
            />

            <WorkHistoryItem
                title="Senior Software Engineer"
                timeRange="April 2019 - June 2021"
                company="Direct Supply"
                location="Milwaukee, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Engineer"
                timeRange="September 2017 - April 2019"
                company="Direct Supply"
                location="Milwaukee, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Engineer"
                timeRange="April 2017 - September 2017"
                company="GE Healthcare"
                location="Waukesha, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Engineer"
                timeRange="July 2016 - April 2017"
                company="D+H Mortgagebot (Now Finastra)"
                location="Mequon, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Development Engineer II"
                timeRange="January 2016 - June 2016"
                company="Amazon"
                location="Seattle, Washington"
            />

            <WorkHistoryItem
                title="Software Development Engineer I"
                timeRange="June 2015 - January 2016"
                company="Amazon"
                location="Seattle, Washington"
            />

            <WorkHistoryItem
                title="Software Developer"
                timeRange="August 2011 - May 2015"
                company="GasDay Lab (Now Marquette Energy Analytics)"
                location="Milwaukee, Wisconsin"
            />

            <WorkHistoryItem
                title="Software Development Engineer Intern"
                timeRange="May 2014 - August 2014"
                company="Amazon"
                location="Seattle, Washington"
            />

            <WorkHistoryItem
                title="Software Developer Intern"
                timeRange="May 2013 - October 2013"
                company="Quad/Graphics"
                location="Sussex, Wisconsin"
            />
        </div>
    );
}

function Paragraph({ children }: { children: React.ReactNode }) {
    return <p className="pb-4">{children}</p>;
}

function ExternalLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a className="underline" href={href} target="_blank">
            {children}
        </a>
    );
}

function WorkHistoryItem({
    title,
    timeRange,
    company,
    location,
}: {
    title: string;
    timeRange: string;
    company: string;
    location: string;
}) {
    return (
        <Paragraph>
            <strong>{title}</strong>{" "}
            <span className="text-slate-500 dark:text-slate-400">
                {timeRange}
            </span>
            <br />
            <strong>{company}</strong>{" "}
            <span className="text-slate-500 dark:text-slate-400">
                {location}
            </span>
        </Paragraph>
    );
}
